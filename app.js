let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX playerO
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.classList.add("colorO");
      box.classList.remove("colorX");
      box.innerText = "O";
      turnO = false;
      count++;
    } else {
      box.classList.add("colorX");
      box.classList.remove("colorO");
      box.innerText = "X";
      turnO = true;
      count++;
    }
    box.disabled = true;

    checkWinner();
  });
});

const enableBoxes = () => {
  for(box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const disableBoxes = () => {
  for(box of boxes){
    box.disabled = true;
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const draw = () => {
  msg.innerText = `Game draw, Both player are nice`
  msgContainer.classList.remove("hide");
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;  

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        showWinner(pos1Val);
      }
      if(count === 9){
        draw();
      }
    }
  }
};


const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);