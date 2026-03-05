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

  /**
   * Genera la referencia bibliográfica en formato IEEE para un artículo, incluyendo el título, autores, editorial, volumen, número, páginas y fecha de publicación.
   * @returns La referencia bibliográfica en formato IEEE para el artículo.
   */
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

  /**
   * Obtiene la referencia bibliográfica en formato IEEE para un libro, incluyendo el título, autores, editorial, título del libro, ciudad de publicación, páginas y fecha de publicación.
   * @returns La referencia bibliográfica en formato IEEE para el libro.
   */
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

  /**
   * Obtiene la referencia bibliográfica en formato IEEE para una contribución a un congreso, incluyendo el título, autores, nombre del congreso, lugar del congreso, fecha de publicación y páginas.
   * @returns De la referencia bibliográfica en formato IEEE para la contribución al congreso.
   */
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

  /**
   * Obtiene la referencia bibliográfica en formato IEEE para un Trabajo de Fin de Grado o Máster, incluyendo el título, autores, universidad, tutores, departamento, ciudad, fecha de publicación y páginas.
   * @returns Devuelve la referencia bibliográfica en formato IEEE para el TFG o TFM.
   */
  obtenerReferenciaIEEE(): string {
    return `${this.autores.join(', ')}. "${this.título}", in ${this.ciudad}, ${this.universidad}, ${this.departamento}, ${this.tutores.join(', ')}, ${this.fechaPublicacion}, pp. ${this.paginas[0]}-${this.paginas[1]}.`;
  }
}

export class miGestor {
  private elementos: ElementoBiblio[] = [];

  /**
   * Añade un elemento bibliográfico al gestor, permitiendo almacenar diferentes tipos de publicaciones como artículos, libros, contribuciones a congresos y trabajos de fin de grado o máster.
   * @param elemento El elemento bibliográfico que se desea agregar al gestor, el cual debe implementar la interfaz ElementoBiblio.
   */
  addElemento(elemento: ElementoBiblio): void {
    this.elementos.push(elemento);
  }
  /**
   * Muestra toda la información de los elementos bibliográficos almacenados en el gestor en formato de tabla, formateando cada campo de manera legible para facilitar la visualización de los datos.
   * @param elementos Un array opcional de elementos bibliográficos a mostrar en la tabla. Si no se proporciona, se mostrarán todos los elementos almacenados en el gestor.
   */
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

  /**
   * Obtiene el array de elementos bibliográficos almacenados en el gestor.
   * @returns Un array de elementos bibliográficos que contiene todos los elementos almacenados en el gestor.
   */
  getElementos(): ElementoBiblio[] {
    return this.elementos;
  }

  /**
   * Busca elementos bibliográficos que contengan una palabra clave específica en su lista de palabras clave.
   * @param palabraClave La palabra clave que se desea buscar en los elementos bibliográficos.
   * @param elementos Un array opcional de elementos bibliográficos en el cual realizar la búsqueda.
   * @returns Un array de elementos bibliográficos que contienen la palabra clave especificada en su lista de palabras clave.
   */
  busquedaPorPalabraClave(
    palabraClave: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) =>
      elemento.palabrasClave.includes(palabraClave)
    );
  }

  /**
   * Busca elementos bibliográficos que tengan un autor específico en su lista de autores.
   * @param autor El nombre del autor que se desea buscar en los elementos bibliográficos.
   * @param elementos Un array opcional de elementos bibliográficos en el cual realizar la búsqueda.
   * @returns Un array de elementos bibliográficos que contienen el autor especificado en su lista de autores.
   */
  busquedaPorAutor(
    autor: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.autores.includes(autor));
  }

  /**
   * Busca elementos bibliográficos que tengan una fecha de publicación específica.
   * @param fecha La fecha de publicación que se desea buscar en los elementos bibliográficos.
   * @param elementos Un array opcional de elementos bibliográficos en el cual realizar la búsqueda.
   * @returns Un array de elementos bibliográficos que contienen la fecha de publicación especificada.
   */
  busquedaPorFecha(
    fecha: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.fechaPublicacion === fecha);
  }

  /**
   * Busca elementos bibliográficos que tengan un título específico.
   * @param titulo El título que se desea buscar en los elementos bibliográficos.
   * @param elementos Un array opcional de elementos bibliográficos en el cual realizar la búsqueda.
   * @returns Un array de elementos bibliográficos que contienen el título especificado.
   */

  busquedaPorTitulo(
    titulo: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.título === titulo);
  }

  /**
   * Busca elementos bibliográficos que hayan sido publicados por una editorial específica.
   * @param editorial El nombre de la editorial que se desea buscar en los elementos bibliográficos.
   * @param elementos Un array opcional de elementos bibliográficos en el cual realizar la búsqueda.
   * @returns Un array de elementos bibliográficos que contienen la editorial especificada.
   */
  busquedaPorEditorial(
    editorial: string,
    elementos = this.elementos
  ): ElementoBiblio[] {
    return elementos.filter((elemento) => elemento.editorial === editorial);
  }
}
