let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let count = 0;
const winPattrens = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            box.style.color = "blue";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
          }
      
        
    });
});

const gameDraw =  () =>  {
    msg.innerText = `game was Draw. ` ;
    msgContainer.classList.remove("hide");
    disabledBoxes();

};
const disabledBoxes = () => {
    for (let box of boxes ) {
        box.disabled = true;
    }
};
const enabledBoxes = () => {
    for (let box of boxes ) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    msg.innerText = `Congrats , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();;
    
};
const checkWinner = () => {
    for (let pattern of winPattrens) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if (pos1Val != "" &&  pos2val != "" && pos3val != "") {
            if (pos1Val === pos2val && pos2val === pos3val) {
                console.log("Winner",pos1Val);

                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
