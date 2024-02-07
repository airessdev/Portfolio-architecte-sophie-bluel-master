async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  const worksParse = await works.json();

  return worksParse;
}

async function getCategory() {
  const category = await fetch("http://localhost:5678/api/categories");
  const categoryParse = await category.json();
  console.log(categoryParse);
  return categoryParse;
}
async function fillModalCategory() {
  const category = await getCategory();
  console.log(category);
  const formElement = document.getElementById("category-input");
  for (let myCategory of category) {
    const optionElement = document.createElement("option");
    optionElement.value = myCategory.id;
    optionElement.innerText = myCategory.name;
    formElement.appendChild(optionElement);
  }
}

async function displayCategoryButton() {
  const myCategory = await getCategory();
  const containerSelect = document.querySelector(".badgeContainer");

  const allButtonElement = document.createElement("button");
  allButtonElement.id = "c0";
  allButtonElement.classList.add("badge", "all");
  allButtonElement.innerText = "Tous";
  containerSelect.appendChild(allButtonElement);

  for (let category of myCategory) {
    const badgeButtonElement = document.createElement("button");
    badgeButtonElement.classList.add("badge", "gen");
    badgeButtonElement.id = category.id;
    badgeButtonElement.setAttribute("type", "button");
    badgeButtonElement.innerText = category.name;
    containerSelect.appendChild(badgeButtonElement);
    badgeButtonElement.addEventListener("click", () => {
      cleanGallery();
      displayWorks(badgeButtonElement.id);
    });
  }
  const selectIdAll = document.getElementById("c0");
  selectIdAll.addEventListener("click", () => {
    cleanGallery();
    displayWorks(0);
  });
}

function cleanGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
}

async function displayWorks(categroryIdParam) {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let work of myWorks) {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    imgElement.src = work.imageUrl;
    figcaptionElement.innerText = work.title;
    figcaptionElement.id = work.categoryId;
    if (figcaptionElement.id == categroryIdParam) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
    if (categroryIdParam == 0) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  }
}
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
function addModal() {
  const add = document.getElementById("addModal");
  const dialogModal = document.getElementById("modalAddPicture");
  const closeButton = document.getElementById("closeButtonAdd");
  const backButton = document.getElementById("backButton");
  add.addEventListener("click", () => {
    dialogModal.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialogModal.close();
  });
  backButton.addEventListener("click", () => {
    dialogModal.close();
  });

  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", (event) => {
    console.log(event);
    const value = event.target.files[0];
    const urlValue = URL.createObjectURL(value);
    console.log(urlValue);
    const img = document.querySelector(".imgUpload");
    img.src = urlValue;
  });

  const form = document.getElementById("myForm");
  const but = document.getElementById("but");
  fillModalCategory();
  but.addEventListener("click", async (event) => {
    event.preventDefault();
    const titre = document.getElementById("title-input").value;
    const select = document.getElementById("category-input").value;
    const fileInput = document.getElementById("file").files[0];
    const formData = new FormData();
    formData.append("title", titre);
    formData.append("category", select);
    formData.append("image", fileInput);

    const result = await addWork(formData);
    if (result) {
      displayWorks(0);
      displayWorksModal();
    }
  });
}
function editModal() {
  const edit = document.getElementById("edit");
  const dialogModal = document.getElementById("modalEdit");
  const closeButton = document.getElementById("closeButton");
  edit.addEventListener("click", () => {
    dialogModal.showModal();
  });
  closeButton.addEventListener("click", () => {
    dialogModal.close();
  });
  displayWorksModal();
  document.addEventListener("click", (event) => {});
}

async function displayWorksModal() {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".modalWorks");
  gallery.innerHTML = "";
  for (let work of myWorks) {
    const divElement = document.createElement("div");
    divElement.classList.add("wrapTrash");
    divElement.id = work.id;

    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", "fa-trash-can", "trash", "carre");
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");

    imgElement.src = work.imageUrl;
    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(divElement);
    divElement.appendChild(iconElement);

    divElement.addEventListener("click", async () => {
      const removeProject = await deleteWork(divElement.id);
      if (removeProject) {
        gallery.innerHTML = "";
        displayWorks(0);
        displayWorksModal();
      } else {
        alert("Problème de suppression");
      }
    });
  }
}
async function deleteWork(id) {
  const token = localStorage.getItem("monToken");
  const resp = await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (resp.ok) {
    return true;
  }
  return false;
}
async function addWork(formData) {
  const token = localStorage.getItem("monToken");
  const resp = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  if (resp.ok) {
    return true;
  }
  return false;
}

displayCategoryButton();
displayWorks(0);
toggleAdmin();
editModal();
addModal();
