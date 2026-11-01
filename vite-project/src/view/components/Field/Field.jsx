import { useId } from 'react';
import Icon from '../Icon/Icon';
import styles from './Field.module.css';

export default function Field({ label, side, icon, hint, error, onClear, ...inputProps }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <div className={styles.head}>
        <label htmlFor={id}>{label}</label>
        {side && <span>{side}</span>}
      </div>
      <div className={`${styles.box} ${error ? styles.invalid : ''}`}>
        {icon && <Icon name={icon} size={18} className={styles.icon} />}
        <input id={id} aria-invalid={!!error} aria-describedby={`${id}-msg`} {...inputProps} />
        {onClear && inputProps.value && (
          <button type="button" onClick={onClear} aria-label="Limpar campo" className={styles.clear}>
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
      <p id={`${id}-msg`} className={error ? styles.error : styles.hint} role={error ? 'alert' : undefined}>
        {!error && <Icon name="info" size={13} />} {error || hint}
      </p>
    </div>
  );
}
