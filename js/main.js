const form = document.querySelector("form");
const nameInput = form.querySelector("input[name='user-name']");
const emailInput = form.querySelector("input[name='email']");
const passwordInput = form.querySelector("input[name='password']");
const errorMessages = form.querySelectorAll(".error-message");

const namePattern = /^[a-zA-Z][a-zA-Z0-9_ ]{2,15}$/;
const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|net|org|edu)$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function validateName() {
  const value = nameInput.value.trim();
  if (!value) return setError(nameInput, "Full name is required.");
  if (!namePattern.test(value))
    return setError(
      nameInput,
      "Name must be at least 3 characters long and can include letters, numbers, underscores, or spaces."
    );
  clearError(nameInput);
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) return setError(emailInput, "Email is required.");
  if (!emailPattern.test(value))
    return setError(emailInput, "Please enter a valid email address.");
  clearError(emailInput);
}

function validatePassword() {
  const value = passwordInput.value.trim();
  if (!value) return setError(passwordInput, "Password is required.");
  if (!passwordPattern.test(value))
    return setError(
      passwordInput,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
  clearError(passwordInput);
}

function setError(input, message) {
  const errorSpan = input.parentElement.querySelector(".error-message");
  errorSpan.textContent = message;
  errorSpan.style.color = "#e63946";
}

function clearError(input) {
  const errorSpan = input.parentElement.querySelector(".error-message");
  errorSpan.textContent = "";
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateName();
  validateEmail();
  validatePassword();
  if (
    [nameInput, emailInput, passwordInput].every(
      (input) =>
        input.parentElement.querySelector(".error-message").textContent === ""
    )
  ) {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
      location.reload();
    }, 2500);
  }
});
