"use strict";

const button = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const originalListShow = document.querySelector(".js-original");
const favListShow = document.querySelector(".js-fav");

let favArr = [];
let shows = [];
let deleteShowArr = [];

const initApp = () => {
  searchShows(event);
  paintShows();
};

const addFav = ev => {
  selectFav(ev);
  paintFavs();
};

// Set and Get from localStorage
const getFavShowsFromLocalStorage = () => {
  const itemInLocalStorage = JSON.parse(localStorage.getItem("fav-shows"));
  if (itemInLocalStorage !== null) {
    favArr = itemInLocalStorage;
  }
};

const setFavShowsIntoLocalStorage = () => {
  localStorage.setItem("fav-shows", JSON.stringify(favArr));
};

// Search inside API
const searchShows = event => {
  event.preventDefault();
  let inputValue = input.value;
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  fetch(url) //Busco en la API los datos que necesito
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        formatAndSaveData(data);
        paintShows(data);
      } else {
        originalListShow.innerHTML = "No hay resultados para esta búsqueda";
      }
    });
};

// Format data to get only the info that I want
const formatAndSaveData = data => {
  const result = [];
  for (const index of data) {
    result.push({
      name: index.show.name,
      image: index.show.image,
      id: index.show.id,
      language: index.show.language,
      genre: index.show.genres
    });
  }
  shows = result;
};

let searchResult = "";
const paintShows = () => {
  for (let index = 0; index < shows.length; index++) {
    const showName = shows[index].name;
    if (shows[index].image === null) {
      shows[
        index
      ].image = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
    } else {
      shows[index].image = shows[index].image.medium;
    }
    searchResult += `<div class="js-show-list" data-index='${index}'><p class="show-list-title">${showName}</p><img class="img-original" src="${
      shows[index].image
    }"></div>`;
  }

  originalListShow.innerHTML = searchResult;

  // selectFav listener
  const originalShows = document.querySelectorAll(".js-show-list");
  for (const item of originalShows) {
    item.addEventListener("click", addFav);
  }
};

// Select favorite show and paint selected item background
const selectFav = ev => {
  const selectedFavShow = parseInt(ev.currentTarget.dataset.index);
  const colorFavShow = ev.currentTarget;

  if (favArr.includes(shows[selectedFavShow]) === false) {
    favArr.push(shows[selectedFavShow]);
  }
  colorFavShow.classList.add("selected");

  setFavShowsIntoLocalStorage(favArr);
};

// Paint favorites in their column
const paintFavs = () => {
  favListShow.innerHTML = "";
  for (let index = 0; index < favArr.length; index++) {
    favListShow.innerHTML += `<li><div class="fav-list-item"><div class="delete-btn" data-index='${index}'>X</div><div class="main-fav"><p class="title-fav">${
      favArr[index].name
    }</p><img src="${
      favArr[index].image
    }" class="js-fav-image"></div></div> </li>`;
  }

  // removeFavShow listener
  deleteShowArr = document.querySelectorAll(".delete-btn");
  for (const btn of deleteShowArr) {
    btn.addEventListener("click", removeFavShow);
  }
};

// Remove shows from favorites
const removeFavShow = ev => {
  const favToRemove = parseInt(ev.currentTarget.dataset.index);
  favArr.splice(favToRemove, 1);
  paintFavs();
  setFavShowsIntoLocalStorage(favArr);
};

getFavShowsFromLocalStorage();
paintFavs();

button.addEventListener("click", initApp);
