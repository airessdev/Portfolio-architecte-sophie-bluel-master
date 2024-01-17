// // tuto

// // Example POST method implementation:
// async function postData(url = "", data = { email: "", password: "" }) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData("http://localhost:5678/api/users/login", {
//   email: "sophie.bluel@test.tld",
//   password: "S0phie",
// }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

function recup() {
  let button = document.getElementById("login-submit");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let email = document.getElementById("signin-email").value;
    let password = document.getElementById("signin-password").value;
    let emailPassword = {
      email: email,
      password: password,
    };
    console.log(emailPassword);
    return emailPassword;
  });
}

recup();
