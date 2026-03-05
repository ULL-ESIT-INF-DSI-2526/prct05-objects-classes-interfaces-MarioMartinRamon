import { describe, expect, test } from 'vitest';
import { Jugador } from '../src/jugador';
import { Equipo } from '../src/equipo';
import { Torneo } from '../src/torneo';

describe('Creacion correcta de Jugador y equipo', () => {
  test('Almacenamietno de todos los datos en Jugador', () => {
    const j1 = new Jugador(
      1,
      'Juan',
      'ESP',
      new Date(2025, 5, 11),
      10,
      'LOLOL',
      'oro',
      5
    );
    expect(j1.perfil()).toBe(
      'ID: 1, Nombre: Juan, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 10, Tag: LOLOL, Rank: oro, Partidas: 5'
    );
  });

  test('Almacenamietno de todos los datos en Equipo', () => {
    const j1 = new Jugador(
      1,
      'Juan',
      'ESP',
      new Date(2025, 5, 11),
      10,
      'LOLOL',
      'oro',
      5
    );
    const j2 = new Jugador(
      2,
      'Pepe',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'JEJE',
      'plata',
      10
    );
    const jugadores: Jugador[] = [j1, j2];

    const equipo = new Equipo(
      10,
      'LOleros',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'Nvidia',
      jugadores,
      1,
      2
    );
    expect(equipo.perfil()).toBe(
      'ID: 10, Nombre: LOleros, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 15, Sponsor: Nvidia, Tags: LOLOL, JEJE, '
    );
  });

  test('Plazaas llenas equipo', () => {
    const j1 = new Jugador(
      1,
      'Juan',
      'ESP',
      new Date(2025, 5, 11),
      10,
      'LOLOL',
      'oro',
      5
    );
    const j2 = new Jugador(
      2,
      'Pepe',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'JEJE',
      'plata',
      10
    );
    const jugadores: Jugador[] = [j1, j2];

    const equipo = new Equipo(
      10,
      'LOleros',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'Nvidia',
      jugadores,
      1,
      1
    );
    expect(equipo.perfil()).toBe('Numero de tags invalidos');
  });

    test('Listar equipo y jugadores de torneo', () => {
    const j1 = new Jugador(
      1,
      'Juan',
      'ESP',
      new Date(2025, 5, 11),
      10,
      'LOLOL',
      'oro',
      5
    );
    const j2 = new Jugador(
      2,
      'Pepe',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'JEJE',
      'plata',
      10
    );
    const jugadores_equipo1: Jugador[] = [j1, j2];

    const equipo1 = new Equipo(
      10,
      'LOleros',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'Nvidia',
      jugadores_equipo1,
      1,
      2
    );

    const j3 = new Jugador(
      3,
      'SEES',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'PROGAMER',
      'diamante',
      14
    );
    const j4 = new Jugador(
      3,
      'NN',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'OOP',
      'oro',
      14
    );

    const jugadores_individuales: Jugador[] = [j3, j4];

    // Mismos integrantes diferente equipo
    const equipo2 = new Equipo(
      10,
      'FORTNITERS',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'PSEC',
      jugadores_equipo1,
      1,
      2
    );

    const equipos: Equipo[] = [equipo1, equipo2];

    const torneo: Torneo = new Torneo(jugadores_individuales, equipos, 6);

    expect(torneo.listar_equipos()).toBe(`ID: 10, Nombre: LOleros, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 15, Sponsor: Nvidia, Tags: LOLOL, JEJE, ID: 10, Nombre: FORTNITERS, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 15, Sponsor: PSEC, Tags: LOLOL, JEJE, `)
    expect(torneo.listar_jugadores()).toBe('ID: 3, Nombre: SEES, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 5, Tag: PROGAMER, Rank: diamante, Partidas: 14ID: 3, Nombre: NN, País: ESP, Fecha Inscripción: 11/6/2025, Puntuación: 5, Tag: OOP, Rank: oro, Partidas: 14');
  });

      test('Buscar participantes', () => {
    const j1 = new Jugador(
      1,
      'Juan',
      'ESP',
      new Date(2025, 5, 11),
      10,
      'LOLOL',
      'oro',
      5
    );
    const j2 = new Jugador(
      2,
      'Pepe',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'JEJE',
      'plata',
      10
    );
    const jugadores_equipo1: Jugador[] = [j1, j2];

    const equipo1 = new Equipo(
      10,
      'LOleros',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'Nvidia',
      jugadores_equipo1,
      1,
      2
    );

    const j3 = new Jugador(
      3,
      'SEES',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'PROGAMER',
      'diamante',
      14
    );
    const j4 = new Jugador(
      3,
      'NN',
      'ESP',
      new Date(2025, 5, 11),
      5,
      'OOP',
      'oro',
      14
    );

    const jugadores_individuales: Jugador[] = [j3, j4];

    // Mismos integrantes diferente equipo
    const equipo2 = new Equipo(
      10,
      'FORTNITERS',
      'ESP',
      new Date(2025, 5, 11),
      15,
      'PSEC',
      jugadores_equipo1,
      1,
      2
    );

    const equipos: Equipo[] = [equipo1, equipo2];

    const torneo: Torneo = new Torneo(jugadores_individuales, equipos, 6);

    expect(torneo.buscarParticipante(1)).toBe(j1)
    expect(torneo.buscarParticipanteJugador('PROGAMER')).toBe(j3);
      });
});
