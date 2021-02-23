import React, { useState } from "react";
import randomEight from "../utils/randomEight";

const RandomNum = () => {
  const [rand, setRand] = useState({ randFive: null, randEight: null });
  return (
    <div>
      <h4>Random num generator </h4>
      <button onClick={() => setRand(randomEight())}>generate</button>
      <div>Random 5:{rand.randFive}</div>
      <div>Random 8:{rand.randEight}</div>
    </div>
  );
};

export default RandomNum;
