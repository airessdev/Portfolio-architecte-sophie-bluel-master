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

    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    console.log(indexWork);
  }

  console.log(gallery);
}

async function getCat() {
  const cat = await fetch("http://localhost:5678/api/categories");
  console.log(await cat.json());
}

dispWorks();
