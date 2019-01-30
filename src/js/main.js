var player1name = "";
var player2name = "";
var gameState = 0;
var gridState = [];
var turnState = 1;
var gridSize = 3;

document.getElementsByTagName("body")[0].addEventListener("load", renderGame);

function player1nameChange(val) {
  player1name = val;
  console.log(player1name);
}

function player2nameChange(val) {
  player2name = val;
}

function toggleGameState() {
  if(gameState == 0) {
    gameState = 1;
  } else {
    gameState = 1;
  }
  renderGame();
}

function gridSizeChange(size) {
  gridSize = size;
}

function boxClicked(event) {
  row = event.srcElement.id[4];
  column = event.srcElement.id[5];
  elem = document.getElementById(event.srcElement.id);
  console.log(row + " " + column);
  console.log(gridState[((parseInt(row) - 1) * gridSize) + (parseInt(column) - 1)]);
  if(gridState[((parseInt(row) - 1) * gridSize) + (parseInt(column) - 1)] == 0) {
    if(turnState == 1) {
      gridState[((parseInt(row) - 1) * gridSize) + (parseInt(column) - 1)] = 1;
      elem.innerHTML = "X";
    } else {
      gridState[((parseInt(row) - 1) * gridSize) + (parseInt(column) - 1)] = 2;
      elem.innerHTML = "O";
    }
  }
  // console.log();
  checkGame();
}

function checkGame() {
  rowWin = checkRows();
  columnWin = checkColumns();
  diagonalWin = checkDiagonals();
  console.log(rowWin + " " + columnWin + " " + diagonalWin);
  if(rowWin || columnWin || diagonalWin) {
    if(turnState == 1) {
      document.getElementById('resultDiv').innerHTML = "winner player X :" + player1name;
    } else {
      document.getElementById('resultDiv').innerHTML = "winner player O :" + player2name;
    }
    return;
  }
  var tie = true;
  for(i = 0; i < (gridSize * gridSize); i++) {
    if(gridState[i] != 0) {
      continue;
    } else {
      tie = false;
      break;
    }
  }
  if(tie == true) {
    document.getElementById('resultDiv').innerHTML = "Game Tied";
    return;
  }
  if(turnState == 1) {
    turnState = 0;
  } else {
    turnState = 1;
  }
}

function checkRows() {
  var noWin = false;
  for(var i = 1; i <= gridSize; i++) {
    noWin = false;
    var col = gridState[((parseInt(i) - 1) * gridSize) + 0];
    for(var j = 1; j < gridSize; j++) {
      if(col != gridState[((parseInt(i) - 1) * gridSize) + j] || gridState[((parseInt(i) - 1) * gridSize) + j] == 0)
      {
        noWin = true;
        break;
      }
    }
    if(noWin == false) {
      return true;
    }
  }
  return false;
}

function checkColumns() {
  var noWin = false;
  for(var i = 1; i <= gridSize; i++) {
    noWin = false;
    var row = gridState[(parseInt(i) - 1)];
    for(var j = 1; j < gridSize; j++) {
      if(row != gridState[(parseInt(j) * gridSize) + (parseInt(i) - 1)] || gridState[(parseInt(j) * gridSize) + (parseInt(i) - 1)] == 0)
      {
        noWin = true;
        break;
      }
    }
    if(noWin == false) {
      return true;
    }
  }
  return false;
}

function checkDiagonals() {
  var noWin = false;
  for(var i = 1; i < gridSize; i++) {
    if(gridState[((parseInt(i) - 1) * gridSize) + (parseInt(i) - 1)] != gridState[(parseInt(i) * gridSize) + parseInt(i)] || gridState[(parseInt(i) * gridSize) + parseInt(i)] == 0) {
      noWin = true;
      break;
    }
  }
  if(noWin == false) {
    console.log("normal diagnol");
    return true;
  }
  noWin = false;
  for(var i = 1; i < gridSize; i++) {
    if(gridState[((parseInt(i) - 1) * gridSize) + (gridSize - ((i - 1) + 1))] != gridState[(parseInt(i) * gridSize) + (gridSize - (i + 1))] || gridState[(parseInt(i) * gridSize) + (gridSize - (i + 1))] == 0) {
      noWin = true;
      break;
    }
  }
  if(noWin == false) {
    console.log("reverse diagnol");
    return true
  }
  return false;
}

function renderGame() {
  var inputbody = document.getElementById('inputDiv');
  var gamebody = document.getElementById('gameDiv');
  var gamebox = document.getElementById('gameBox');
  gameBox.style.width = (52 * gridSize) + 'px';
  if(gameState == 0) {
    inputbody.style.display = "block";
    gamebody.style.display = "none";
  } else {
    inputbody.style.display = "none";
    gamebody.style.display = "block";
    for(var i = 0; i < gridSize; i++) {
      for(var j = 0; j < gridSize; j++) {
        var node = document.createElement('div');
        node.className = 'game-input';
        node.id = 'box-' + (i + 1) + (j + 1);
        node.addEventListener("click", boxClicked);
        // var node = document.createElement('<div class="game-input" id="box-' + (i + 1) + (j + 1) + '" onclick="boxClicked(this)"></div>');
        gamebox.append(node);
        gridState.push(0);
      }
    }

  }
  // setGridState();
}

function setGridState() {
  var gridState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

document.getElementById("start-button").addEventListener("click", toggleGameState);
