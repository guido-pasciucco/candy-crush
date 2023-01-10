const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const board = [];
const rows = 9;
const columns = 9;
const score = 0;

let currTile;
let otherTile;

window.onload = () => {
    startGame();
    window.setInterval(() => {
        crushCandy();
    }, 100)
}

const randomCandy = () => {
    return candies[Math.floor(Math.random() * candies.length)];
}

const startGame = () => {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

const dragStart = () => currTile = this;
const dragDrop = () => otherTile = this;
const dragOver = () => e.preventDefault();
const dragEnter = () => e.preventDefault();
const dragLeave = () => e.preventDefault();

const dragEnd = () => {
    // check coords of both tiles
    let currCoords = currTile.id.split('-');
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);
    let otherCoords = otherTile.id.split('-');
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
    // set valid movements (since they have to be adjacent tiles)
    let moveLeft = c2 == c1 - 1 && r1 == r2;
    let moveRight = c2 == c1 + 1 && r1 == r2;
    let moveUp = r2 == r1 - 1 && c1 == c2;
    let moveDown = r2 == r1 + 1 && c1 == c2;
    let isAdjacent = moveLeft || moveRight || moveDown || moveUp;
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }
}

const crushCandy = () =>{
    // crushFive();
    // crushFour();
    crushThree();
}

const crushThree = () =>{
    // check rows
    for (let r = 0 ; r < rows ; r++){
        for (let c = 0 ; c < columns-2 ; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
            }
        }
    }    
    // check columns
    for (let c = 0; c < columns; c++){
        for (let r = 0 ; r < rows; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
            }
        }
    }
}






















