async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");

  const worksParse = await works.json();
  return worksParse;
}

async function dispWorks() {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".gallery");
  console.log(myWorks);
  for (let indexWork in myWorks) {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imgElement.src = myWorks[indexWork].imageUrl;
    figcaptionElement.innerText = myWorks[indexWork].title;
    figcaptionElement.id = myWorks[indexWork].categoryId;
    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
  }
}
async function dispWorksSelect(categroryIdParam) {
  const myWorks = await getWorks();
  const gallery = document.querySelector(".gallery");

  console.log(myWorks);
  for (let indexWork in myWorks) {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imgElement.src = myWorks[indexWork].imageUrl;
    figcaptionElement.innerText = myWorks[indexWork].title;
    figcaptionElement.id = myWorks[indexWork].categoryId;
    if (figcaptionElement.id == categroryIdParam) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  }
}

async function getCategory() {
  const category = await fetch("http://localhost:5678/api/categories");
  const catParse = await category.json();
  return catParse;
}

async function dispCategory() {
  const myCategory = await getCategory();
  const projets = document.getElementById("portfolio");
  console.log(myCategory);
  console.log(projets);
  const containerElement = document.createElement("div");
  containerElement.classList.add("badgeContainer");
  projets.insertBefore(containerElement, projets.childNodes[2]);
  const allDivElement = document.createElement("div");
  allDivElement.classList.add("badge");
  allDivElement.classList.add("tous");
  const allPElement = document.createElement("p");
  allPElement.innerText = "Tous";
  containerElement.appendChild(allDivElement);
  allDivElement.appendChild(allPElement);

  for (let indexCategory in myCategory) {
    const badgeElement = document.createElement("div");
    const pElement = document.createElement("p");
    badgeElement.classList.add("badge");
    badgeElement.classList.add("gen");
    badgeElement.id = "c" + myCategory[indexCategory].id;
    pElement.innerText = myCategory[indexCategory].name;
    containerElement.appendChild(badgeElement);
    badgeElement.appendChild(pElement);
  }
}

async function dispCategoryButton() {
  const myCategory = await getCategory();
  const projets = document.getElementById("portfolio");
  const containerElement = document.createElement("div");
  containerElement.classList.add("badgeContainer");
  projets.insertBefore(containerElement, projets.childNodes[2]);
  const allButtonElement = document.createElement("button");
  allButtonElement.id = "c0";
  allButtonElement.classList.add("badge");
  allButtonElement.classList.add("all");
  allButtonElement.innerText = "Tous";
  containerElement.appendChild(allButtonElement);

  for (let indexCategory in myCategory) {
    const badgeButtonElement = document.createElement("button");
    badgeButtonElement.classList.add("badge");
    badgeButtonElement.classList.add("gen");
    badgeButtonElement.id = "c" + myCategory[indexCategory].id;
    badgeButtonElement.setAttribute("type", "button");
    badgeButtonElement.innerText = myCategory[indexCategory].name;
    containerElement.appendChild(badgeButtonElement);
  }
  const selectIdAll = document.getElementById("c0");
  selectIdAll.addEventListener("click", () => {
    cleanGallery();
    dispWorks();
  });

  const selectId = document.getElementById("c1");
  selectId.addEventListener("click", () => {
    cleanGallery();
    dispWorksSelect(1);
  });
  const selectId2 = document.getElementById("c2");
  selectId2.addEventListener("click", () => {
    cleanGallery();
    dispWorksSelect(2);
  });
  const selectId3 = document.getElementById("c3");
  selectId3.addEventListener("click", () => {
    cleanGallery();
    dispWorksSelect(3);
  });
}
function cleanGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
}

//dispCat();
dispCategoryButton();
dispWorks();
