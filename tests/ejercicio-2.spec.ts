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

  test('Verificar ganador diagonal abajo derecha', () => {
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
});
