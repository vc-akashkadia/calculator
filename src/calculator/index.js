import React, { useState } from "react";
import History from "./hisory";
import Calculator from "./calculator";
import style from "./styles.css";
function isOperator(op) {
  const operatore = ["+", "-", "*", "/", "="].includes(op);
  return Boolean(operatore);
}
export default function Index() {
  const localData = localStorage.getItem("history");
  const historyLocalstore = localData ? JSON.parse(localData) : [];
  const [openHistory, setOpenHistory] = useState(false);
  const [history, setHistory] = useState(historyLocalstore);
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const reset = () => {
    setResult("");
    setNumber("");
  };
  const clearLocal = () => {
    localStorage.removeItem("history");
    setHistory([]);
    setNumber("");
  };

  const backspace = () => {
    setNumber(number.slice(0, -1));
  };

  const handleClick = (e) => {
    setResult();
    let val;
    // const val = e.target.value;
    if (e.keyCode > 95 && e.keyCode < 106) {
      val = e.keyCode - 96;
    } else if (e.keyCode > 47 && e.keyCode < 58) {
      val = e.keyCode - 48;
    } else if (e.keyCode === undefined) {
      val = e.target.value;
    } else if (e.keyCode === 107) {
      val = "+";
    } else if (e.keyCode === 109) {
      val = "-";
    } else if (e.keyCode === 106) {
      val = "*";
    } else if (e.keyCode === 110) {
      val = ".";
    } else if (e.keyCode === 190) {
      val = ".";
    } else if (e.keyCode === 111) {
      val = "/";
    } else if (e.keyCode === 13) {
      e.preventDefault();
      val = "=";
    } else if (e.keyCode === 8) {
      val = "CE";
    } else if (e.keyCode === 187) {
      val = "+";
    } else if (e.keyCode === 189) {
      val = "-";
    }
    const isCurrentValueOperator = isOperator(val);
    let digits = [...number];
    let lastInput = digits[digits.length - 1] || "";
    const isLastValueOperator = isOperator(lastInput) || false;

    if (!digits.length && isCurrentValueOperator) {
      return;
    }
    if (!isLastValueOperator && val === "=") {
      calculate(true);
    } else if (val === "C") {
      reset();
    } else if (val === "CE") {
      backspace();
    } else if (val === "MC") {
      clearLocal();
    } else {
      if (isCurrentValueOperator && isLastValueOperator) {
        lastInput = val;
        digits = digits.join("");
        setNumber(digits);
      } else {
        setNumber(number + val);
      }
    }
  };
  const calculate = (isSave) => {
    reset();
    const isLastCharSpecialChar = /[\/*+-.]$/i.test(number);
    const isStringHasSpecialChar = /[\/*+-.]/.test(number);
    if (!isLastCharSpecialChar && isStringHasSpecialChar) {
      let checkResult = "";
      if (number.includes("--")) {
        checkResult = number.replace("--", "+");
      } else {
        checkResult = number;
      }
      try {
        setResult((eval(checkResult) || "") + "");
        if (isSave) {
          setHistory((history) => [checkResult, ...history]);
          localStorage.setItem(
            "history",
            JSON.stringify([checkResult, ...history])
          );
        }
      } catch (e) {
        setResult(checkResult);
      }
    }
  };

  const handleOpen = () => {
    setOpenHistory(!openHistory);
  };
  return (
    <>
      <button onClick={handleOpen} className={style.viewButton}>
        {openHistory ? "View Calculator" : "View History"}
      </button>
      {openHistory ? (
        <History history={history} />
      ) : (
        <Calculator handleClick={handleClick} number={number} result={result} />
      )}
    </>
  );
}
