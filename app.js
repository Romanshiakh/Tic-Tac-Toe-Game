let boxes = document.querySelectorAll(".box"); // make sure to see the quere for all in it.
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let gameBtn = document.querySelector("#game-btn");

let turn0 = true;
let moveCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
        if (moveCount === 9 && !checkWinner()) {
            showDraw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showDraw = () => {
    message.innerHTML = "It is Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = winner => {
    message.innerText = `Congratulation Winner is :  ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner: " + pos1val);
                showWinner(pos1val);
            }
        }
    }
};

gameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
