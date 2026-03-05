import { Participante } from './participante';
import { Jugador } from './jugador';

export class Equipo extends Participante {
  constructor(
    id: number,
    name: string,
    pais: string,
    fechaInsc: Date,
    puntuacion: number,
    private sponsor: string,
    private tags: Jugador[] | null,
    private min: number,
    private max: number
  ) {
    super(id, name, pais, fechaInsc, puntuacion);
    this.sponsor = sponsor;
    this.tags = tags;
    this.min = min;
    this.max = max;
    if (tags.length > max || tags.length < min) {
      this.tags = null;
    }
  }

  get g_tags() { return this.tags; }


  perfil(): string {
    if (this.tags === null) {
      return 'Numero de tags invalidos';
    }
    let gametag: string = '';
    for (const tag of this.tags) {
      gametag += tag.g_tag + ', ';
    }
    return `ID: ${this.g_id}, Nombre: ${this.g_name}, País: ${this.g_pais}, Fecha Inscripción: ${this.g_fechaInsc}, Puntuación: ${this.g_puntuacion}, Sponsor: ${this.sponsor}, Tags: ${gametag}`;
  }
}
