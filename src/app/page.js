"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  // Sets states for window size
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  // States for quote
  const [quoteId, setQuoteId] = useState(0);
  const [quote, setQuote] = useState(`Loading...`);

  // div image state
  const [divImage, setDivImage] = useState("pattern-divider-desktop.svg");

  // div wifth state
  const [divWidth, setDivWidth] = useState(520);

  //Function to get quote
  async function getQuote() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const randomQuote = await response.json();

    setQuoteId(randomQuote.slip.id);
    setQuote(`${randomQuote.slip.advice}`);
  }

  // Handles resizing of window
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    getQuote();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  // Handles the resizing and setting of divider img
  useEffect(() => {
    const desktopDiv = "pattern-divider-desktop.svg";
    const mobileDiv = "pattern-divider-mobile.svg";

    if (windowSize[0] >= 600) {
      setDivWidth(520);
      setDivImage(desktopDiv);
    }

    if (windowSize[0] <= 599) {
      setDivWidth(320);
      setDivImage(mobileDiv);
    }
  }, [windowSize]);

  return (
    <main className={styles.main}>
      <div className={styles.quotebox}>
        <p className={styles.quotenum}>ADVICE #{quoteId}</p>
        <p className={styles.quote}>"{quote}"</p>
        <Image
          src={divImage}
          alt="Divider Img"
          width={divWidth}
          height="16"
          className={styles.div}
          priority={true}
        />
      </div>
      <button className={styles.button} onClick={getQuote}>
        <Image src="icon-dice.svg" width="24" height="24" alt="Dice Icon" />
      </button>
    </main>
  );
}
