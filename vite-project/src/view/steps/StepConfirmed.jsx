import AppBar from '../components/AppBar';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Stepper from '../components/Stepper';
import SummaryRow from '../components/SummaryRow';
import styles from './Steps.module.css';

export default function StepConfirmed({ vm, onExit }) {
  const { summary } = vm;
  return (
    <>
      <AppBar title="Cadastro de Perfil" onBack={onExit}>
        <span className={styles.active}><Icon name="check" size={12} /> CADASTRO ATIVO</span>
      </AppBar>
      <div className={styles.center}><BrandLogo size="md" /></div>
      <Stepper current={4} rightLabel="CONCLUÍDO" />

      <Card>
        <div className={styles.done}>
          <span className={styles.bigCheck}><Icon name="check" size={32} strokeWidth={3} /></span>
          <h2 className={styles.title}>Cadastro Confirmado!</h2>
          <p className={styles.sub}>Seus dados foram validados com sucesso no KL Club.</p>
        </div>
        <div className={styles.verified}>
          <p className={styles.eyebrow}>Dados verificados</p>
          <SummaryRow icon="id" label="CPF" value={summary.cpf} />
          <SummaryRow icon="user" label="Nome" value={summary.name} />
          <SummaryRow icon="phone" label="Telefone" value={summary.phone} />
        </div>
      </Card>

      <div className={styles.footer}>
        <Button type="button" arrow={false} onClick={onExit}>Concluir e Fechar</Button>
      </div>
    </>
  );
}
