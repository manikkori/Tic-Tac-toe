const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill('');

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

// Create game board
function createBoard() {
  board.innerHTML = '';
  cells.forEach((val, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.innerText = val;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

// Handle cell click
function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (!gameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (checkWinner()) {
    status.innerText = `🎉 Player ${currentPlayer} Wins!`;
    highlightWinningCells();
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    status.innerText = "🤝 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      // store winning combination
      winningCombo = combo;
      return true;
    }
    return false;
  });
}

// Highlight winning cells
function highlightWinningCells() {
  winningCombo.forEach(i => {
    document.querySelectorAll('.cell')[i].classList.add('winner');
  });
}

// Restart game
function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  cells = Array(9).fill('');
  status.innerText = `Player ${currentPlayer}'s Turn`;
  createBoard();
}

// Start
let winningCombo = [];
createBoard();
