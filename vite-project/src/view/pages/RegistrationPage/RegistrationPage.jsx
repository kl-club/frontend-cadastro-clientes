import { useSearchParams } from 'react-router-dom';
import { useRegistrationViewModel } from '../../../viewmodel/useRegistrationViewModel';
import StepCpf from '../../steps/StepCpf';
import Card from '../../components/Card';
import styles from './RegistrationPage.module.css';

export default function RegistrationPage() {
  const [params] = useSearchParams();
  const vm = useRegistrationViewModel(params.get('token'));

  // Tenta fechar a aba (aberta via QR Code); se o navegador bloquear, volta no histórico.
  const exit = () => {
    window.close();
    if (window.history.length > 1) window.history.back();
  };

  let content;
  if (vm.session.status === 'loading') {
    content = <p className={styles.state} aria-live="polite">Validando QR Code…</p>;
  } else if (vm.session.status === 'invalid') {
    content = (
      <Card>
        <h2 className={styles.stateTitle}>QR Code inválido ou expirado</h2>
        <p className={styles.state}>Peça um novo código ao atendente e escaneie novamente.</p>
      </Card>
    );
  } else {
    const steps = {
      1: <StepCpf vm={vm} onExit={exit} />,
    };
    content = steps[vm.step] ?? <p className={styles.state}>Próxima etapa em desenvolvimento…</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell} key={vm.step}>{content}</div>
    </main>
  );
}
