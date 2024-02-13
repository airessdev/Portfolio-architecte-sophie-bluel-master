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

function addModal() {
  const add = document.getElementById("addModal");
  const dialogModal = document.getElementById("modalAddPicture");
  const closeButton = document.getElementById("closeButtonAdd");
  const backButton = document.getElementById("backButton");
  const uploadLabel = document.getElementById("uploadLabel");
  const img = document.querySelector(".imgUpload");
  const buttonSubmit = document.getElementById("buttonSubmit");
  const titleInput = document.getElementById("title-input");
  fillModalCategory();
  titleInput.addEventListener("change", () => {
    if (titleInput.length !== 0) {
      buttonSubmit.classList.add("buttonSubmitok");
    }
  });

  add.addEventListener("click", () => {
    dialogModal.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialogModal.close();

    resetForm();
  });
  backButton.addEventListener("click", () => {
    dialogModal.close();

    resetForm();
  });
  dialogModal.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === dialogModal) {
      dialogModal.close();
      resetForm();
    }
  });
  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", (event) => {
    const fileValue = event.target.files[0];
    const urlValue = URL.createObjectURL(fileValue);
    console.log(urlValue);
    img.src = urlValue;
    img.classList.add("imgAfterUpload");
    uploadLabel.style.display = "none";
    document.getElementById("requirementText").style.display = "none";
  });

  buttonSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const titre = document.getElementById("title-input").value;
    console.log(titre);
    const select = document.getElementById("category-input").value;
    const fileInput = document.getElementById("file").files[0];
    const formData = new FormData();
    formData.append("title", titre);
    formData.append("category", select);
    formData.append("image", fileInput);

    if (checkForm()) {
      const result = await addWork(formData);
      if (result) {
        displayWorks(0);
        displayWorksModal();
        resetForm();
        dialogModal.close();
      }
    }
  });
}
function checkForm() {
  const titre = document.getElementById("title-input").value;
  const fileInput = document.getElementById("file").files[0];
  const buttonSubmit = document.getElementById("buttonSubmit");
  if (titre.length === 0 || fileInput === undefined) {
    document.getElementById("errorForm").style.display = "flex";
    document.getElementById("errorForm").innerText =
      "Veuillez remplir tous les champs";
    return false;
  }
  buttonSubmit.classList.add("buttonSubmitok");
  return true;
}
function resetForm() {
  const titre = document.getElementById("title-input");
  const fileInput = document.getElementById("file");
  const img = document.querySelector(".imgUpload");
  const uploadLabel = document.getElementById("uploadLabel");
  uploadLabel.classList.add("uploadLabel");
  uploadLabel.style.display = "flex";
  img.src = "assets/icons/picture.png";
  img.classList.remove("imgAfterUpload");
  titre.value = "";
  fileInput.value = "";
  document.getElementById("errorForm").style.display = "none";
  document.getElementById("buttonSubmit").classList.remove("buttonSubmitok");
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
  dialogModal.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === dialogModal) {
      dialogModal.close();
    }
  });
  displayWorksModal();
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
