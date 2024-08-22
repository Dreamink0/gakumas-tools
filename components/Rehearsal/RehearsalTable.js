import React from "react";
import styles from "./Rehearsal.module.scss";

export default function RehearsalTable({ data }) {
  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th colSpan="3">ステージ1</th>
          <th colSpan="3">ステージ2</th>
          <th colSpan="3">ステージ3</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((stage, j) => (
              <React.Fragment key={j}>
                {stage.map((score, k) => (
                  <td key={k}>{score}</td>
                ))}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
