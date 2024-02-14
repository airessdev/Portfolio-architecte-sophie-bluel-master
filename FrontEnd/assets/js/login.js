//   email: "sophie.bluel@test.tld",
//   password: "S0phie",

async function postData(url = "", credential = { email: "", password: "" }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(credential),
  });

  if (response.ok) {
    console.log("communication avec le serveur ok");
  }

  if (response.status == 404) {
    console.log("Utilisateur introuvable");
  }

  return response.json();
}

function getForm() {
  let email = document.getElementById("signin-email").value;
  let password = document.getElementById("signin-password").value;
  let emailPassword = {
    email: email,
    password: password,
  };
  return emailPassword;
}

async function login() {
  let emailPassword = getForm();

  const data = await postData(
    "http://localhost:5678/api/users/login",
    emailPassword
  );

  if (data.message) {
    const error = document.querySelector(".hidden-error");
    error.classList.remove("hidden-error");
    error.innerText = "Email ou mots de passe incorrect";
  }

  if (data.token) {
    localStorage.setItem("monToken", data.token);
    window.location.href = "./index.html";
  }
}

let button = document.getElementById("login-submit");
button.addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
