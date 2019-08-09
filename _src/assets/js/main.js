"use strict";

const button = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const originalListShow = document.querySelector(".js-original");
const favListShow = document.querySelector(".js-fav");

let favArr = [];
let shows = [];

// Set y Get de localStorage
function getFavShowsFromLocalStorage() {
  const itemInLocalStorage = JSON.parse(localStorage.getItem("fav-shows"));
  if (itemInLocalStorage !== null) {
    favArr = itemInLocalStorage;
  }
}

function setFavShowsIntoLocalStorage() {
  localStorage.setItem("fav-shows", JSON.stringify(favArr));
}

// Busco dentro de la API
function searchShows(event) {
  event.preventDefault();
  let inputValue = input.value;
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  fetch(url) //Busco en la API los datos que necesito
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        shows = data;
        paintShows(data);
      } else {
        shows.innerHTML = "No hay resultados para esta búsqueda";
      }
    });
}

function paintShows() {
  // Pinto los objetos que quiero mostrar
  let searchResult = "";

  for (let index = 0; index < shows.length; index++) {
    const showName = shows[index].show.name;
    const showId = shows[index].show.id;

    if (shows[index].show.image === null) {
      shows[
        index
      ].show.image = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
    } else {
      shows[index].show.image = shows[index].show.image.medium;
    }

    searchResult += `<div class="js-show-list" id="${showId}" data-index='${index}'><p class="show-list-title">${showName}</p><img src="${
      shows[index].show.image
    }"></div>`;
  }

  originalListShow.innerHTML = searchResult;

  //Ejecuto funciones selectFav y paintFav
  const originalShows = document.querySelectorAll(".js-show-list");
  console.log(originalShows);
  for (const item of originalShows) {
    item.addEventListener("click", selectFav);
    item.addEventListener("click", paintFavs);
  }
}

// Selecciono favorito y pinto fondo del seleccionado
function selectFav(ev) {
  const selectedFavShow = ev.currentTarget.dataset.index;
  const colorFavShow = ev.currentTarget;

  if (favArr.includes(shows[selectedFavShow]) === false) {
    favArr.push(shows[selectedFavShow]);
  }

  colorFavShow.classList.toggle("selected");

  setFavShowsIntoLocalStorage(favArr);
}

// Pinto favoritos en la columna correspondiente
function paintFavs() {
  favListShow.innerHTML = "";
  for (const index of favArr) {
    favListShow.innerHTML += `<li><div class="fav-list-item"><div class="delete-btn">X</div><div class="main-fav"><p class="title-fav">${
      index.show.name
    }</p><img src="${
      index.show.image
    }" class="js-fav-image"></div></div> </li>`;
  }

  let deleteItemArr = document.querySelectorAll(".delete-btn");
  console.log(deleteItemArr);
  for (const item of deleteItemArr) {
    item.addEventListener("click", removeFavShow);
  }
}

function removeFavShow(ev) {
  const favToRemove = ev.currentTarget.dataset.index;
  //const favToRemoveId = favToRemove.id;
  favArr.splice(favToRemove, 1);
  //favArr.splice(favToRemoveId, 1);
  paintFavs();
  setFavShowsIntoLocalStorage(favArr);
}

getFavShowsFromLocalStorage();
paintFavs();

button.addEventListener("click", searchShows);
