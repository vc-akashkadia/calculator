import React, { useState } from 'react'
import style from "./styles.css"

export default function Hisory({ history }) {
    console.log("props", history)
    return (
        <div className={style.history}>
            <h4 className={style.historyHeader}> History</h4>
            {history?.map(item => {
                const result = (eval(item) || "") + "";
                return (<p className={style.historyText}>{`${item} = ${result} `}</p>)
            })}
        </div>
    )
}
