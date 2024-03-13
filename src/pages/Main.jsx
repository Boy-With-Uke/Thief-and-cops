import { useState } from "react";
import bgImage from "../assets/images/background.png";

export default function Main() {
  const [buttonTexts, setButtonTexts] = useState([
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
    "O",
    "",
    "O",
    "O",
    "X",
  ]);

  function isValidMove(currentIndex, destinationIndex) {
    const validMoves = [
      [1, 2, 3], // Bouton 0
      [16, 2, 3, 0], // Bouton 1
      [1, 0, 8], // Bouton 2
      [1, 0, 12], // Bouton 3
      [17, 5, 6, 7], // Bouton 4
      [4, 5, 6, 7], // Bouton 5
      [4, 5, 9], // Bouton 6
      [5, 4, 13], // Bouton 7
      [2, 11, 10], // Bouton 8
      [6, 11, 10], // Bouton 9
      [11, 9, 8], // Bouton 10
      [18, 9, 8, 10], // Bouton 11
      [14, 15, 3], // Bouton 12
      [14, 15, 7], // Bouton 13
      [12, 15, 13], // Bouton 14
      [14, 12, 13, 19], // Bouton 15
      [1, 18, 19, 20], // Bouton 16
      [4, 18, 19, 20], // Bouton 17
      [11, 15, 17, 20], // Bouton 18
      [15, 16, 17, 20], // Bouton 19
      [18, 19, 17, 16], // Bouton 20
    ];

    const validMovesForCurrentButton = validMoves[currentIndex];
    return validMovesForCurrentButton.includes(destinationIndex);
  }

  function handleButtonClick(index) {
    if (buttonTexts[index] === "O") {
      alert("Il y a déjà un policier à cet emplacement !");
      return;
    }

    const currentIndex = buttonTexts.indexOf("X");
    if (!isValidMove(currentIndex, index)) {
      alert("Déplacement non autorisé !");
      return;
    }

    const newButtonTexts = buttonTexts.map((text, i) => {
      if (i === index) {
        return "X";
      } else if (text === "O") {
        return "O";
      } else {
        return "";
      }
    });

    setButtonTexts(newButtonTexts);
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
        <button className="btn btn-warning" id="resteButton">
          Reset
        </button>
      </div>
    </div>
  );
}
