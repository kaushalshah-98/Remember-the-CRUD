window.addEventListener("DOMContentLoaded", async e => {
    
  if (document.getElementById("loginFromSignUp")) {
    const signupFromLogin = document.getElementById("loginFromSignUp");
    signupFromLogin.addEventListener("click", () => {
      location.href = "/users/signup";
    });
  }

  const demoFromSignUp = document.getElementById("splashDemoUser");
  demoFromSignUp.addEventListener("click", () => {
    location.href = "/users/demo";
  });

  if (document.getElementById("signupFromLogIn")) {
    const loginFromSignup = document.getElementById("signupFromLogIn");
    loginFromSignup.addEventListener("click", () => {
      location.href = "/users/login";
    });
  }

});
