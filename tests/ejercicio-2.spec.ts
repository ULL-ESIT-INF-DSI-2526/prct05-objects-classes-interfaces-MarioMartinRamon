import { describe, expect, test } from 'vitest';
import { Player, Juego } from '../src/ejercicio-2';

describe('Ejercicio 2', () => {
  test('Colocar ficha en columna vacía', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    expect(juego.colocarFicha(0, 'R')).toBe(true);
    expect(juego.colocarFicha(0, 'A')).toBe(true);
  });

  test('Colocar ficha en columna llena', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    for (let i = 0; i < 6; i++) {
      expect(juego.colocarFicha(0, 'R')).toBe(true);
    }
    expect(juego.colocarFicha(0, 'A')).toBe(false);
  });

  test('Verificar ganador horizontal', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    for (let col = 0; col < 4; col++) {
      expect(juego.colocarFicha(col, 'R')).toBe(true);
    }
    expect(juego.verificarGanador('R')).toBe(true);
  });

  test('Verificar ganador vertical', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    for (let i = 0; i < 4; i++) {
      expect(juego.colocarFicha(0, 'R')).toBe(true);
    }
    expect(juego.verificarGanador('R')).toBe(true);
  });

  test('Verificar columna fuera de rango', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    expect(juego.colocarFicha(-1, 'R')).toBe(false);
    expect(juego.colocarFicha(7, 'A')).toBe(false);
  });

  test('Verificar ganador diagonal abajo derecha', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    const tablero = [
      ['.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.'],
      ['R', '.', '.', '.', '.', '.', '.'],
      ['A', 'R', '.', '.', '.', '.', '.'],
      ['A', 'A', 'R', '.', '.', '.', '.'],
      ['A', 'A', 'A', 'R', '.', '.', '.'],
    ];
    juego.hueco = tablero;
    expect(juego.verificarGanador('R')).toBe(true);
  });

  test('Verificar ganador diagonal arriba derecha', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < i; j++) {
        expect(juego.colocarFicha(i, 'A')).toBe(true);
      }
      expect(juego.colocarFicha(i, 'R')).toBe(true);
    }
    expect(juego.verificarGanador('R')).toBe(true);
  });

  test('Verificar empate', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);

    const tableroEmpate = [
      ['R', 'A', 'R', 'A', 'R', 'A', 'R'],
      ['A', 'R', 'A', 'R', 'A', 'R', 'A'],
      ['R', 'A', 'R', 'A', 'R', 'A', 'R'],
      ['R', 'A', 'R', 'A', 'R', 'A', 'R'],
      ['A', 'R', 'A', 'R', 'A', 'R', 'A'],
      ['R', 'A', 'R', 'A', 'R', 'A', 'R'],
    ];
    juego.hueco = tableroEmpate;

    console.log('Tablero lleno:');
    expect(juego.verificarGanador('R')).toBe(false);
    expect(juego.verificarGanador('A')).toBe(false);
  });

  test('Iniciar el juego y jugar turnos', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);

    expect(juego.jugarTurno(0, j1)).toBe(false);
    expect(juego.jugarTurno(0, j2)).toBe(false);
    expect(juego.jugarTurno(1, j1)).toBe(false);
    expect(juego.jugarTurno(1, j2)).toBe(false);
    expect(juego.jugarTurno(2, j1)).toBe(false);
    expect(juego.jugarTurno(2, j2)).toBe(false);
    expect(juego.jugarTurno(3, j1)).toBe(true); // Jugador 1 gana
  });

  test('No repetir turno', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);

    expect(juego.jugarTurno(0, j1)).toBe(false);
    expect(juego.jugarTurno(0, j1)).toBe(false); // No se puede jugar dos veces seguidas
    expect(juego.jugarTurno(0, j2)).toBe(false);
    expect(juego.jugarTurno(0, j2)).toBe(false); // No se puede jugar dos veces seguidas
  });

  test('Columna llena, no se puede colocar ficha, le vuelve a tocar al mismo jugador', () => {
    const j1 = new Player('Jugador 1', 'R');
    const j2 = new Player('Jugador 2', 'A');
    const juego = new Juego(j1, j2);
    const tablero = [
      ['R', '.', '.', '.', '.', '.', '.'],
      ['A', '.', '.', '.', '.', '.', '.'],
      ['R', '.', '.', '.', '.', '.', '.'],
      ['A', '.', '.', '.', '.', '.', '.'],
      ['R', '.', '.', '.', '.', '.', '.'],
      ['R', '.', '.', '.', '.', '.', '.'],
    ];
    juego.hueco = tablero;
    expect(juego.jugarTurno(0, j1)).toBe(false); // No se puede colocar ficha
    expect(juego.jugarTurno(0, j2)).toBe(false); // No se puede colocar ficha, sigue siendo el turno de j1
    expect(juego.jugarTurno(1, j1)).toBe(false); // j1 juega en otra columna
  });
});
