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
async function displayWorksSelectRe(categroryIdParam) {
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
    if (categroryIdParam == c0) {
      gallery.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
    }
  }
}
