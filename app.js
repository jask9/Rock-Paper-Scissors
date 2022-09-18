let userScore = 0;
let computerScore = 0;

// -----------------Caching the DOM-----------------
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const user_img = document.getElementById("user-img-thumb");
const comp_img = document.getElementById("comp-img-thumb");
const result_p = document.querySelector(".result p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
// ----------------------------------------------------

// const smallUserWord = "user".fontsize(3).sub();
// const smallCompWord = "comp".fontsize(3).sub();

const smallUserEmoji = "🧑".fontsize(3).sub();
const smallCompEmoji = "🖥️".fontsize(3).sub();

currentUserColour = "";
currentCompColour = "";

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === "r") {
    return "Rock";
  } else if (letter === "p") {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(userChoice)}${smallUserEmoji} beats ${convertToWord(computerChoice)}${smallCompEmoji}. You win!🔥`;

  userGlow("green-glow");
  compGlow("red-glow");

  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("green-glow");
  setTimeout(() => userChoice_div.classList.remove("green-glow"), 400);
}

function lose(userChoice, computerChoice) {
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(userChoice)}${smallUserEmoji} loses to ${convertToWord(computerChoice)}${smallCompEmoji}. You lost!🥺`;

  userGlow("red-glow");
  compGlow("green-glow");

  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("red-glow");
  setTimeout(() => userChoice_div.classList.remove("red-glow"), 400);
}

function draw(userChoice, computerChoice) {
  result_p.innerHTML = `${convertToWord(userChoice)}${smallUserEmoji} equals ${convertToWord(computerChoice)}${smallCompEmoji}. It's a draw!`;

  userGlow("grey-glow");
  compGlow("grey-glow");

  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("grey-glow");
  setTimeout(() => userChoice_div.classList.remove("grey-glow"), 400);
}

function thumbImg(userChoice, computerChoice) {
  let userImgSrc = "images/" + userChoice + ".png";
  let compImgSrc = "images/" + computerChoice + ".png";

  user_img.setAttribute("src", userImgSrc);
  comp_img.setAttribute("src", compImgSrc);
}

function userGlow(uColour) {
  if (currentUserColour !== "") {
    user_img.classList.remove(currentUserColour);
  }
  user_img.classList.add(uColour);
  currentUserColour = uColour;
}

function compGlow(cColour) {
  if (currentCompColour !== "") {
    comp_img.classList.remove(currentCompColour);
  }
  comp_img.classList.add(cColour);
  currentCompColour = cColour;
}

function game(userChoice) {
  const computerChoice = getComputerChoice();

  thumbImg(userChoice, computerChoice);

  switch (userChoice + computerChoice) {
    case "rs":
    case "sp":
    case "pr":
      win(userChoice, computerChoice);
      break;
    case "sr":
    case "ps":
    case "rp":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "ss":
    case "pp":
      draw(userChoice, computerChoice);
      break;
  }
}


function main() {
  rock_div.addEventListener("click", () => game("r"));

  paper_div.addEventListener("click", () => game("p"));

  scissors_div.addEventListener("click", () => game("s"));
}

main();

// if colour once changes to grey, doesn't change back
// on commenting out grey-glow, gets stuck after both turn red
