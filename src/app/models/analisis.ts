export class Analisis {
  id?: number;
  fecha!: string;
  resultado!: string;
  tipo!: string;
  user!: { id: number }; // <-- Relaciona con usuario
}