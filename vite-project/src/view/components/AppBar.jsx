import Icon from './Icon';
import styles from './AppBar.module.css';

export default function AppBar({ title, onBack, children }) {
  return (
    <header className={styles.bar}>
      <button type="button" className={styles.back} onClick={onBack} aria-label="Voltar">
        <Icon name="back" size={20} />
      </button>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.extra}>{children}</div>
    </header>
  );
}
