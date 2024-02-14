async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  const worksParse = await works.json();

  return worksParse;
}

async function getCategory() {
  const category = await fetch("http://localhost:5678/api/categories");
  const categoryParse = await category.json();

  return categoryParse;
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

async function displayWorks(categoryIdParam) {
  const myWorks = await getWorks();
  console.log(myWorks);
  const gallery = document.querySelector(".gallery");
  cleanGallery();
  for (let work of myWorks) {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    imgElement.src = work.imageUrl;
    figcaptionElement.innerText = work.title;
    figcaptionElement.id = work.categoryId;
    if (figcaptionElement.id == categoryIdParam) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
    if (categoryIdParam == 0) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  }
}
function toggleAdminOverlay() {
  let admin = false;

  if (localStorage.getItem("monToken") != null) {
    admin = true;

    const adminOverlayOff = document.querySelectorAll(".adminOverlayOff");
    const header = document.getElementById("headerId");
    header.classList.add("headerClass");
    for (let element of adminOverlayOff) {
      element.classList.add("hidden");
    }
  } else {
    const homePageEdit = document.getElementById("homePageEdit");
    homePageEdit.classList.replace("homePageEdit", "hidden");
    const adminOverlayOn = document.querySelectorAll(".adminOverlayOn");
    for (let element of adminOverlayOn) {
      element.classList.add("hidden");
    }
  }
  elementLogout = document.getElementById("logout");
  elementLogout.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}

displayCategoryButton();
displayWorks(0);
toggleAdminOverlay();
photoGalleryModal();
addModal();
