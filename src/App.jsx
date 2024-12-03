import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const App = () => {
  const [word, setWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [hint, setHint] = useState("");
  const [orderOfLeter, setOrderOfLeter] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  const fetchWord = async () => {
    try {
      const response = await axios.get("https://random-word-api.herokuapp.com/word?number=1");
      console.log(response.data[0]);
      const fetchedWord = response.data[0];
      setWord(fetchedWord);
      setShuffledWord(shuffleWord(fetchedWord));
      setHint("");
      setUserInput("");
      setResult("");
      setOrderOfLeter(0);
    } catch (error) {
      console.error("Error fetching the word:", error);
      setWord("error");
      setShuffledWord("error");
      setHint("error");
    }
  };

  const getHint = () => {
    setOrderOfLeter((prevOrder) => prevOrder+1);
      
    const letter = word.charAt(orderOfLeter); 

    if (word && orderOfLeter == 0) {
      setHint(`Hint: The first letter is "${letter}"`);
    } else if (word && orderOfLeter == 1) {
      setHint(`Hint: The second letter is "${letter}"`);
    }else if (word && orderOfLeter == 2) {
      setHint(`Hint: The third letter is "${letter}"`);
    }else if (orderOfLeter >= 3) {
      setHint("You Have Exceeded The Limit");
    }
  };
  
  const shuffleWord = (word) => {
    const shuffled = word.split("").sort(() => 0.5- Math.random()).join("");
    return shuffled === word ? shuffleWord(word) : shuffled; 
  };

  const checkWord = () => {
    if (userInput.toLowerCase() === word.toLowerCase()) {
      setResult("Correct!");
    } else {
      setResult("Incorrect! Try Again.");
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Word Unscramble Game</h1>
      <p>Rearrange the letters and make a valid word</p>
      <h2>{shuffledWord}</h2>
      <h4>{hint}</h4>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Your guess"
       className="input"
      />
      <br />
      <button onClick={checkWord} className="check">
        Check
      </button>
      <button onClick={fetchWord} className="newWord">
        New Word
      </button>
      <button onClick={getHint} className="hint">
        Get Hint
      </button>
      <h3>{result}</h3>
    </div>
  );

};

export default App;
