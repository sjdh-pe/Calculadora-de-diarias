import { toISO } from './formatadores.js';

export function dayDiff(start, end) {
  const MS = 1000 * 60 * 60 * 24;
  return Math.round((end - start) / MS);
}

export function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function calcularPascoa(ano) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia, 12, 0, 0);
}

export function adicionarDias(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() + dias);
  return nova;
}

export function getFeriadosNacionais(ano) {
  const pascoa = calcularPascoa(ano);
  const paixaoDeCristo = adicionarDias(pascoa, -2);
  return new Set([
    `${ano}-01-01`, toISO(paixaoDeCristo), `${ano}-04-21`, `${ano}-05-01`,
    `${ano}-09-07`, `${ano}-10-12`, `${ano}-11-02`, `${ano}-11-15`,
    `${ano}-11-20`, `${ano}-12-25`
  ]);
}

export function classificarRetorno(date, feriadoMunicipalMarcado) {
  if (!date) return { especial: false, motivo: 'Retorno parcial' };
  if (feriadoMunicipalMarcado) return { especial: true, motivo: 'Feriado municipal' };
  if (isWeekend(date)) return { especial: true, motivo: date.getDay() === 6 ? 'Sábado' : 'Domingo' };
  
  const feriadosNacionais = getFeriadosNacionais(date.getFullYear());
  if (feriadosNacionais.has(toISO(date))) return { especial: true, motivo: 'Feriado nacional' };
  
  return { especial: false, motivo: 'Retorno parcial' };
}