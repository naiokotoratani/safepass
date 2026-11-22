/**
 * ADAPTER TEMPORÁRIO DE DEMONSTRAÇÃO.
 * Remover esta pasta quando a API definitiva estiver disponível.
 * As telas devem consumir estes métodos, nunca acessar localStorage diretamente.
 */
export type DemoDependent = { id: string; name: string; kind: "Pessoa" | "Pet"; permission: boolean };
export type DemoDocument = { id: string; name: string; category: string; date: string; status: string };
export type DemoProvider = { id: string; name: string; category: string; city: string; rating: number; tags: string[] };
const STORAGE_KEY = "safepass.frontend-demo.v1";
type DemoState = { points: number; favorites: string[]; dependents: DemoDependent[]; documents: DemoDocument[]; redemptions: { id: string; benefit: string; token: string; expiresAt: string; status: string }[] };
const initial: DemoState = {
  points: 1250,
  favorites: [],
  dependents: [{ id: "dep-1", name: "Dependente de demonstração", kind: "Pessoa", permission: true }, { id: "dep-2", name: "Pet de demonstração", kind: "Pet", permission: false }],
  documents: [{ id: "doc-1", name: "Comprovante de cadastro", category: "Cadastro", date: "2026-11-01", status: "Disponível" }],
  redemptions: [],
};
function read(): DemoState {
  if (typeof window === "undefined") return initial;
  try { const raw = window.localStorage.getItem(STORAGE_KEY); return raw ? { ...initial, ...JSON.parse(raw) as Partial<DemoState> } : initial; } catch { return initial; }
}
function write(state: DemoState) { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export const demoApi = {
  async dashboard() { return { points: read().points, plan: "Plano demonstrativo", dependents: read().dependents.length, upcoming: [] as string[] }; },
  async providers(): Promise<DemoProvider[]> { return [{ id: "p-1", name: "Clínica demonstrativa", category: "Saúde", city: "Brasília - DF", rating: 4.8, tags: ["Consulta", "Bem-estar"] }, { id: "p-2", name: "Espaço de bem-estar", category: "Bem-estar", city: "Taguatinga - DF", rating: 4.6, tags: ["Terapias"] }, { id: "p-3", name: "Centro de atividades", category: "Atividade física", city: "Águas Claras - DF", rating: 4.9, tags: ["Esporte"] }]; },
  async state() { return read(); },
  async toggleFavorite(id: string) { const state = read(); state.favorites = state.favorites.includes(id) ? state.favorites.filter(x => x !== id) : [...state.favorites, id]; write(state); return state.favorites; },
  async redeem(benefit: string, cost: number) { const state = read(); if (state.points < cost) throw new Error("Saldo insuficiente para este resgate."); state.points -= cost; const token = `SP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; const expiresAt = new Date(Date.now() + 7 * 86400000).toISOString(); state.redemptions.unshift({ id: crypto.randomUUID(), benefit, token, expiresAt, status: "Aguardando validação" }); write(state); return state.redemptions[0]; },
  async saveDependent(value: DemoDependent) { const state = read(); const index = state.dependents.findIndex(x => x.id === value.id); if (index >= 0) state.dependents[index] = value; else state.dependents.push(value); write(state); return state.dependents; },
  async removeDependent(id: string) { const state = read(); state.dependents = state.dependents.filter(x => x.id !== id); write(state); return state.dependents; },
  async uploadDocument(name: string) { const state = read(); state.documents.unshift({ id: crypto.randomUUID(), name, category: "Enviado pelo usuário", date: new Date().toISOString().slice(0,10), status: "Armazenado apenas neste navegador" }); write(state); return state.documents; },
};
