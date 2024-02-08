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

  add.addEventListener("click", () => {
    dialogModal.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialogModal.close();
    fileInput.value = "";
    uploadLabel.classList.add("uploadLabel");
    uploadLabel.style.display = "flex";
    img.src = "assets/icons/picture.png";
  });
  backButton.addEventListener("click", () => {
    dialogModal.close();
    fileInput.value = "";
    uploadLabel.classList.add("uploadLabel");
    uploadLabel.style.display = "flex";
    img.src = "assets/icons/picture.png";
  });
  dialogModal.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === dialogModal) {
      dialogModal.close();
      fileInput.value = "";
      uploadLabel.classList.add("uploadLabel");
      uploadLabel.style.display = "flex";
      img.src = "assets/icons/picture.png";
    }
  });
  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", (event) => {
    console.log(event);
    const fileValue = event.target.files[0];
    const urlValue = URL.createObjectURL(fileValue);
    console.log(urlValue);

    img.src = urlValue;
    // const uploadLabel = document.getElementById("uploadLabel");
    uploadLabel.style.display = "none";
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
