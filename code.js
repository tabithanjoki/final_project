// This JavaScript file handles the foster care application form
// It saves applicant data to the browser's local storage and validates form inputs
// Created for Tumaini Foster Care application system

const storageKey = "tumainiFosterCareApplicant";

function getSavedApplicant() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || null;
  } catch (error) {
    return null;
  }
}

function saveApplicant(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function showMessage(element, text, type = "success") {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("message-success", "message-error");
  element.classList.add(type === "error" ? "message-error" : "message-success");
}

function renderSavedData() {
  const savedDataSection = document.getElementById("saved-data");
  if (!savedDataSection) return;

  const applicant = getSavedApplicant();
  if (!applicant) {
    savedDataSection.innerHTML = `
      <h2>Applicant data</h2>
      <p>No saved application found yet. Complete the Join form to save your information.</p>
    `;
    return;
  }

  savedDataSection.innerHTML = `
    <h2>Saved application details</h2>
    <p><strong>Name:</strong> ${applicant.first_name} ${applicant.second_name} ${applicant.third_name}</p>
    <p><strong>Email:</strong> ${applicant.email}</p>
    <p><strong>Phone:</strong> ${applicant.phone}</p>
    <p><strong>County:</strong> ${applicant.county}</p>
    <p><strong>Preferred age range:</strong> ${applicant.preference}</p>
    <p><strong>Terms accepted:</strong> ${applicant.termsAccepted ? "Yes" : "No"}</p>
  `;
}

function initForm() {
  const form = document.getElementById("application-form");
  const feedback = document.getElementById("form-feedback");
  if (!form) return;

  const applicant = getSavedApplicant();
  if (!applicant || !applicant.termsAccepted) {
    showMessage(
      feedback,
      "Please read and accept the terms and conditions first before filling the form. Redirecting to Terms page...",
      "error",
    );
    setTimeout(() => {
      window.location.href = "index4.html";
    }, 3000);
    return;
  }

  form.querySelector(".submit-button").disabled = false;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const first_name = form.first_name.value.trim();
    const second_name = form.second_name.value.trim();
    const third_name = form.third_name.value.trim();
    const dob = form.dob.value;
    const id_number = form.id_number.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const county = form.county.value.trim();
    const sub_county = form.sub_county.value.trim();
    const physical_address = form.physical_address.value.trim();
    const marital_status = form.marital_status.value;
    const occupants = form.occupants.value;
    const occupation = form.occupation.value.trim();
    const preference = form.preference.value;
    const motivation = form.motivation.value.trim();
    const reportFile = document.getElementById("medical_report")?.files[0];

    const errors = [];
    if (!first_name) errors.push("First name is required.");
    if (!second_name) errors.push("Second name is required.");
    if (!third_name) errors.push("Third name is required.");
    if (!dob) errors.push("Date of birth is required.");
    if (!id_number) errors.push("ID/MAISHA number is required.");
    if (!phone) {
      errors.push("Phone number is required.");
    } else if (!/^[0-9]{9,12}$/.test(phone)) {
      errors.push("Phone number must be 9 to 12 digits.");
    }
    if (!email) {
      errors.push("Email is required.");
    } else if (!form.email.checkValidity()) {
      errors.push("Please enter a valid email address.");
    }
    if (!county) errors.push("County is required.");
    if (!sub_county) errors.push("Sub-county is required.");
    if (!physical_address) errors.push("Village/Estate is required.");
    if (!occupation) errors.push("Occupation is required.");
    if (!reportFile) errors.push("Medical report file is required.");

    if (errors.length) {
      showMessage(feedback, errors.join(" "), "error");
      return;
    }

    const updatedApplicant = {
      first_name,
      second_name,
      third_name,
      dob,
      id_number,
      phone,
      email,
      county,
      sub_county,
      physical_address,
      marital_status,
      occupants,
      occupation,
      medical_report: reportFile.name,
      preference,
      motivation,
      termsAccepted: true,
      savedAt: new Date().toISOString(),
    };

    saveApplicant(updatedApplicant);
    showMessage(feedback, "Application saved successfully.");
    renderSavedData();
  });
}

function initTerms() {
  const button = document.getElementById("accept-terms");
  const termsStatus = document.getElementById("terms-status");

  if (!termsStatus) return;

  const applicant = getSavedApplicant();
  if (!applicant) {
    showMessage(
      termsStatus,
      "Accept the terms to start your application.",
      "success",
    );
  } else {
    showMessage(
      termsStatus,
      applicant.termsAccepted
        ? "Terms already accepted."
        : "Please accept the terms to continue.",
      "success",
    );
  }

  if (!button) return;

  button.addEventListener("click", () => {
    const currentApplicant = getSavedApplicant();
    if (currentApplicant && currentApplicant.termsAccepted) {
      showMessage(termsStatus, "Terms have already been accepted.", "success");
      return;
    }

    const updatedApplicant = currentApplicant || {};
    updatedApplicant.termsAccepted = true;
    updatedApplicant.savedAt = new Date().toISOString();
    saveApplicant(updatedApplicant);
    showMessage(
      termsStatus,
      "Terms accepted. You can now proceed to fill the application form.",
      "success",
    );
  });
}

function initPage() {
  renderSavedData();
  initForm();
  initTerms();
}

document.addEventListener("DOMContentLoaded", initPage);
