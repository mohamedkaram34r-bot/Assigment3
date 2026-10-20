const form = document.getElementById("registration-form");
const fieldIds = ["name", "email", "password", "confirm-password", "age"];
const status = document.getElementById("registration-status");

function getError(id) {
    const value = document.getElementById(id).value;
    if (!value.trim()) return "This field is required.";
    if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Enter a valid email address.";
    }
    if (id === "password" && value.length < 8) {
        return "Password must be at least 8 characters.";
    }
    if (id === "confirm-password" &&
        value !== document.getElementById("password").value) {
        return "Passwords do not match.";
    }
    if (id === "age") {
        const age = Number(value);
        if (!Number.isInteger(age) || age < 1 || age > 120) {
            return "Age must be a whole number between 1 and 120.";
        }
    }
    return "";
}

function validateField(id) {
    const message = getError(id);
    document.getElementById(id + "-error").textContent = message;
    document.getElementById(id).setAttribute("aria-invalid", String(message !== ""));
    return message === "";
}

fieldIds.forEach(function (id) {
    const input = document.getElementById(id);
    input.addEventListener("input", function () {
        status.textContent = "";
        validateField(id);
        if (id === "password" &&
            document.getElementById("confirm-password").value !== "") {
            validateField("confirm-password");
        }
    });
    input.addEventListener("blur", function () {
        validateField(id);
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";
    let firstInvalid = null;
    fieldIds.forEach(function (id) {
        if (!validateField(id) && firstInvalid === null) {
            firstInvalid = document.getElementById(id);
        }
    });
    if (firstInvalid !== null) {
        firstInvalid.focus();
        return;
    }
    status.textContent =
        "All fields are valid. This practice form does not create an account.";
});

document.getElementById("register-button").disabled = false;
