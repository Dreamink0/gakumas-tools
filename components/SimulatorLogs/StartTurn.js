import styles from "./SimulatorLogs.module.scss";

export default function StartTurn({ num, type, multiplier }) {
  return (
    <div className={`${styles.startTurn} ${styles[type]}`}>
      {num}ターン目{" "}
      <span className={styles.multiplier}>{Math.round(multiplier * 100)}%</span>
    </div>
  );
}
