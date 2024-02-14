function toggleAdmin() {
  let admin = false;

  if (localStorage.getItem("monToken") != null) {
    admin = true;
    const adminHidding = document.querySelectorAll(".isUser");
    const header = document.getElementById("headerId");
    header.style.margin = "109px 0px";
    for (let element of adminHidding) {
      element.classList.add("hidden");
    }
  } else {
    const homePageEdit = document.getElementById("homePageEdit");
    homePageEdit.style.display = "none";

    const notAdmin = document.querySelectorAll(".isAdmin");
    for (let element of notAdmin) {
      element.classList.add("hidden");
    }
  }
  elementLogout = document.getElementById("logout");
  elementLogout.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}
