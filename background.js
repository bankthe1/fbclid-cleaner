const MODES = {
  OFF: "off",
  SAFE: "safe",
  STRICT: "strict"
};

const ALL_RULESETS = ["ruleset_safe", "ruleset_strict"];

function readMode(callback) {
  chrome.storage.local.get({ mode: MODES.SAFE }, (result) => {
    if (chrome.runtime.lastError) {
      callback(MODES.SAFE);
      return;
    }
    callback(result.mode);
  });
}

function writeMode(mode) {
  chrome.storage.local.set({ mode });
}

function resolveRulesets(mode) {
  if (mode === MODES.OFF) {
    return { enableRulesetIds: [], disableRulesetIds: ALL_RULESETS };
  }

  if (mode === MODES.STRICT) {
    return {
      enableRulesetIds: ["ruleset_safe", "ruleset_strict"],
      disableRulesetIds: []
    };
  }

  return {
    enableRulesetIds: ["ruleset_safe"],
    disableRulesetIds: ["ruleset_strict"]
  };
}

function applyMode(mode, callback) {
  const targetMode = Object.values(MODES).includes(mode) ? mode : MODES.SAFE;
  const update = resolveRulesets(targetMode);

  chrome.declarativeNetRequest.updateEnabledRulesets(update, () => {
    if (chrome.runtime.lastError) {
      callback({ ok: false, error: chrome.runtime.lastError.message });
      return;
    }

    writeMode(targetMode);
    callback({ ok: true, mode: targetMode });
  });
}

function initializeMode() {
  readMode((storedMode) => {
    applyMode(storedMode, () => {});
  });
}

chrome.runtime.onInstalled.addListener(() => {
  initializeMode();
});

chrome.runtime.onStartup.addListener(() => {
  initializeMode();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== "object") {
    sendResponse({ ok: false, error: "Invalid message." });
    return;
  }

  if (message.type === "get-mode") {
    readMode((mode) => {
      sendResponse({ ok: true, mode });
    });
    return true;
  }

  if (message.type === "set-mode") {
    applyMode(message.mode, (result) => {
      sendResponse(result);
    });
    return true;
  }

  sendResponse({ ok: false, error: "Unknown message type." });
});
