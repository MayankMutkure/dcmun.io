const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxL94FWO4ogrsjqh0QUE7Ey_K2ihsxd3H4V2Yng9N5KVNltGE5HHKY2Ix-5dF-iXFvMXQ/exec";

const form = document.querySelector("[data-registration-form]");
const statusMessage = document.querySelector("[data-form-status]");

function setStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `form-status ${type || ""}`.trim();
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
      setStatus("Google Sheet connection is not added yet. Add your Apps Script web app URL in script.js, then this form will save registrations automatically.", "error");
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    formData.append("submittedAt", new Date().toISOString());

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    setStatus("Sending your registration...", "");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      });

      form.reset();
      setStatus("Registration submitted. Thank you for joining DCMUN 2026.", "success");
    } catch (error) {
      setStatus("Something went wrong. Please try again or contact the DCMUN team.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit registration";
    }
  });
}
