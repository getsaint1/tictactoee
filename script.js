const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'x';
let gameBoard = Array(9).fill(null);
let gameOver = false;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            alert(`${currentPlayer === 'x' ? 'X' : 'O'} wins!`);
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

function handleCellClick(event) {
    if (gameOver) return;

    const index = event.target.dataset.index;

    if (gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    event.target.classList.add(currentPlayer);
    event.target.textContent = currentPlayer === 'x' ? 'X' : 'O';

    checkWinner();

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function resetGame() {
    gameBoard.fill(null);
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
