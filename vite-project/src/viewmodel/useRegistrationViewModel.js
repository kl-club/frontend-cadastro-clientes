import { useCallback, useEffect, useState } from 'react';
import { userService } from '../model/services/userService';
import { qrSessionService } from '../model/services/qrSessionService';
import { formatCpf, isValidCpf, onlyDigits } from '../model/entities/user';

export const TOTAL_STEPS = 4;

export function useRegistrationViewModel(qrToken) {
  const [session, setSession] = useState({ status: 'loading' }); // loading | valid | invalid
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null); // registro retornado pela API
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* Valida o QR Code ao abrir a página */
  useEffect(() => {
    let alive = true;
    qrSessionService
      .validate(qrToken)
      .then((s) => alive && setSession({ status: s ? 'valid' : 'invalid', data: s }))
      .catch(() => alive && setSession({ status: 'invalid' }));
    return () => { alive = false; };
  }, [qrToken]);

  const run = useCallback(async (fn) => {
    setLoading(true);
    setError('');
    try { await fn(); } catch (e) { setError(e.message); } finally { setLoading(false); }
  }, []);

  const onCpfChange = (v) => { setError(''); setCpf(formatCpf(v)); };

  /* Etapa 1 → cria (ou retoma) rascunho */
  const submitCpf = () => run(async () => {
    if (!isValidCpf(cpf)) throw new Error('CPF inválido. Confira os números digitados.');
    const digits = onlyDigits(cpf);
    const existing = await userService.findByCpf(digits);
    if (existing?.status === 'active') throw new Error('Este CPF já possui cadastro no KL Club.');
    const draft = existing ?? (await userService.createDraft({ cpf: digits, qrToken }));
    setUser(draft);
    setStep(2);
  });

  return {
    session, step, user, loading, error,
    values: { cpf },
    canSubmit: { 1: onlyDigits(cpf).length === 11 },
    actions: { onCpfChange, submitCpf },
  };
}
