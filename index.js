let playIcon = "X";
const $cells = $(".cell");
const $resetGameBtn = $("#reset-btn");
const $msgPopup = $(".msg"); //Buttons

//To hide the messages
$msgPopup.hide();
$cells.click(playCell);
$resetGameBtn.click(resetGame);

//Players move
function playCell() {
  function iconColor(icon) {
    if (icon === "O") {
      $clickedCell.css("color", "black");
    } else {
      $clickedCell.css("color", "red");
    }
  }

  const $clickedCell = $(this);
  if ($clickedCell.text() == "") {
    $clickedCell.text(playIcon);
    if (playIcon === "X") {
      playIcon = "O";
      iconColor(playIcon);
    } else {
      playIcon = "X";
      iconColor(playIcon);
    }
  }

  winGame();
}

//Reset Game
function resetGame() {
  $msgPopup.hide();
  $cells.text("");
  $cells.removeClass("win-cell-blue");
  $cells.addClass("use-hover");
  $cells.click(playCell);
  playIcon = "X";
}

//Winning condition
function winGame() {
  function winMessage(winValue) {
    $cells.off("click");
    if (winValue == "O") {
      $cells.removeClass("use-hover");
      $msgPopup
        .html(
          `<div id="msg-box">
          <h1>Player  <span style="color:red">${winValue}</span> wins!!!!</h1>
          </div>`
        )
        .show();
    } else {
      $cells.removeClass("use-hover");
      $msgPopup
        .html(
          `<div id="msg-box">
          <h1>Player ${winValue} wins!!!!</h1>
          </div>`
        )
        .show();
    }
  }
  function cellsColorWinner(a, b, c) {
    $cells[a - 1].classList.add("win-cell-blue");
    $cells[b - 1].classList.add("win-cell-blue");
    $cells[c - 1].classList.add("win-cell-blue");
  }

  function winningCondition(cell1, cell2, cell3) {
    function cellHTMLValue(i) {
      return $cells[i - 1].innerHTML;
      //[cell-1] - just for better iteration of the board, to count from 1 and not 0
    }
    if (
      cellHTMLValue(cell1) === cellHTMLValue(cell2) &&
      cellHTMLValue(cell2) === cellHTMLValue(cell3) &&
      cellHTMLValue(cell3) != ""
    ) {
      cellsColorWinner(cell1, cell2, cell3);
      winMessage(cellHTMLValue(cell1));
    } else {
      draw();
    }
  }
  //Winnigs Possibilities - Verified with a function
  winningCondition(1, 2, 3);
  winningCondition(1, 4, 7);
  winningCondition(1, 5, 9);
  winningCondition(4, 5, 6);
  winningCondition(7, 8, 9);
  winningCondition(2, 5, 8);
  winningCondition(3, 6, 9);
  winningCondition(3, 5, 7);
}

// Draw Condition
function draw() {
  if ($cells.text().length == 9 && !$cells.hasClass("win-cell-blue")) {
    $cells.off("click");
    $cells.removeClass("use-hover");
    $msgPopup
      .html(
        `<div id="msg-box">
          <h1>Thats a Draw!!!</h1>
          </div>`
      )
      .show();
  }
}
