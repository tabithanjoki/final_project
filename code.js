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
  element.style.color = type === "error" ? "#c0392b" : "#1d8348";
  element.style.padding = "0.5rem 0.75rem";
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

    const applicant = {
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
      termsAccepted: false,
      savedAt: new Date().toISOString(),
    };

    saveApplicant(applicant);
    showMessage(
      feedback,
      "Application saved successfully. Now visit the Terms page to accept the terms.",
    );
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
      "No saved application found. Complete the Join form first.",
      "error",
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
    if (!currentApplicant) {
      showMessage(
        termsStatus,
        "No saved application found. Complete the Join form first.",
        "error",
      );
      return;
    }
    if (currentApplicant.termsAccepted) {
      showMessage(termsStatus, "Terms have already been accepted.", "success");
      return;
    }

    currentApplicant.termsAccepted = true;
    saveApplicant(currentApplicant);
    showMessage(
      termsStatus,
      "Terms accepted. Your application data is now saved.",
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
