const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const formMessage = document.querySelector("#form-message");

document.querySelectorAll("[data-show]").forEach((button) => {
  // Switch between the two forms without reloading the page.
  button.addEventListener("click", () => {
    const showSignup = button.dataset.show === "signup";
    loginForm.hidden = showSignup;
    signupForm.hidden = !showSignup;
    formMessage.textContent = "";
  });
});

function showError(error) {
  const errorKey = error instanceof Error ? error.message : "";
  formMessage.textContent = siteText(errorKey.startsWith("auth.") ? errorKey : "login.error");
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = siteText("login.signingIn");
  try {
    // auth.js verifies the password hash and saves the browser-local session.
    await signIn(loginForm.elements.email.value, loginForm.elements.password.value);
    window.location.href = "../account/account-index.html";
  } catch (error) {
    showError(error);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = siteText("login.creating");
  try {
    // Registration stores the profile and signs in this browser immediately.
    await createAccount(signupForm.elements.name.value, signupForm.elements.email.value, signupForm.elements.password.value);
    window.location.href = "../account/account-index.html";
  } catch (error) {
    showError(error);
  }
});
