export const onlyDigits = (v = '') => v.replace(/\D/g, '');

/* ---------- CPF ---------- */
export function formatCpf(value) {
  const d = onlyDigits(value).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export function maskCpf(value) {
  const d = onlyDigits(value);
  if (d.length !== 11) return '';
  return `${d.slice(0, 3)}.***.***-${d.slice(9)}`;
}

export function isValidCpf(value) {
  const d = onlyDigits(value);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const calc = (len) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(d[9]) && calc(10) === Number(d[10]);
}

/* ---------- Nome ---------- */
export const isValidName = (v = '') =>
  v.trim().split(/\s+/).filter((p) => p.length > 1).length >= 2;

/* ---------- Telefone ---------- */
export function formatPhone(value) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function maskPhone(value) {
  const d = onlyDigits(value);
  if (d.length !== 11) return '';
  return `(${d.slice(0, 2)}) ${d[2]}****-**${d.slice(9)}`;
}

export const isValidPhone = (v) => /^[1-9]{2}9\d{8}$/.test(onlyDigits(v));
