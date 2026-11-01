import styles from './Stepper.module.css';

export default function Stepper({ current, total = 4, rightLabel }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.labels}>
        <span className={styles.step}>ETAPA {current} DE {total}</span>
        <span className={styles.right}>{rightLabel}</span>
      </div>
      <div className={styles.bars} role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < current ? styles.on : ''} />
        ))}
      </div>
    </div>
  );
}
