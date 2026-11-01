import Icon from './Icon';
import styles from './Button.module.css';

export default function Button({ children, loading, arrow = true, variant = 'primary', ...rest }) {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} {...rest} disabled={rest.disabled || loading}>
      {loading
        ? <span className={styles.spinner} role="status" aria-label="Carregando" />
        : <>{children}{arrow && variant === 'primary' && <Icon name="arrow" size={16} />}</>}
    </button>
  );
}
