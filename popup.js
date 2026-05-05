const FEEDBACK_URL = "https://forms.google.com/REPLACE_WITH_YOUR_FORM_URL";

const statusEl = document.getElementById("status");
const modeInputs = Array.from(document.querySelectorAll('input[name="mode"]'));

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b42318" : "#174ea6";
}

function setCheckedMode(mode) {
  const selected = modeInputs.find((input) => input.value === mode);
  if (selected) {
    selected.checked = true;
  }
}

function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }
      resolve(response);
    });
  });
}

async function loadCurrentMode() {
  const response = await sendMessage({ type: "get-mode" });
  if (!response || !response.ok) {
    setStatus("Could not read mode.", true);
    return;
  }

  setCheckedMode(response.mode);
  setStatus(`Current mode: ${response.mode}`);
}

async function onModeChange(event) {
  const mode = event.target.value;
  setStatus("Applying mode...");

  const response = await sendMessage({ type: "set-mode", mode });
  if (!response || !response.ok) {
    setStatus(response && response.error ? response.error : "Failed to apply mode.", true);
    return;
  }

  setStatus(`Mode active: ${response.mode}`);
}

modeInputs.forEach((input) => {
  input.addEventListener("change", onModeChange);
});

loadCurrentMode();

document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("feedback-link");
  if (link) link.href = FEEDBACK_URL;
});
