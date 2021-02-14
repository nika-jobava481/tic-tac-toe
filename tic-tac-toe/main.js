var PC = "O";
var player = "X";
var turn = document.querySelector(".turn");
var btnIns = document.querySelectorAll(".btn-in");
var arrForPcTurns = [...btnIns];
var reloadBtn = document.querySelector(".btn-out");
var playerPointText = document.querySelector(".player");
var PCPointText = document.querySelector(".PC");
var clearLocalStorage = document.querySelector(".clear-local-storage");

var counter = 1;

var won;

if (localStorage["playerPoint"] == undefined) {
    localStorage["playerPoint"] = 0;
}
if (localStorage["PCPoint"] == undefined) {
    localStorage["PCPoint"] = 0;
}
changepoints();

btnIns.forEach(obj => {
    obj.addEventListener("click", function () {
        turn.textContent = "PC Turn";

        this.textContent = player;
        arrForPcTurns.splice(arrForPcTurns.indexOf(this), 1);
        counter++;

        checkWinProbablity();

        arrForPcTurns.forEach(o => {
            o.disabled = true;
        });

        if (counter < 10) {
            if (won != "player-won" && won != "PC-won") {
                PCTurn();
            }
        }

        if (won == "player-won" || won == "PC-won") {
            btnIns.forEach(o => {
                o.style.cursor = "not-allowed";
                o.disabled = true;
            });
        }

        if (obj != "") {
            this.style.cursor = "not-allowed";
            this.disabled = true;
        }

        if (counter == 10) {
            if (won != "player-won" && won != "PC-won") {
                setTimeout(function () {
                    reloadBtn.classList.remove("display-none");
                    alert("Draw");
                }, 400);
            }
        }

    });
});

reloadBtn.addEventListener("click", function () {
    window.location.reload();
});

clearLocalStorage.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
});

function PCTurn() {
    var randIndex = Math.floor(Math.random() * arrForPcTurns.length);
    setTimeout(function () {
        counter++;
        arrForPcTurns[randIndex].textContent = PC;
        arrForPcTurns.splice(randIndex, 1);
        checkWinProbablity();
        arrForPcTurns.forEach(o => {
            o.disabled = false;
        });

        if (won == "player-won" || won == "PC-won") {
            btnIns.forEach(o => {
                o.style.cursor = "not-allowed";
                o.disabled = true;
            });
        }
    }, 800)
}

function changepoints() {
    playerPointText.textContent = `YOU ${localStorage["playerPoint"]}`;
    PCPointText.textContent = `PC ${localStorage["PCPoint"]}`;
}

function checkWinProbablity() {
    if (btnIns[0].textContent == btnIns[1].textContent && btnIns[1].textContent == btnIns[2].textContent && btnIns[2].textContent == player ||
        btnIns[3].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[5].textContent && btnIns[5].textContent == player ||
        btnIns[6].textContent == btnIns[7].textContent && btnIns[7].textContent == btnIns[8].textContent && btnIns[8].textContent == player ||
        btnIns[0].textContent == btnIns[3].textContent && btnIns[3].textContent == btnIns[6].textContent && btnIns[6].textContent == player ||
        btnIns[1].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[7].textContent && btnIns[7].textContent == player ||
        btnIns[2].textContent == btnIns[5].textContent && btnIns[5].textContent == btnIns[8].textContent && btnIns[8].textContent == player ||
        btnIns[0].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[8].textContent && btnIns[8].textContent == player ||
        btnIns[2].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[6].textContent && btnIns[6].textContent == player) {
        won = "player-won"
        setTimeout(function () {
            alert("You won");
            localStorage["playerPoint"] = Number(localStorage["playerPoint"]) + 1;
            changepoints();
            reloadBtn.classList.remove("display-none");
        }, 400);
    } else if (btnIns[0].textContent == btnIns[1].textContent && btnIns[1].textContent == btnIns[2].textContent && btnIns[2].textContent == PC ||
        btnIns[3].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[5].textContent && btnIns[5].textContent == PC ||
        btnIns[6].textContent == btnIns[7].textContent && btnIns[7].textContent == btnIns[8].textContent && btnIns[8].textContent == PC ||
        btnIns[0].textContent == btnIns[3].textContent && btnIns[3].textContent == btnIns[6].textContent && btnIns[6].textContent == PC ||
        btnIns[1].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[7].textContent && btnIns[7].textContent == PC ||
        btnIns[2].textContent == btnIns[5].textContent && btnIns[5].textContent == btnIns[8].textContent && btnIns[8].textContent == PC ||
        btnIns[0].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[8].textContent && btnIns[8].textContent == PC ||
        btnIns[2].textContent == btnIns[4].textContent && btnIns[4].textContent == btnIns[6].textContent && btnIns[6].textContent == PC) {
        won = "PC-won"
        setTimeout(function () {
            alert("PC won");
            localStorage["PCPoint"] = Number(localStorage["PCPoint"]) + 1;
            changepoints();
            reloadBtn.classList.remove("display-none");
        }, 400);
    }
}
