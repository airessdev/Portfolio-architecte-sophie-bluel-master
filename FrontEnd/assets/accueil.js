async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  const worksParse = await works.json();
  return worksParse;
}

// async function dispWorks() {
//   const myWorks = await getWorks();
//   const gallery = document.querySelector(".gallery");
//   console.log(myWorks);
//   for (let indexWork in myWorks) {
//     const figureElement = document.createElement("figure");
//     const imgElement = document.createElement("img");
//     const figcaptionElement = document.createElement("figcaption");
//     imgElement.src = myWorks[indexWork].imageUrl;
//     figcaptionElement.innerText = myWorks[indexWork].title;
//     figcaptionElement.id = myWorks[indexWork].categoryId;
//     gallery.appendChild(figureElement);
//     figureElement.appendChild(imgElement);
//     figureElement.appendChild(figcaptionElement);
//   }
// }
// async function dispWorksSelect(categroryIdParam) {
//   const myWorks = await getWorks();
//   const gallery = document.querySelector(".gallery");

//   console.log(myWorks);
//   for (let indexWork in myWorks) {
//     const figureElement = document.createElement("figure");
//     const imgElement = document.createElement("img");
//     const figcaptionElement = document.createElement("figcaption");
//     imgElement.src = myWorks[indexWork].imageUrl;
//     figcaptionElement.innerText = myWorks[indexWork].title;
//     figcaptionElement.id = myWorks[indexWork].categoryId;
//     if (figcaptionElement.id == categroryIdParam) {
//       gallery.appendChild(figureElement);
//       figureElement.appendChild(imgElement);
//       figureElement.appendChild(figcaptionElement);
//     }
//   }
// }

// const selectId = document.getElementById("c1");
// selectId.addEventListener("click", () => {
//   cleanGallery();
//   dispWorksSelect(1);
// });
// const selectId2 = document.getElementById("c2");
// selectId2.addEventListener("click", () => {
//   cleanGallery();
//   dispWorksSelect(2);
// });
// const selectId3 = document.getElementById("c3");
// selectId3.addEventListener("click", () => {
//   cleanGallery();
//   dispWorksSelect(3);
// });
//async function displayCategory() {
//   const myCategory = await getCategory();
//   const projets = document.getElementById("portfolio");
//   const containerElement = document.createElement("div");
//   containerElement.classList.add("badgeContainer");
//   projets.insertBefore(containerElement, projets.childNodes[2]);
//   const allDivElement = document.createElement("div");
//   allDivElement.classList.add("badge", "tous");
//   const allPElement = document.createElement("p");
//   allPElement.innerText = "Tous";
//   containerElement.appendChild(allDivElement);
//   allDivElement.appendChild(allPElement);

//   for (let indexCategory in myCategory) {
//     const badgeElement = document.createElement("div");
//     const pElement = document.createElement("p");
//     badgeElement.classList.add("badge", "gen");
//     badgeElement.id = "c" + myCategory[indexCategory].id;
//     pElement.innerText = myCategory[indexCategory].name;
//     containerElement.appendChild(badgeElement);
//     badgeElement.appendChild(pElement);
//   }
// }
//async function displayWorksSelectRe(categroryIdParam) {
//   const myWorks = await getWorks();
//   const gallery = document.querySelector(".gallery");
//   console.log(myWorks);

//   for (let indexWork in myWorks) {
//     const figureElement = document.createElement("figure");
//     const imgElement = document.createElement("img");
//     const figcaptionElement = document.createElement("figcaption");
//     imgElement.src = myWorks[indexWork].imageUrl;
//     figcaptionElement.innerText = myWorks[indexWork].title;
//     figcaptionElement.id = myWorks[indexWork].categoryId;
//     if (figcaptionElement.id == categroryIdParam) {
//       gallery.appendChild(figureElement);
//       figureElement.appendChild(imgElement);
//       figureElement.appendChild(figcaptionElement);
//     }
//     if (categroryIdParam == 0) {
//       gallery.appendChild(figureElement);
//       figureElement.appendChild(imgElement);
//       figureElement.appendChild(figcaptionElement);
//     }
//   }
// }

// async function displayCategoryButton2() {
//   const myCategory = await getCategory();
//   const containerSelect = document.querySelector(".badgeContainer");
//   const allButtonElement = document.createElement("button");
//   allButtonElement.id = "c0";
//   allButtonElement.classList.add("badge", "all");
//   allButtonElement.innerText = "Tous";
//   containerSelect.appendChild(allButtonElement);

//   for (let indexCategory in myCategory) {
//     const badgeButtonElement = document.createElement("button");
//     badgeButtonElement.classList.add("badge", "gen");
//     badgeButtonElement.id = myCategory[indexCategory].id;
//     badgeButtonElement.setAttribute("type", "button");
//     badgeButtonElement.innerText = myCategory[indexCategory].name;
//     containerSelect.appendChild(badgeButtonElement);
//     badgeButtonElement.addEventListener("click", () => {
//       cleanGallery();
//       displayWorks(badgeButtonElement.id);
//     });
//   }
//   const selectIdAll = document.getElementById("c0");
//   selectIdAll.addEventListener("click", () => {
//     cleanGallery();
//     displayWorks(0);
//   });
// }

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

async function displayWorks(categroryIdParam) {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".gallery");

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
    for (let element of adminHidding) {
      element.classList.add("hidden");
    }
  } else {
    const notAdmin = document.querySelectorAll(".isAdmin");
    for (let element of notAdmin) {
      element.classList.add("hidden");
    }
  }
}
function editModal() {
  const dialogModal = document.getElementById("modal");
  dialogModal.showModal();
  const closeButton = document.getElementById("closeButton");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  displayWorksModal();
}

async function displayWorksModal() {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".modalWorks");
  for (let work of myWorks) {
    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", "fa-trash-can", "trash", "carre");
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(iconElement);
  }
}

displayCategoryButton();
displayWorks(0);
toggleAdmin();
