import { useCallback, useEffect, useMemo, useState } from 'react';
import { userService } from '../model/services/userService';
import { qrSessionService } from '../model/services/qrSessionService';
import { formatCpf, formatPhone, isValidCpf, isValidName, isValidPhone, maskCpf, maskPhone, onlyDigits,} from '../model/entities/user';

export const TOTAL_STEPS = 4;

export function useRegistrationViewModel(qrToken) {
  const [session, setSession] = useState({ status: 'loading' }); // loading | valid | invalid
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null); // registro retornado pela API
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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

  /* Handlers dos campos (aplicam máscara) */
  const onCpfChange = (v) => { setError(''); setCpf(formatCpf(v)); };
  const onNameChange = (v) => { setError(''); setName(v); };
  const onPhoneChange = (v) => { setError(''); setPhone(formatPhone(v)); };

  /* Etapa 1 → cria (ou retoma) rascunho */
  const submitCpf = () => run(async () => {
    if (!isValidCpf(cpf)) throw new Error('CPF inválido. Confira os números digitados.');
    const digits = onlyDigits(cpf);
    const existing = await userService.findByCpf(digits);
    if (existing?.status === 'active') throw new Error('Este CPF já possui cadastro no KL Club.');
    const draft = existing ?? (await userService.createDraft({ cpf: digits, qrToken }));
    setUser(draft);
    if (draft.name) setName(draft.name);
    setStep(2);
  });

  /* Etapa 2 → salva nome */
  const submitName = () => run(async () => {
    if (!isValidName(name)) throw new Error('Informe nome e sobrenome como constam no documento.');
    setUser(await userService.update(user.id, { ...user, name: name.trim() }));
    setStep(3);
  });

  /* Etapa 3 → salva telefone e ativa o cadastro */
  const submitPhone = () => run(async () => {
    if (!isValidPhone(phone)) throw new Error('Celular inválido. Use DDD + 9 dígitos.');
    setUser(await userService.update(user.id, {
      ...user, phone: onlyDigits(phone), status: 'active', activatedAt: new Date().toISOString(),
    }));
    setStep(4);
  });

  /* "Alterar" CPF → descarta o rascunho e volta ao início */
  const changeCpf = () => run(async () => {
    if (user?.id) await userService.remove(user.id);
    setUser(null); setName(''); setPhone('');
    setStep(1);
  });

  const goTo = (s) => { setError(''); setStep(s); };
  const back = () => (step === 2 ? changeCpf() : step > 1 && step < 4 && goTo(step - 1));

  const summary = useMemo(() => ({
    cpf: maskCpf(cpf), name: name.trim(), phone: maskPhone(phone),
  }), [cpf, name, phone]);

  return {
    session, step, loading, error,
    values: { cpf, name, phone },
    summary,
    canSubmit: {
      1: onlyDigits(cpf).length === 11,
      2: name.trim().length > 0,
      3: onlyDigits(phone).length === 11,
    },
    actions: {
      onCpfChange, onNameChange, onPhoneChange,
      submitCpf, submitName, submitPhone,
      changeCpf, back, goTo,
      clearName: () => setName(''),
    },
  };
}
