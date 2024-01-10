async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  console.log(await works.json());
  // const worksParse = await works.json();
  // return worksParse;
}

getWorks();
// faire une fonction display works

async function getCat() {
  const cat = await fetch("http://localhost:5678/api/categories");
  console.log(await cat.json());
}
getCat();
