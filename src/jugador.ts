import { Participante } from './participante';

type Rank = 'bronce' | 'plata' | 'oro' | 'platino' | 'diamante';

export class Jugador extends Participante {
  constructor(
    id: number,
    name: string,
    pais: string,
    fechaInsc: Date,
    puntuacion: number,
    private tag: string,
    private rank: Rank,
    private partidas: number
  ) {
    super(id, name, pais, fechaInsc, puntuacion);
    this.tag = tag;
    this.rank = rank;
    this.partidas = partidas;
  }

  get g_tag(): string {
    return this.tag;
  }

  get g_rank(): string {
    return this.rank;
  }


  perfil(): string {
    return `ID: ${this.g_id}, Nombre: ${this.g_name}, País: ${this.g_pais}, Fecha Inscripción: ${this.g_fechaInsc}, Puntuación: ${this.g_puntuacion}, Tag: ${this.tag}, Rank: ${this.rank}, Partidas: ${this.partidas}`;
  }
}