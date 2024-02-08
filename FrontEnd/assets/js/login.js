//   email: "sophie.bluel@test.tld",
//   password: "S0phie",

async function postData(url = "", data = { email: "", password: "" }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",

    body: JSON.stringify(data),
  });
  console.log(response);
  if (response.ok) {
    console.log("communication avec le serveur ok");
  }
  // if (response.status == 401) {

  // }
  // if (response.status == 404) {

  // }

  return response.json();
  // parses JSON response into native JavaScript objects
  // objet code http
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
  if (data.token == null) {
    const error = document.querySelector(".hidden-error");
    error.classList.remove("hidden-error");
    error.innerText = "Email ou mot de passe incorrect";
  } else {
    localStorage.setItem("monToken", data.token);
    window.location.href = "./index.html";
  }
}

let button = document.getElementById("login-submit");
button.addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
