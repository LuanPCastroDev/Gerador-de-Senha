document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");
  const generatePassword = document.getElementById("generatePassword");
  const generatedPassword = document.getElementById("generatedPassword");
  const clearPassword = document.getElementById("clearPassword");
  const copiarsenha = document.getElementById("copiarsenha");
  const commonPasswords = ["123456", "password", "qwerty", "admin", "12345678"];
  const forcadesenha = document.getElementById("forcadesenha");

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
    if (commonValid) score += 20;
    if (uppercaseValid) score += 15;
    if (lowercaseValid) score += 15;
    if (numberValid) score += 15;
    if (specialValid) score += 15;
    if (lengthValid) {
      if (password.length >= 15) {
        score += 20;
      } else if (password.length >= 12) {
        score += 15;
      } else {
        score += 10;
      }
    }

    strengthBar.style.width = `${score}%`;
    forcadesenha.textContent = `Score: ${score} / 100`;

    let strengthLabel = "Nenhuma";
    if (!password) {
      strengthBar.style.background = "#334155";
      strengthLabel = "Nenhuma";
    } else if (score <= 20) {
      strengthBar.style.background = "#dc2626";
      strengthLabel = "Muito Fraca";
    } else if (score <= 40) {
      strengthBar.style.background = "#f97316";
      strengthLabel = "Fraca";
    } else if (score <= 60) {
      strengthBar.style.background = "#eab308";
      strengthLabel = "Média";
    } else if (score <= 80) {
      strengthBar.style.background = "#22c55e";
      strengthLabel = "Forte";
    } else {
      strengthBar.style.background = "#14b8a6";
      strengthLabel = "Muito Forte";
    }
    strengthText.textContent = `Força: ${strengthLabel}`;
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

  function clearGeneratedPassword() {
    generatedPassword.value = "";
  }

  clearPassword.addEventListener("click", clearGeneratedPassword);

  copiarsenha.addEventListener("click", () => {
  if (generatedPassword.value !== "") {
    navigator.clipboard.writeText(generatedPassword.value)
      .then(() => {
        alert("Senha copiada com sucesso!");
      })
      .catch(() => {
        alert("Erro ao copiar senha.");
      });
  } else {
    alert("Nenhuma senha foi gerada ainda.");
  }
});
});