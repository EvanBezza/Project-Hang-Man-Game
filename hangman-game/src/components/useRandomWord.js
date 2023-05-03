import { useState, useEffect } from "react";

const useRandomWord = () => {
  const [word, setWord] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("../dictionary/dictionary.txt");
      const text = await response.text();
      const words = text
        .substring(text.indexOf("\n\n") + 2)
        .split("\n")
        .filter((word) => word.length >= 5 && word.length <= 12);

      const randomWord = words[Math.floor(Math.random() * words.length)].trim();
      setWord(randomWord);
    };

    fetchWords();
  }, []);

  return word;
};

export default useRandomWord;
