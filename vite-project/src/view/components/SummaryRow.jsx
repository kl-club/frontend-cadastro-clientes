import Icon from './Icon';
import styles from './SummaryRow.module.css';

/** Linha de dado validado. Com onChange mostra "Alterar"; sem, mostra o check. */
export default function SummaryRow({ icon, label, value, onChange, bare }) {
  return (
    <div className={`${styles.row} ${bare ? styles.bare : ''}`}>
      <span className={styles.ico}><Icon name={icon} size={16} /></span>
      <div className={styles.txt}>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
      {onChange
        ? <button type="button" onClick={onChange} className={styles.change}>Alterar</button>
        : <Icon name="check" size={16} className={styles.ok} />}
    </div>
  );
}
