import AppBar from '../components/AppBar';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import Card from '../components/Card';
import Field from '../components/Field';
import Stepper from '../components/Stepper';
import SummaryRow from '../components/SummaryRow';
import styles from './Steps.module.css';

export default function StepPhone({ vm }) {
  const { values, summary, loading, error, canSubmit, actions } = vm;
  return (
    <>
      <AppBar title="Cadastro de Perfil" onBack={actions.back} />
      <div className={styles.center}><BrandLogo size="lg" /></div>
      <Stepper current={3} rightLabel="Finalizando" />

      <Card>
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); actions.submitPhone(); }} noValidate>
          <h2 className={styles.title}>Digite seu telefone</h2>
          <div className={styles.rows}>
            <SummaryRow icon="check" label="CPF" value={summary.cpf} onChange={actions.changeCpf} bare />
            <SummaryRow icon="check" label="Nome" value={summary.name} onChange={() => actions.goTo(2)} bare />
          </div>
          <Field
            label="CELULAR COM DDD"
            icon="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(11) 9____-____"
            value={values.phone}
            onChange={(e) => actions.onPhoneChange(e.target.value)}
            hint="Usaremos seu número para confirmar vantagens e pedidos."
            error={error}
          />
          <Button type="submit" loading={loading} disabled={!canSubmit[3]}>Concluir Cadastro</Button>
          <Button type="button" variant="link" onClick={actions.back}>Voltar</Button>
        </form>
      </Card>
    </>
  );
}
