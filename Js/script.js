const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const generatePassword = document.getElementById("generatePassword");
const generatedPassword = document.getElementById("generatedPassword");

const commonPasswords = ["123456", "password", "qwerty", "admin", "12345678"];

passwordInput.addEventListener("input", checkPasswordStrength);

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "Ocultar";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "Mostrar";
  }
});

function updateCriteria(id, valid) {
  const element = document.getElementById(id);
  element.textContent = `${valid ? "✅" : "❌"} ${element.textContent.slice(2)}`;
}

function checkPasswordStrength() {
  const password = passwordInput.value;

  const lengthValid = password.length >= 8;
  const uppercaseValid = /[A-Z]/.test(password);
  const lowercaseValid = /[a-z]/.test(password);
  const numberValid = /[0-9]/.test(password);
  const specialValid = /[^A-Za-z0-9]/.test(password);
  const commonValid = !commonPasswords.includes(password.toLowerCase());

  updateCriteria("length", lengthValid);
  updateCriteria("uppercase", uppercaseValid);
  updateCriteria("lowercase", lowercaseValid);
  updateCriteria("number", numberValid);
  updateCriteria("special", specialValid);
  updateCriteria("common", commonValid);

  let score = 0;
  if (lengthValid) score++;
  if (uppercaseValid) score++;
  if (lowercaseValid) score++;
  if (numberValid) score++;
  if (specialValid) score++;
  if (commonValid) score++;

  const percentage = (score / 6) * 100;
  strengthBar.style.width = `${percentage}%`;

  if (score <= 2) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Força: Fraca";
  } else if (score <= 4) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Força: Média";
  } else {
    strengthBar.style.background = "green";
    strengthText.textContent = "Força: Forte";
  }
}

generatePassword.addEventListener("click", () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";

  for (let i = 0; i < 14; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  generatedPassword.value = password;
});