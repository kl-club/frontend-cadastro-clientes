import styles from './BrandLogo.module.css';

export default function BrandLogo({ size = 'md' }) {
  return (
    <div className={`${styles.logo} ${styles[size]}`} role="img" aria-label="KL Club">
      <span className={styles.mark}><i /><i /><i /><i /></span>
      <span className={styles.text}>
        <strong>KL Club</strong>
        {size === 'lg' && <small>Clube de vantagens</small>}
      </span>
    </div>
  );
}
