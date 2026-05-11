document.addEventListener("DOMContentLoaded", () => {
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
    const text = element.textContent.substring(2);
    element.textContent = `${valid ? "✅" : "❌"} ${text}`;
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
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+";
    const allChars = upper + lower + numbers + special;

    let password = "";

    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = 4; i < 14; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    generatedPassword.value = password;
  });
});