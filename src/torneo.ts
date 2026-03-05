import { Jugador } from '../src/jugador';
import { Equipo } from '../src/equipo';

export class Torneo {
    private jugadores: Jugador[] | null;
    private equipos: Equipo[] | null;
    private max: number;

    constructor(jugadores: Jugador[], equipos: Equipo[], max: number) {
        this.jugadores = jugadores
        this.equipos = equipos
        if (this.jugadores.length > max || this.equipos.length > max) {
            this.jugadores = null;
            this.equipos = null;
        }
    }

    listar_jugadores(): string {
        let out: string = '';
        for(const jugador of this.jugadores) {
          out += jugador.perfil();
        }
        return out;
    }

    listar_equipos(): string {
        let out: string = '';
        for(const equipo of this.equipos) {
          out += equipo.perfil();
        }
        return out;
    }

    buscarParticipanteJugador(tag: string): Jugador | undefined {
        const busqueda = this.jugadores.find((jug) => jug.g_tag === tag);
        if (busqueda) {
            return busqueda;
        } else {
            return undefined;
        }
    }

    buscarParticipante(id: number): Equipo| Jugador | undefined {
        const busqueda = this.equipos.find((jug) => jug.g_id === id);
        if (busqueda) {
            return busqueda;
        } else {
            for (const equipo of this.equipos) {
                const encontrado = equipo.g_tags.find(
               (jug) => jug.g_id === id);
               return encontrado;
            }
        }
    }

    filtroRango(rank: string): Jugador[] {
      const busqueda = this.jugadores.filter((jug) => jug.g_rank === rank);
      if (busqueda) {
            return busqueda;
        } else {
            for (const equipo of this.equipos) {
                const encontrado = equipo.g_tags.filter(
               (jug) => jug.g_rank === rank);
               return encontrado;
            }
    }
}









}