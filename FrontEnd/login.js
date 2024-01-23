// //
// postData("http://localhost:5678/api/users/login", {
//   email: "sophie.bluel@test.tld",
//   password: "S0phie",
// }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

// // Example POST method implementation:
async function postData(url = "", data = { email: "", password: "" }) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response); // parses JSON response into native JavaScript objects
  if (response.ok) {
    //window.location.href = "index.html"
    alert("all good");
  }
  // if (response.status == 401) {

  // }
  // if (response.status == 404) {

  // }

  return response.json();
  // parses JSON response into native JavaScript objects
  // objet code http
}

function recup() {
  let email = document.getElementById("signin-email").value;
  let password = document.getElementById("signin-password").value;
  let emailPassword = {
    email: email,
    password: password,
  };
  console.log(emailPassword);
  return emailPassword;
}

async function login() {
  let emailPassword = recup();

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
    window.location.href = "index.html";
  }

  //token ok
}

let button = document.getElementById("login-submit");
button.addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
