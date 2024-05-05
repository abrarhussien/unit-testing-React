import { useState } from "react";

import "../App.css";

function LetterNumber() {
  const [letter, setLetter] = useState("");
  const [astring, setaString] = useState("");
  const [number, setNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [typing, setIsTyping] = useState(true);

  const letterNumber = (str, letter) => {
    var eNum = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i].toLowerCase() === letter.toLowerCase()) {
        eNum++;
      }
    }
    setNumber(eNum);
  };
  const handleSubmit = () => {
    setIsTyping(false);
    if (!letter | !astring | (letter.length > 1)) {
      setIsError(true);
    } else {
      setIsError(false);
      letterNumber(astring, letter);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-900 flex flex-col justify-center items-center">
        <div>
          <label htmlFor="mySrting" className="text-white text-lg me-3">Inter String</label>
          <input
            // disabled
            type="text"
            name="myString"
            id="mySrting"
            value={astring}
            className="rounded border border-gray-400"
            onChange={(e) => {
              setaString(e.target.value);
              setIsTyping(true);
            }}
          />
        </div>
        <div className="my-4">
          <label htmlFor="myLetter" className="text-white text-lg me-3">Inter the letter</label>
          <input
            // disabled
            type="text"
            name="myLetter"
            id="myLetter"
            value={letter}
            className="rounded border border-gray-400"

            onChange={(e) => {
              setLetter(e.target.value);
              setIsTyping(true);
            }}
          />
        </div>

        <div>
          <button className="border border-gray-500 bg-gray-400 px-4 py-1 rounded mb-2 font-bold" onClick={handleSubmit}>find letter numder</button>
        </div>
        {isError && !typing && (
          <div role="alert" className="text-red-500">Please enter a string and one letter</div>
        )}
        {!isError && !typing && (
          <p className="text-green-300">
            number of {letter || "...."} is {number}{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default LetterNumber;
