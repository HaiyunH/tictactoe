document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const resetButton = document.querySelector(".reset");
    const questionElement = document.querySelector(".question");
    const answerButton = document.querySelector(".answer-btn");
    const answerElement = document.querySelector(".answer");
    const rightButton = document.querySelector(".right-btn");
    const wrongButton = document.querySelector(".wrong-btn");
    const qaSection = document.querySelector(".qa-section");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    let currentCellIndex = null;

    const questions = [
        "Team B underestimated the nuclear threat of the Soviets",
        "Who led the scientist community to oppose the Strategic Defence Initiative?",
        "What does TTAPS stand for, or referring to?",
        "Both Jastrow and Seitz attacked studies on nuclear winter, saying they are misleading and controlled by liberal agenda.",
        "George C. Marshall Institute denounced SDI using ‘tobacco strategy’",
        "What is another name for the Strategic Defence Initiative?",
        "Who published a worst case scenario describing the result of nuclear fallout as a ‘nuclear winter’ in Parade and Foreign Affairs?",
        "How does Jastrow take advantage of Fairness Doctrine?",
        "Is the Nuclear Winter Conclusion supported by multiple simulations/studies?"
    ];

    const answers = [
        "False",
        "Carl Sagan",
        "Page 50, the nuclear winter paper or the initials of its authors",
        "True",
        "False",
        "Star Wars",
        "Carl Sagan",
        "Journalists shall give equal exposure to both sides of views",
        "True"
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");
    
        if (board[index] !== "" || !gameActive) return;
    
        currentCellIndex = index;
        displayQuestion(index);
    }

    function displayQuestion(index) {
        questionElement.textContent = `Q${parseInt(index) + 1}: ${questions[index]}`;
        answerElement.textContent = ""; // Clear any previous answer
        qaSection.style.visibility = "visible";  // Make it visible
        qaSection.style.opacity = "1";           // Ensure full opacity when visible
        answerButton.style.display = "inline-block";
        rightButton.style.display = "none";
        wrongButton.style.display = "none";
    }

    answerButton.addEventListener("click", () => {
        answerElement.textContent = answers[currentCellIndex];
        answerButton.style.display = "none";
        rightButton.style.display = "inline-block";
        wrongButton.style.display = "inline-block";
    });

    // Keep the question and answer visible after clicking Right or Wrong
    rightButton.addEventListener("click", () => {
        updateBoard(true);
    });

    wrongButton.addEventListener("click", () => {
        updateBoard(false);
    });

    function updateBoard(isCorrect) {
        board[currentCellIndex] = isCorrect ? currentPlayer : (currentPlayer === "X" ? "O" : "X");
        cells[currentCellIndex].textContent = board[currentCellIndex];
        // Do not hide qaSection here
        checkResult(); // Check for the game result
    }

    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkResult() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let roundWon = false;
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!board.includes("")) {
            statusText.textContent = "It's a draw!";
            gameActive = false;
        } else {
            changePlayer();
        }
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        qaSection.style.visibility = "hidden"; // Hide qaSection on restart
        qaSection.style.opacity = "0";         // Ensure it's fully transparent
    }

    function displayQuestion(index) {
        questionElement.textContent = `Q${parseInt(index) + 1}: ${questions[index]}`;
        answerElement.textContent = ""; // Clear any previous answer
        qaSection.style.visibility = "visible";  // Make it visible instead of changing display
        qaSection.style.opacity = "1";           // Ensure full opacity when visible
        answerButton.style.display = "inline-block";
        rightButton.style.display = "none";
        wrongButton.style.display = "none";
    }
    

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", restartGame);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
});
