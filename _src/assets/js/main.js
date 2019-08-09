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
      // data = formatData(data);
      shows = data;

      let searchResult = "";

      for (let index = 0; index < shows.length; index++) {
        const showName = shows[index].show.name;

        if (shows[index].show.image === null) {
          shows[
            index
          ].show.image = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`;
        } else {
          shows[index].show.image = shows[index].show.image.medium;
        }

        searchResult += `<div class="js-show-list" data-index='${index}'><p class="show-list-title"> ${showName} </p><img src="${
          shows[index].show.image
        }"></div>`;
      }

      originalListShow.innerHTML = searchResult;

      const originalShows = document.querySelectorAll(".js-show-list");
      for (const item of originalShows) {
        item.addEventListener("click", selectFav);
        item.addEventListener("click", paintFavs);
        // Pinto data (name y image) en el HTML
      }
    });
}

function selectFav(ev) {
  debugger;
  const selectedFavShow = parseInt(ev.currentTarget.dataset.index);
  favArr.push(shows[selectedFavShow]);
  console.log(favArr);
}

function paintFavs() {
  favListShow.innerHTML = "";
  for (const item of favArr) {
    favListShow.innerHTML += `<li><div class="top-title-fav">${
      item.show.name
    } <div class="delete">X</div></div> <img src="${
      item.show.image
    }" class="js-fav-image"></li>`;
  }
}

// function formatData(data) {
//   const result = [];
//   for (const show of data) {
//     result.push({
//       name: show.name,
//       image: show.image,
//       id: show.id
//     });
//   }
//   return result;
// }

// const saveDataInShows = data => {
//   shows = data;
// };

button.addEventListener("click", searchShows);
