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
});
