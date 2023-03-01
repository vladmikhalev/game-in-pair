import Card from "./card.js";
// import AmazingCard from "./AmazingCard.js";

(function () {
  let arrPareNumber = [];
  // let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
  let successArray = [];
  // let enterNumber = null;

  function createGameTitle() {
    const gameTitle = document.createElement("h2");
    gameTitle.classList.add("mb-5");
    gameTitle.style.textAlign = "center";
    gameTitle.textContent = "Игра в пары";
    return gameTitle;
  }

  function createForm() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    button.setAttribute("data-cy", "submit");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder =
      "Введите количество карточек по вертикали и горизонтали";
    input.type = Number;
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Начать игру";

    button.disabled = true;

    input.addEventListener("input", function () {
      if (input.value.length > 0) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }

      if (arrPareNumber != 0) {
        button.disabled = true;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function creteCardList() {
    const cardList = document.createElement("ul");
    cardList.classList.add("list-group", "list");
    return cardList;
  }

  function flipCardNumber(target) {
    console.log(target.card);
    const gameAgain = createGameAgain();

    if (firstCard === null) {
      firstCard = target.card;
      firstCard.classList.add("card-open");
    } else {
      if (secondCard === null) {
        secondCard = target.card;
        secondCard.classList.add("card-open");
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.textContent == secondCard.textContent) {
        firstCard.classList.add("card-success");
        secondCard.classList.add("card-success");
        successArray.push(firstCard);
        successArray.push(secondCard);
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(() => {
          firstCard.classList.remove("card-open");
          secondCard.classList.remove("card-open");
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }

    if (successArray.length == arrPareNumber.length) {
      document.getElementById("first").append(gameAgain);
    }
  }

  function createGameAgain() {
    const btnAgain = document.createElement("button");
    btnAgain.classList.add("btn", "btn-primary");
    btnAgain.textContent = "Сыграть ещё раз";

    btnAgain.addEventListener("click", () => {
      location.reload();
    });

    return btnAgain;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createGame(container) {
    const gameTitle = createGameTitle();
    const gameForm = createForm();
    const gameList = creteCardList();
    const timer = createTimer();

    container.append(gameTitle);
    container.append(gameForm.form);

    function createTimer() {
      const numberTimer = document.createElement("div");
      numberTimer.classList.add("timer");
      numberTimer.textContent = 180;
      return numberTimer;
    }

    gameForm.form.addEventListener("submit", (e) => {
      e.preventDefault();

      let enterNumber = gameForm.input.value;
      if (!enterNumber || !isFinite(enterNumber)) {
        gameForm.input.value = "";
        return;
      }
      container.append(timer);
      let timerId = setInterval(() => {
        timer.textContent -= 1;
        if (timer.textContent == 0) {
          clearInterval(timerId);
          location.reload();
        }
      }, 1000);

      if (timer.textContent == 0) {
        clearInterval(timerId);
        location.reload();
      }

      container.append(gameList);

      function createCard(enterNumber) {
        for (let i = 1; i <= Math.pow(enterNumber, 2) / 2; i++) {
          arrPareNumber.push(i);
          arrPareNumber.push(i);
        }

        arrPareNumber = shuffle(arrPareNumber);

        for (let i = 0; i < arrPareNumber.length; i++) {
          // const newCard = new AmazingCard(gameList, arrPareNumber[i], flipCardImg)
          new Card(gameList, arrPareNumber[i], flipCardNumber);
        }
      }

      if (enterNumber % 2 == 0 && 2 <= enterNumber && enterNumber <= 10) {
        createCard(enterNumber);
      } else {
        createCard((enterNumber = 4));
      }

      let card_list = document.querySelectorAll("li");
      let card_array = [...card_list];

      switch (+enterNumber) {
        case 2:
          card_array.forEach((li) => {
            li.classList.add("card-2x2");
          });
          break;
        case 4:
          card_array.forEach((li) => {
            li.classList.add("card-4x4");
          });
          break;
        case 6:
          card_array.forEach((li) => {
            li.classList.add("card-6x6");
          });
          break;
        case 8:
          card_array.forEach((li) => {
            li.classList.add("card-8x8");
          });
          break;
        case 10:
          card_array.forEach((li) => {
            li.classList.add("card-10x10");
          });
          break;
      }

      gameForm.input.value = "";
    });
  }

  // window.createGame = createGame;
  document.addEventListener("DOMContentLoaded", () => {
    createGame(document.getElementById("first"));
  });
})();

// let arrPareNumber = [];
// let cardsArray = [];
// let firstCard = null;
// let secondCard = null;
// let successArray = [];
// // enterNumber = null;

// function createGameTitle() {
//   const gameTitle = document.createElement("h2");
//   gameTitle.classList.add("mb-5");
//   gameTitle.style.textAlign = "center";
//   gameTitle.textContent = "Игра в пары";
//   return gameTitle;
// }

// function createForm() {
//   const form = document.createElement("form");
//   const input = document.createElement("input");
//   const buttonWrapper = document.createElement("div");
//   const button = document.createElement("button");

//   form.classList.add("input-group", "mb-3");
//   input.classList.add("form-control");
//   input.placeholder = "Введите количество карточек по вертикали и горизонтали";
//   input.type = Number;
//   buttonWrapper.classList.add("input-group-append");
//   button.classList.add("btn", "btn-primary");
//   button.textContent = "Начать игру";
//   button.setAttribute("data-cy", "submit");

//   button.disabled = true;

//   input.addEventListener("input", function () {
//     if (input.value.length > 0) {
//       button.disabled = false;
//     } else {
//       button.disabled = true;
//     }

//     if (arrPareNumber != 0) {
//       button.disabled = true;
//     }
//   });

//   buttonWrapper.append(button);
//   form.append(input);
//   form.append(buttonWrapper);

//   return {
//     form,
//     input,
//     button,
//   };
// }

// function creteCardList() {
//   const cardList = document.createElement("ul");
//   cardList.classList.add("list-group", "list");
//   return cardList;
// }

// function createCardItem(numberCard, action) {
//   const item = document.createElement("li");
//   item.classList.add("list-group-item", "card");
//   item.textContent = numberCard;

//   const list = document.querySelector(".list");
//   list.addEventListener("click", (event) => {
//     if (event.target == item && !event.target.classList.contains("card-open")) {
//       action(event.target);
//     }
//   });

//   return {
//     item,
//   };
// }

// function flip(target) {
//   const gameAgain = createGameAgain();
//   if (firstCard !== null && secondCard !== null) {
//     if (firstCard != secondCard) {
//       firstCard.classList.remove("card-open");
//       secondCard.classList.remove("card-open");
//       firstCard = null;
//       secondCard = null;
//     }
//   }

//   if (firstCard == null) {
//     firstCard = target;
//     firstCard.classList.add("card-open");
//   } else {
//     if (secondCard == null) {
//       secondCard = target;
//       secondCard.classList.add("card-open");
//     }
//   }

//   if (firstCard !== null && secondCard !== null) {
//     if (firstCard.textContent == secondCard.textContent) {
//       firstCard.classList.add("card-success");
//       secondCard.classList.add("card-success");
//       firstCard.classList.remove("card-open");
//       secondCard.classList.remove("card-open");
//       successArray.push(firstCard);
//       successArray.push(secondCard);
//       firstCard = null;
//       secondCard = null;
//     }
//   }

//   if (successArray.length == arrPareNumber.length) {
//     console.log(typeof successArray.length);
//     console.log(typeof arrPareNumber.length);
//     document.getElementById("first").append(gameAgain);
//   }
// }

// function createGameAgain() {
//   const btnAgain = document.createElement("button");
//   btnAgain.classList.add("btn", "btn-primary");
//   btnAgain.textContent = "Сыграть ещё раз";

//   btnAgain.addEventListener("click", () => {
//     location.reload();
//   });

//   return btnAgain;
// }

// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     console.log(j);
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function createGame(container) {
//   const gameTitle = createGameTitle();
//   const gameForm = createForm();
//   const gameList = creteCardList();
//   const timer = createTimer();
//   // let itemm = createCardItem();

//   container.append(gameTitle);
//   container.append(gameForm.form);

//   function createTimer() {
//     const numberTimer = document.createElement("div");
//     numberTimer.classList.add("timer");
//     numberTimer.textContent = 180;
//     return numberTimer;
//   }

//   gameForm.form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     container.append(timer);
//     let timerId = setInterval(() => {
//       timer.textContent -= 1;
//       if (timer.textContent == 0) {
//         clearInterval(timerId);
//         location.reload();
//       }
//     }, 1000);

//     if (timer.textContent == 0) {
//       clearInterval(timerId);
//       location.reload();
//     }

//     container.append(gameList);

//     let enterNumber = gameForm.input.value;

//     if (!enterNumber || !isFinite(enterNumber)) {
//       return;
//     }

//     function createCard(enterNumber) {
//       for (let i = 1; i <= Math.pow(enterNumber, 2) / 2; i++) {
//         arrPareNumber.push(i);
//         arrPareNumber.push(i);
//       }
//       arrPareNumber = shuffle(arrPareNumber);
//       for (let i = 0; i < arrPareNumber.length; i++) {
//         const cardItem = createCardItem(arrPareNumber[i], flip);
//         cardsArray.push(cardItem);
//         gameList.append(cardItem.item);
//       }
//     }

//     if (enterNumber % 2 == 0 && 2 <= enterNumber && enterNumber <= 10) {
//       createCard(enterNumber);
//     } else {
//       createCard((enterNumber = 4));
//     }

//     let card_list = document.querySelectorAll("li");
//     let card_array = [...card_list];

//     switch (+enterNumber) {
//       case 2:
//         card_array.forEach((li) => {
//           li.classList.add("card-2x2");
//         });
//         break;
//       case 4:
//         card_array.forEach((li) => {
//           li.classList.add("card-4x4");
//         });
//         break;
//       case 6:
//         card_array.forEach((li) => {
//           li.classList.add("card-6x6");
//         });
//         break;
//       case 8:
//         card_array.forEach((li) => {
//           li.classList.add("card-8x8");
//         });
//         break;
//       case 10:
//         card_array.forEach((li) => {
//           li.classList.add("card-10x10");
//         });
//         break;
//     }

//     gameForm.input.value = "";
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   createGame(document.getElementById("first"));
// });
