"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

let firstFlip = true;
let firstCard;
let secondCard;
let preventAdditionalClicks = false;

createCards(colors);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    //create new div
    let colorDiv = document.createElement("div");
    //append to div #gameBoard
    gameBoard.appendChild(colorDiv);
    //set new div class to color
    colorDiv.setAttribute("class", color);
    colorDiv.addEventListener("click", handleCardClick);
  }
}

//once clicked, run the flipCard function
function handleCardClick(evt) {
  //check if it is the third click
  if (preventAdditionalClicks) {
    return;
  }
  //check if it is the same card that is clicked
  if (firstCard === evt.target) {
    return;
  }

  flipCard(evt.target);
}

//once clicked, store card information, "flip" the card aka set a background
function flipCard(card) {
  if (firstFlip) {
    //mark off first card has been clicked
    firstFlip = false;
    firstCard = card;
    card.style.backgroundColor = card.className;
    return;
  }
  //clicking the second card
  //stop further cards from being clicked
  //reset to first card has not been clicked
    preventAdditionalClicks = true;
    firstFlip = true;
    secondCard = card;
  //change second card background color
    card.style.backgroundColor = card.className;

  //using stored card information, check if it is a match
    checkMatch(firstCard, secondCard);
}
  //if div class = div class, prevent further clicking
    //background color remains
    //allow clicking again
  //if not a match, unflip cards, in 1s
function checkMatch (card1, card2) {
  if (card1.className === card2.className) {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    preventAdditionalClicks = false;
  } else {
    setTimeout(() => {
      unFlipCard(firstCard, secondCard)
    }, FOUND_MATCH_WAIT_MSECS);
  }
}
//"flip" cards back to white
//allow clicking again
function unFlipCard(card1, card2) {
  card1.style.backgroundColor = "white";
  card2.style.backgroundColor = "white";
  preventAdditionalClicks = false;
}