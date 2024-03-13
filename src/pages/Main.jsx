import { useState } from "react";
import bgImage from "../assets/images/background.png";

export default function Main() {
  //NORTH
  const [northNorth, setNorthNorth] = useState("");
  const [northSouth, setNorthSouth] = useState("");
  const [northEast, setNorthEast] = useState("");
  const [northWest, setNorthWest] = useState("");

  function handleNorthNorthClick() {
    setNorthNorth("X");
    setNorthEast("");
    setNorthSouth("");
    setNorthWest("");
  }

  function handleNorthSouthClick() {
    setNorthNorth("");
    setNorthEast("");
    setNorthSouth("X");
    setNorthWest("");
  }

  function handleNorthEastClick() {
    setNorthNorth("");
    setNorthEast("X");
    setNorthSouth("");
    setNorthWest("");
  }
  function handleNorthWestClick() {
    setNorthNorth("");
    setNorthEast("");
    setNorthSouth("");
    setNorthWest("X");
  }

  return (
    <div className="container">
      <div className="title">
        <h1>Welcome to the Thief Game</h1>
      </div>

      <div className="container-image">
        <button id="northNorth" onClick={handleNorthNorthClick}>
          {northNorth}
        </button>
        <button id="northNorth" onClick={handleNorthSouthClick}>
          {northSouth}
        </button>
        <button id="northNorth" onClick={handleNorthEastClick}>
          {northEast}
        </button>
        <button id="northNorth" onClick={handleNorthWestClick}>
          {northWest}
        </button>

        <img src={bgImage} alt="" />
      </div>

      <div className="reset">
        <button className="btn btn-warning" id="resteButton">
          Reset
        </button>
        <button>Relaunch</button>
      </div>
    </div>
  );
}
