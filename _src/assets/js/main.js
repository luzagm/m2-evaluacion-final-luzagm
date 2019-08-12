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
        formatAndSaveData(data);
        paintShows(data);
      } else {
        shows.innerHTML = "No hay resultados para esta búsqueda";
      }
    });
}

function formatAndSaveData(data) {
  const result = [];
  for (const index of data) {
    result.push({
      name: index.show.name,
      image: index.show.image,
      id: index.show.id
    });
  }

  shows = result;
  console.log("Format JSON data and return it as array >>> Return", shows);
}

function paintShows() {
  // Pinto los objetos que quiero mostrar
  let searchResult = "";

  for (let index = 0; index < shows.length; index++) {
    const showName = shows[index].name;
    const showId = shows[index].id;

    if (shows[index].image === null) {
      shows[
        index
      ].image = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
    } else {
      shows[index].image = shows[index].image.medium;
    }

    searchResult += `<div class="js-show-list" data-id="${showId}" data-index='${index}'><p class="show-list-title">${showName}</p><img class="img-original" src="${
      shows[index].image
    }"></div>`;
  }

  originalListShow.innerHTML = searchResult;

  //Ejecuto funciones selectFav y paintFav
  const originalShows = document.querySelectorAll(".js-show-list");
  console.log(originalShows);
  for (const item of originalShows) {
    item.addEventListener("click", addFav);
  }
}

function addFav(ev) {
  selectFav(ev);
  paintFavs();
}
// Selecciono favorito y pinto fondo del seleccionado
function selectFav(ev) {
  const selectedFavShow = parseInt(ev.currentTarget.dataset.index);
  console.log(selectedFavShow);
  const colorFavShow = ev.currentTarget;

  if (favArr.includes(shows[selectedFavShow]) === false) {
    favArr.push(shows[selectedFavShow]);
  }
  colorFavShow.classList.toggle("selected");

  setFavShowsIntoLocalStorage(favArr);
}
let deleteItemArr = [];
// Pinto favoritos en la columna correspondiente
function paintFavs() {
  favListShow.innerHTML = "";
  for (let index = 0; index < favArr.length; index++) {
    favListShow.innerHTML += `<li><div class="fav-list-item"><div class="delete-btn" data-index="${index}">X</div><div class="main-fav"><p class="title-fav">${
      favArr[index].name
    }</p><img src="${
      favArr[index].image
    }" class="js-fav-image"></div></div> </li>`;
  }
  deleteItemArr = document.querySelectorAll(".delete-btn");
  for (const btn of deleteItemArr) {
    btn.addEventListener("click", removeFavShow);
  }
}

function removeFavShow(ev) {
  const favToRemove = parseInt(ev.currentTarget.dataset.index);
  favArr.splice(favToRemove, 1);

  paintFavs();
  setFavShowsIntoLocalStorage(favArr);
}

getFavShowsFromLocalStorage();
paintFavs();

button.addEventListener("click", searchShows);
