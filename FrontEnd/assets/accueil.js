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

async function getCat() {
  const cat = await fetch("http://localhost:5678/api/categories");
  const catParse = await cat.json();
  return catParse;
}

async function dispCat() {
  const myCat = await getCat();
  const projets = document.getElementById("portfolio");
  console.log(myCat);
  console.log(projets);
  const containerElement = document.createElement("div");
  containerElement.classList.add("badgeContainer");
  projets.insertBefore(containerElement, projets.childNodes[2]);
  const tousDivElement = document.createElement("div");
  tousDivElement.classList.add("badge");
  tousDivElement.classList.add("tous");
  const tousPElement = document.createElement("p");
  tousPElement.innerText = "Tous";
  containerElement.appendChild(tousDivElement);
  tousDivElement.appendChild(tousPElement);

  for (let indexCat in myCat) {
    const badgeElement = document.createElement("div");
    const pElement = document.createElement("p");
    badgeElement.classList.add("badge");
    badgeElement.classList.add("gen");
    badgeElement.id = "c" + myCat[indexCat].id;
    pElement.innerText = myCat[indexCat].name;
    containerElement.appendChild(badgeElement);
    badgeElement.appendChild(pElement);
  }
}

dispWorks();
dispWorksSelect(3);

dispCat();
