type Ficha = 'R' | 'A';

interface Jugador {
  name: string;
  ficha: Ficha;
}

export class Player implements Jugador {
  name: string;
  ficha: Ficha;

  constructor(name: string, ficha: Ficha) {
    this.name = name;
    this.ficha = ficha;
  }
}

abstract class Tablero {
  private hueco: (Ficha | null)[][];
  private readonly filas = 6;
  private readonly columnas = 7;

  constructor() {
    this.hueco = Array.from({ length: this.filas }, () =>
      Array(this.columnas).fill(null)
    );
  }

  mostrarTabl(): void {
    console.log(
      this.hueco
        .map((fila) =>
          fila.map((celda) => '[' + celda + ']' || '[.]').join(' ')
        )
        .join('\n')
    );
  }

  colocarFicha(columna: number, ficha: Ficha): boolean {
    if (columna < 0 || columna >= this.columnas) {
      console.log('Columna fuera de rango.');
      return false;
    }
    for (let fila = this.filas - 1; fila >= 0; fila--) {
      if (this.hueco[fila][columna] === null) {
        this.hueco[fila][columna] = ficha;
        return true;
      }
    }
    console.log('Columna llena.');
    return false;
  }
}

export class Juego extends Tablero {
  private jugador1: Player;
  private jugador2: Player;

  constructor(jugador1: Player, jugador2: Player) {
    super();
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
  }
}
