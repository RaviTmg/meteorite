import React, { useState } from "react";
import longestPalSubstr from "../utils/longestPalSubstr";

const PalindromeCalc = () => {
  const [str, setStr] = useState("");
  const [pal, setPal] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setPal(longestPalSubstr(str));
  };
  return (
    <div>
      <h4>Enter a text to get its longest Palindrome</h4>
      <form onSubmit={handleSubmit}>
        <input value={str} onChange={(e) => setStr(e.target.value)} />
        <button type="submit">go</button>
      </form>
      {pal}
    </div>
  );
};

export default PalindromeCalc;
