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

  /**
   * Muestra el tablero en la consola de forma visual, con cada celda representada por su ficha o un punto si está vacía.
   */
  mostrarTabl(): void {
    console.log(
      this.hueco
        .map((fila) => fila.map((celda) => '[' + celda + ']').join(' '))
        .join('\n')
    );
  }

  /**
   * Pone una ficha en la columna especificada, buscando desde la fila más baja hacia arriba para colocarla en el primer espacio disponible. Si la columna está llena o fuera de rango, se muestra un mensaje de error.
   * @param columna El número de columna donde se desea colocar la ficha
   * @param ficha La ficha que se desea colocar en el tablero
   * @returns true si la ficha se colocó correctamente, false si la columna está llena o fuera de rango
   */
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

  /**
   * Verifica si el jugador con la ficha especificada ha ganado el juego al tener cuatro fichas consecutivas en horizontal, vertical o diagonal.
   * @param ficha La ficha del jugador que se desea verificar si ha ganado el juego
   * @returns true si el jugador ha ganado el juego, false si no ha ganado aún
   */
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
    return false;
  }
}

export class Juego extends Tablero {
  private jugador1: Player;
  private jugador2: Player;
  private turno: Player;

  constructor(jugador1: Player, jugador2: Player) {
    super();
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.turno = jugador1;
  }

  /**
   * Alterna el turno entre los dos jugadores después de cada jugada, mostrando un mensaje indicando de quién es el turno actual.
   */
  cambiarTurno(): void {
    if (this.turno === this.jugador1) {
      this.turno = this.jugador2;
      console.log(`Turno de ${this.turno.name} (${this.turno.ficha})\n`);
    } else {
      this.turno = this.jugador1;
      console.log(`Turno de ${this.turno.name} (${this.turno.ficha})\n`);
    }
  }

  /**
   * Juega un turno para el jugador actual, intentando colocar su ficha en la columna especificada.
   *  Si la jugada es válida y se coloca la ficha, se verifica si el jugador ha ganado el juego.
   * Si gana, se muestra un mensaje de victoria; si no, se cambia el turno al siguiente jugador.
   * Si la jugada no es válida (columna llena o fuera de rango), se muestra un mensaje de error y no se cambia el turno.
   * @param columna
   * @param jugador
   * @returns
   */
  jugarTurno(columna: number, jugador: Player): boolean {
    let fichaColocada = false;
    if (jugador !== this.turno) {
      console.log(`No es el turno de ${jugador.name}.\n`);
      return false;
    }
    while (!fichaColocada) {
      fichaColocada = this.colocarFicha(columna, jugador.ficha);
      if (fichaColocada) {
        if (this.verificarGanador(jugador.ficha)) {
          console.log(`${jugador.name} ha ganado!`);
          return true;
        }
        this.cambiarTurno();
        return false;
      }
      console.log('Intenta colocar la ficha en otra columna.');
      return false;
    }
  }
}
