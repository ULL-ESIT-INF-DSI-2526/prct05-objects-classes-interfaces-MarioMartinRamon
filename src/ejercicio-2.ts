type Ficha = 'R' | 'A' | '.';

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
  public hueco: (Ficha | string)[][];
  private readonly filas = 6;
  private readonly columnas = 7;

  constructor() {
    this.hueco = Array.from({ length: this.filas }, () =>
      Array(this.columnas).fill('.')
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
      if (this.hueco[fila][columna] === '.') {
        this.hueco[fila][columna] = ficha;
        this.mostrarTabl();
        console.log(`\nFicha ${ficha} colocada en columna ${columna}.\n`);

        return true;
      }
    }
    console.log('Columna llena.');
    return false;
  }

    verificarGanador(ficha: Ficha): boolean {
    // Verificar horizontal
    for (let fila = 0; fila < this.filas; fila++) {
      for (let col = 0; col <= this.columnas - 4; col++) {
        // porque a partir de columna 4 ya no hay espacio para 4 fichas
        if (
          this.hueco[fila][col] === ficha &&
          this.hueco[fila][col + 1] === ficha &&
          this.hueco[fila][col + 2] === ficha &&
          this.hueco[fila][col + 3] === ficha
        ) {
          return true;
        }
      }
    }
    // Verificar vertical
    for (let col = 0; col < this.columnas; col++) {
      for (let fila = 0; fila <= this.filas - 4; fila++) {
        // porque a partir de fila 3 ya no hay espacio para 4 fichas
        if (
          this.hueco[fila][col] === ficha &&
          this.hueco[fila + 1][col] === ficha &&
          this.hueco[fila + 2][col] === ficha &&
          this.hueco[fila + 3][col] === ficha
        ) {
          return true;
        }
      }
    }

    // Verificar diagonal (abajo a la derecha)
    for (let fila = 0; fila <= this.filas - 4; fila++) {
      for (let col = 0; col <= this.columnas - 4; col++) {
        if (
          this.hueco[fila][col] === ficha &&
          this.hueco[fila + 1][col + 1] === ficha &&
          this.hueco[fila + 2][col + 2] === ficha &&
          this.hueco[fila + 3][col + 3] === ficha
        ) {
          return true;
        }
      }
    }
    // Verificar diagonal (arriba a la derecha)
    for (let fila = 3; fila < this.filas; fila++) {
      for (let col = 0; col <= this.columnas - 4; col++) {
        if (
          this.hueco[fila][col] === ficha &&
          this.hueco[fila - 1][col + 1] === ficha &&
          this.hueco[fila - 2][col + 2] === ficha &&
          this.hueco[fila - 3][col + 3] === ficha
        ) {
          return true;
        }
      }
    }
    this.mostrarTabl();
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
