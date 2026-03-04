interface ElementoBiblio {
  título: string;
  autores: string[];
  palabrasClave: string[];
  resumen: string;
  fechaPublicacion: string;
  paginas: number[];
  editorial: string;
  obtenerReferenciaIEEE(): string;
}

abstract class Publicacion implements ElementoBiblio {
  constructor(
    public título: string,
    public autores: string[],
    public palabrasClave: string[],
    public resumen: string,
    public fechaPublicacion: string,
    public paginas: number[],
    public editorial: string
  ) {}

  abstract obtenerReferenciaIEEE(): string;
}

export class Articulo extends Publicacion {
  constructor(
    título: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: string,
    paginas: number[],
    editorial: string,
    public volumen: number,
    public número: number
  ) {
    super(
      título,
      autores,
      palabrasClave,
      resumen,
      fechaPublicacion,
      paginas,
      editorial
    );
  }

  obtenerReferenciaIEEE(): string {
    return `${this.autores.join(', ')}. "${this.título}", ${this.editorial}, vol. ${this.volumen}, no. ${this.número}, pp. ${this.paginas[0]}-${this.paginas[1]}, ${this.fechaPublicacion}.`;
  }
}

export class miGestor {
  private elementos: ElementoBiblio[] = [];

  addElemento(elemento: ElementoBiblio): void {
    this.elementos.push(elemento);
  }
  showTabla(): void {
    console.table(this.elementos);
  }
  getElementos(): ElementoBiblio[] {
    return this.elementos;
  }
}