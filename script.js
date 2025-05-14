const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameOver = false;
const resetBtn = document.getElementById('resetBtn');


const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            statusText.textContent = `Player ${board[a]} wins!`;
            cells.forEach(cell => cell.classList.add('no-click'));
            document.getElementById('board').classList.add('fade-board');
            document.getElementById('resetBtn').classList.add('show');
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        statusText.textContent = `It's a draw!`;
        document.getElementById('board').classList.add('fade-board');
        document.getElementById('resetBtn').classList.add('show');
    }
  }

function handleClick(e) {
    if (gameOver) return; // block clicks


    const index = e.target.getAttribute('data-index');
    //is square already filled if yes return.
    if (board[index] !== '') return;
    //if cell is empty mark in board array

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
    
    if (!gameOver) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}


cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });


function resetGame() {
    board = Array(9).fill('');
    gameOver = false;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('no-click');
      });

      document.getElementById('board').classList.remove('fade-board');
      document.getElementById('resetBtn').classList.remove('show');
}

resetBtn.addEventListener('click', resetGame);

const title = document.getElementById('title');

title.addEventListener('click', () => {
  resetBtn.classList.add('show');
});
