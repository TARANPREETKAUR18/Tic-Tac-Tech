let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let hiddenText = document.querySelector(".hidden-text");

let turnO = true; // turn of playerO
let Count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [6, 7, 8],
];

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    hiddenText.classList.add("hide");
    resetBtn.innerText = "Reset";
    Count = 0;
};

const gameDraw = () => {
    resetBtn.innerText = `Draw`;
    hiddenText.classList.remove("hide");
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    resetBtn.innerText = `${winner} wins`;
    hiddenText.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 !== "" && val2 !== "" && val3 !==""){
            if(val1 === val2 && val2 === val3){
                showWinner(val1);
            }
            else if(Count==9){
                gameDraw();
            }
        }
    }
};

const audioX = new Audio("cross-click.mp3");
const audioY = new Audio("o-click.wav");

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "o";
            turnO = false;
            audioY.play();
        }
        else{
            box.innerText = "x";
            turnO = true;
            audioX.play();
        }
        box.disabled = true;

        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);
