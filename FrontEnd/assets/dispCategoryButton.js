async function dispCategoryButton() {
  const myCategory = await getCategory();
  const projets = document.getElementById("portfolio");
  console.log(myCategory);
  console.log(projets);
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
