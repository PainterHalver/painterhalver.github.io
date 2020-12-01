"use strict";

const btnToggleNav = document.querySelector(".btn--toggle-nav");
const nav = document.querySelector(".nav");
const btnFreeMove = document.querySelector(".btn--free-move");

///////////////////////////////////////////////
// BTN TOGGLE NAV
btnToggleNav.addEventListener("click", function () {
  nav.classList.toggle("hidden");
});

///////////////////////////////////////////////
// BTN FREE MOVE
const freeMove = function () {
  let x = 0;
  let y = 0;
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") y = y - 1.5;
    if (e.key === "ArrowDown") y = y + 1.5;
    if (e.key === "ArrowLeft") x = x - 1.5;
    if (e.key === "ArrowRight") x = x + 1.5;
    btnFreeMove.style.transform = `translate(${x}rem, ${y}rem)`;
  });
};

btnFreeMove.addEventListener("click", freeMove);

///////////////////////////////////////////////
//ANIME SEARCH
/*
const baseUrl = "https://api.jikan.moe/v3";
async function getAPI(url) {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
const searchValue = prompt("Search for:");
getAPI(`${baseUrl}/search/anime?q=naruto&page=1`);
*/

const resultContainer = document.querySelector(".result-container");
const btnSearchAnime = document.querySelector(".btn--anime-search");
const searchAnime = async function (searchValue) {
  return new Promise(async function (resolve, reject) {
    const res = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${searchValue}&page=1`
    );
    const data = await res.json();
    resultContainer.innerHTML = "";
    console.log(data.results);
    data.results.forEach((anime) => {
      resultContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="result-box">
        <a href="${anime.url}" target="_blank"><img src="${anime.image_url}" alt="${anime.title} class="search-img"></a>
        <a href="${anime.url}" class="result-title" target="_blank">${anime.title}</a>
        <p>Score: ${anime.score}</p>
        </div>
      `
      );
    });
  });
};

btnSearchAnime.addEventListener("click", function () {
  const searchValue = prompt("Search for:");
  searchAnime(searchValue);
});
