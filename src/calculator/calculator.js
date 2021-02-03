import React, { useState } from "react";
import styles from "./styles.css";
import { numbers, operations } from "../components/common";

export default function Calculator({ handleClick, result, number }) {
  return (
    <div className={styles.calculator}>
      <div
        // type="text"
        class={styles.calculatorScreen}
        // value={result ? result : number ? number : 0}
        onKeyDown={handleClick}
        tabIndex={0}
        // ref="text"
        // disabled
      >
        {result ? result : number ? number : 0}
      </div>
      <div class={styles.calculatorKeys}>
        <button
          type="button"
          class={styles.btnsignButton}
          onClick={handleClick}
          value="MC"
        >
          MC
        </button>
        <button
          type="button"
          class={styles.btnsignButton}
          onClick={handleClick}
          value="C"
        >
          C
        </button>
        <button
          type="button"
          class={styles.btnsignButton}
          onClick={handleClick}
          value="CE"
        >
          CE
        </button>
        <button
          type="button"
          class={styles.btnsignButtonBlank}
          value="/"
          disabled
        >
          /
        </button>

        {numbers?.map((item) => (
          <button
            type="button"
            id={item}
            class={styles.btnNumberButton}
            value={item}
            onClick={handleClick}
          >
            {item}
          </button>
        ))}

        <button
          type="button"
          class={styles.equalSign}
          onClick={handleClick}
          value="+"
        >
          +
        </button>
        <button
          type="button"
          class={styles.equalSign1}
          onClick={handleClick}
          value="-"
        >
          -
        </button>
        <button
          type="button"
          class={styles.equalSign2}
          onClick={handleClick}
          value="*"
        >
          &times;
        </button>
        <button
          type="button"
          class={styles.equalSign3}
          onClick={handleClick}
          value="/"
        >
          /
        </button>
      </div>
    </div>
  );
}
