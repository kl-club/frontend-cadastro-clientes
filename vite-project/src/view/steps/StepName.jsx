import AppBar from '../components/AppBar';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import Card from '../components/Card';
import Field from '../components/Field';
import Stepper from '../components/Stepper';
import SummaryRow from '../components/SummaryRow';
import styles from './Steps.module.css';

export default function StepName({ vm }) {
  const { values, summary, loading, error, canSubmit, actions } = vm;
  return (
    <>
      <AppBar title="Cadastro de Perfil" onBack={actions.back} />
      <div className={styles.center}><BrandLogo size="lg" /></div>
      <Stepper current={2} rightLabel="50% concluído" />

      <Card>
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); actions.submitName(); }} noValidate>
          <div>
            <p className={styles.eyebrow}>Identificação</p>
            <h2 className={styles.title}>Como você se chama?</h2>
          </div>
          <SummaryRow icon="check" label="Documento validado" value={`CPF: ${summary.cpf}`} onChange={actions.changeCpf} bare />
          <Field
            label="Nome Completo"
            side="Obrigatório"
            icon="id"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Nome e sobrenome"
            value={values.name}
            onChange={(e) => actions.onNameChange(e.target.value)}
            onClear={actions.clearName}
            hint="Insira seu nome e sobrenome como constam no documento."
            error={error}
          />
          <Button type="submit" loading={loading} disabled={!canSubmit[2]}>Continuar</Button>
          <Button type="button" variant="link" onClick={actions.back}>Voltar para etapa anterior</Button>
        </form>
      </Card>
    </>
  );
}
