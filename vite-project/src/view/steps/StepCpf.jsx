import AppBar from '../components/AppBar/AppBar';
import BrandLogo from '../components/BrandLogo/BrandLogo';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Field from '../components/Field/Field';
import Icon from '../components/Icon/Icon';
import Stepper from '../components/Stepper/Stepper';
import styles from './Steps.module.css';

export default function StepCpf({ vm, onExit }) {
  const { values, loading, error, canSubmit, actions } = vm;
  return (
    <>
      <AppBar title="Cadastro de Perfil" onBack={onExit} />
      <Stepper current={1} rightLabel="Identificação" />

      <div className={styles.welcome}>
        <div>
          <small>BEM-VINDO(A) AO</small>
          <BrandLogo size="md" />
        </div>
        <span className={styles.badge}><Icon name="shield" size={20} /></span>
      </div>

      <Card>
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); actions.submitCpf(); }} noValidate>
          <div className={styles.titleRow}>
            <span className={styles.titleIcon}><Icon name="id" size={20} /></span>
            <div>
              <h2 className={styles.title}>Digite seu CPF</h2>
              <p className={styles.sub}>Vamos começar seu cadastro no KL Club.</p>
            </div>
          </div>
          <Field
            label="NÚMERO DO CPF"
            side={`${values.cpf.replace(/\D/g, '').length}/11 dígitos`}
            icon="id"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={values.cpf}
            onChange={(e) => actions.onCpfChange(e.target.value)}
            hint="Digite os 11 números do seu CPF."
            error={error}
          />
          <Button type="submit" loading={loading} disabled={!canSubmit[1]}>Continuar</Button>
        </form>
      </Card>
    </>
  );
}
