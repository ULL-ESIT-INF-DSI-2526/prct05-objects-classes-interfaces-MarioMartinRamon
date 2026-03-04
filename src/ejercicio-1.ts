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

export class Libro extends Publicacion {
  constructor(
    título: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: string,
    paginas: number[],
    editorial: string,
    public tituloLibro: string,
    public ciudad: string
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
    return `${this.autores.join(', ')}. "${this.título}", in ${this.tituloLibro}, ${this.ciudad}: ${this.editorial}, ${this.fechaPublicacion}, pp. ${this.paginas[0]}-${this.paginas[1]}.`;
  }
}

export class ContribucionCongreso extends Publicacion {
  constructor(
    título: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: string,
    paginas: number[],
    editorial: string,
    public nombreCongreso: string,
    public lugarCongreso: string
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
    return `${this.autores.join(', ')}. "${this.título}", in ${this.nombreCongreso}, ${this.lugarCongreso}, ${this.fechaPublicacion}, pp. ${this.paginas[0]}-${this.paginas[1]}.`;
  }
}

export class TFG_TFM extends Publicacion {
  constructor(
    título: string,
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: string,
    paginas: number[],
    editorial: string,
    public universidad: string,
    public tutores: string[],
    public departamento: string,
    public ciudad: string
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
    return `${this.autores.join(', ')}. "${this.título}", in ${this.ciudad}, ${this.universidad}, ${this.departamento}, ${this.tutores.join(', ')}, ${this.fechaPublicacion}, pp. ${this.paginas[0]}-${this.paginas[1]}.`;
  }
}

export class miGestor {
  private elementos: ElementoBiblio[] = [];

  addElemento(elemento: ElementoBiblio): void {
    this.elementos.push(elemento);
  }
  showTabla(elementos = this.elementos): void {
    // Formateamos limpio para la tabla

    console.table(
      elementos.map((elemento) => ({
        Título: elemento.título,
        Autores: elemento.autores.join(', '),
        PalabrasClave: elemento.palabrasClave.join(', '),
        Resumen: elemento.resumen,
        FechaPublicacion: elemento.fechaPublicacion,
        Páginas: `${elemento.paginas[0]}-${elemento.paginas[1]}`,
        Editorial: elemento.editorial,
      }))
    );
  }
  getElementos(): ElementoBiblio[] {
    return this.elementos;
  }

  busquedaPorPalabraClave(
    palabraClave: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) =>
      elemento.palabrasClave.includes(palabraClave)
    );
  }
  busquedaPorAutor(
    autor: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.autores.includes(autor));
  }
  busquedaPorFecha(
    fecha: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.fechaPublicacion === fecha);
  }
  busquedaPorTitulo(
    titulo: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.título === titulo);
  }
  busquedaPorEditorial(
    editorial: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.editorial === editorial);
  }
}
