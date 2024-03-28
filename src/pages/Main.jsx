import { useState, useEffect } from "react";
import bgImage from "../assets/images/background.png";
const initialButtonStates = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "👮",
  "",
  "👮",
  "👮",
  "🥷",
];
const captureConditions = [
  [0, [1, 2, 3]],
  [3, [1, 0, 12]],
  [2, [1, 0, 8]],
  [14, [15, 13, 12]],
  [12, [15, 3, 14]],
  [13, [15, 7, 14]],
  [10, [8, 9, 11]],
  [8, [11, 10, 2]],
  [9, [11, 6, 10]],
  [5, [7, 4, 6]],
  [7, [5, 4, 13]],
  [6, [5, 4, 9]],
];
const possibleMoves = [
  [1, 2, 3],
  [16, 2, 3, 0],
  [1, 0, 8],
  [1, 0, 12],
  [17, 5, 6, 7],
  [4, 5, 6, 7],
  [4, 5, 9],
  [5, 4, 13],
  [2, 11, 10],
  [6, 11, 10],
  [11, 9, 8],
  [18, 9, 8, 10],
  [14, 15, 3],
  [14, 15, 7],
  [12, 15, 13],
  [14, 12, 13, 19],
  [1, 18, 19, 20],
  [4, 18, 19, 20],
  [11, 16, 17, 20],
  [15, 16, 17, 20],
  [18, 19, 17, 16],
];

export default function Main() {
  const [buttonTexts, setButtonTexts] = useState(initialButtonStates);
  const [isAITurn, setIsAITurn] = useState(false); // Variable to track if it's AI's turn
  const [movedPoliceIndex, setMovedPoliceIndex] = useState(null); // Index of the police that has already moved

  function isValidMove(currentIndex, destinationIndex) {
    return possibleMoves[currentIndex].includes(destinationIndex);
  }

  function makeAIMove() {
    console.log("AI is making moves");
    const thiefIndex = buttonTexts.indexOf("🥷");
    const policeIndices = buttonTexts.reduce((acc, cur, idx) => {
      if (cur === "👮") acc.push(idx);
      return acc;
    }, []);

    // Skip the move if it's not AI's turn or if a police has already moved
    if (!isAITurn || movedPoliceIndex !== null) return;

    let bestMove = null;
    let bestScore = -Infinity;
    let newButtonTexts = null;

    // Evaluate each possible move for each police
    policeIndices.forEach((policeIndex) => {
      possibleMoves[policeIndex].forEach((destinationIndex) => {
        // Check if the destination is empty
        if (buttonTexts[destinationIndex] === "") {
          // Calculate the score for this move based on capture conditions and distance
          let score = 0;
          let captureCount = 0;
          captureConditions.forEach(([playerIndex, captureIndices]) => {
            if (
              buttonTexts[playerIndex] === "🥷" &&
              captureIndices.every((index) => buttonTexts[index] === "👮")
            ) {
              score += 100; // Add a large score bonus for capturing the thief
              captureCount++;
            }
          });

          const thiefDistance = Math.abs(thiefIndex - destinationIndex);
          const policeDistance = Math.abs(policeIndex - destinationIndex);
          const distanceScore = 1 - (thiefDistance + policeDistance) / 40; // Normalize the distance score between 0 and 1
          score += distanceScore * 50; // Add a medium score bonus for moving closer to the thief

          // Update the best move if this move has a higher score
          if (score > bestScore) {
            bestMove = destinationIndex;
            bestScore = score;

            // Update newButtonTexts here
            newButtonTexts = buttonTexts.map((text, i) =>
              i === bestMove ? "👮" : i === policeIndex ? "" : text
            );
          }
        }
      });
    });

    // Set button states with the best move
    setButtonTexts(newButtonTexts);
    setIsAITurn(false); // Set AI's turn to false after moving
    setMovedPoliceIndex(null); // Reset moved police index
  }

  function handleButtonClick(index) {
    const currentIndex = buttonTexts.indexOf("🥷");
    if (!isValidMove(currentIndex, index)) {
      alert("Déplacement non autorisé !");
      return;
    }
    if (buttonTexts[index] === "👮") {
      alert("Il y a déjà un policier à cet emplacement !");
      return;
    }

    const newButtonTexts = buttonTexts.map((text, i) => {
      if (i === index) {
        return "🥷";
      } else if (i === currentIndex) {
        return "";
      }
      return text;
    });

    setButtonTexts(newButtonTexts);
    setIsAITurn(true); // Set AI's turn to true after player's move

    // Vérifier les conditions de victoire du joueur après le mouvement
    checkWinCondition(newButtonTexts);
  }

  function checkWinCondition(newButtonTexts) {
    // Vérifier les conditions de capture

    for (const [playerIndex, policeIndices] of captureConditions) {
      if (
        newButtonTexts[playerIndex] === "🥷" &&
        policeIndices.every(
          (policeIndex) => newButtonTexts[policeIndex] === "👮"
        )
      ) {
        alert("Le joueur 🥷 a été capturé par les policiers !");
        resetGame();
        return;
      }
    }

    // Vérifier la condition de victoire du joueur
    if (newButtonTexts[20] === "🥷") {
      alert("Le joueur 🥷 a gagné !");
      resetGame();
      return;
    }
  }

  useEffect(() => {
    if (isAITurn) {
      makeAIMove();
    }
  }, [buttonTexts, isAITurn]);

  function resetGame() {
    window.location.reload();
  }

  return (
    <div className="container">
      <div className="title">
        <h1>Welcome to the Thief Game</h1>
      </div>

      <div className="container-image">
        {/* NORTH */}
        <div className="northpart">
          <button id="northNorth" onClick={() => handleButtonClick(0)}>
            {buttonTexts[0]}
          </button>
          <button id="northSouth" onClick={() => handleButtonClick(1)}>
            {buttonTexts[1]}
          </button>
          <button id="northEast" onClick={() => handleButtonClick(2)}>
            {buttonTexts[2]}
          </button>
          <button id="northWest" onClick={() => handleButtonClick(3)}>
            {buttonTexts[3]}
          </button>
        </div>

        {/* SOUTH */}
        <div className="southpart">
          <button id="southNorth" onClick={() => handleButtonClick(4)}>
            {buttonTexts[4]}
          </button>
          <button id="southSouth" onClick={() => handleButtonClick(5)}>
            {buttonTexts[5]}
          </button>
          <button id="southEast" onClick={() => handleButtonClick(6)}>
            {buttonTexts[6]}
          </button>
          <button id="southWest" onClick={() => handleButtonClick(7)}>
            {buttonTexts[7]}
          </button>
        </div>

        {/* EAST */}
        <div className="eastpart">
          <button id="eastNorth" onClick={() => handleButtonClick(8)}>
            {buttonTexts[8]}
          </button>
          <button id="eastSouth" onClick={() => handleButtonClick(9)}>
            {buttonTexts[9]}
          </button>
          <button id="eastEast" onClick={() => handleButtonClick(10)}>
            {buttonTexts[10]}
          </button>
          <button id="eastWest" onClick={() => handleButtonClick(11)}>
            {buttonTexts[11]}
          </button>
        </div>

        {/* WEST */}
        <div className="westpart">
          <button id="westNorth" onClick={() => handleButtonClick(12)}>
            {buttonTexts[12]}
          </button>
          <button id="westSouth" onClick={() => handleButtonClick(13)}>
            {buttonTexts[13]}
          </button>
          <button id="westEast" onClick={() => handleButtonClick(14)}>
            {buttonTexts[14]}
          </button>
          <button id="westWest" onClick={() => handleButtonClick(15)}>
            {buttonTexts[15]}
          </button>
        </div>
        {/* CENTER */}
        <div className="centerpart">
          <button id="centerNorth" onClick={() => handleButtonClick(16)}>
            {buttonTexts[16]}
          </button>
          <button id="centerSouth" onClick={() => handleButtonClick(17)}>
            {buttonTexts[17]}
          </button>
          <button id="centerEast" onClick={() => handleButtonClick(18)}>
            {buttonTexts[18]}
          </button>
          <button id="centerWest" onClick={() => handleButtonClick(19)}>
            {buttonTexts[19]}
          </button>
          <button id="centerCenter" onClick={() => handleButtonClick(20)}>
            {buttonTexts[20]}
          </button>
        </div>

        <img src={bgImage} alt="" />
      </div>

      <div className="reset">
        <button
          className="btn btn-warning"
          id="resteButton"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
