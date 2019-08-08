"use strict";

const button = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const originalListShow = document.querySelector(".js-original");
const favListShow = document.querySelector(".js-fav");

let favArr = [];
let shows = [];

function searchShows(event) {
  event.preventDefault();
  let inputValue = input.value;
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  fetch(url) //Busco en la API los datos que necesito
    .then(response => response.json())
    .then(data => {
      shows = data;
      console.log(shows);
      let searchResult = "";

      let showImage = "";

      for (let index = 0; index < shows.length; index++) {
        const showName = shows[index].show.name;

        if (shows[index].show.image === null) {
          showImage = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
        } else {
          showImage = `${shows[index].show.image.medium}`;
        }

        searchResult += `<div class="js-show-list" data-index='${index}'><p> ${showName} </p><img src="${showImage}"></div>`;
      }

      originalListShow.innerHTML = searchResult;

      const originalShows = document.querySelectorAll(".js-show-list");
      for (const item of originalShows) {
        item.addEventListener("click", selectFav);
      }
      // Pinto data (name y image) en el HTML
    });
}

function selectFav(ev) {
  debugger;
  const selectedFavShow = parseInt(ev.currentTarget.dataset.index);
  favArr.push(shows[selectedFavShow]);
  console.log(favArr);
}

function paintFavs() {
  for (const item of favArr) {
    favListShow.innerHTML = `<li>${item.show.name} <img src="${
      item.show.image
    }"></li>`;
  }
}

button.addEventListener("click", searchShows);
