interface Chef {
  nombre: string;
  seguidores: number;
  recetario: Recetario;
}

abstract class ChefClass implements Chef {
  nombre: string;
  seguidores: number;
  recetario: Recetario;

  constructor(nombre: string, seguidores: number, recetario: Recetario) {
    this.nombre = nombre;
    this.seguidores = seguidores;
    this.recetario = recetario;
  }
}

export class ChefAficionado extends ChefClass {
  constructor(nombre: string, seguidores: number, recetario: Recetario) {
    super(nombre, seguidores, recetario);
  }
}

export class ChefProfesional extends ChefClass {
  constructor(nombre: string, seguidores: number, recetario: Recetario) {
    super(nombre, seguidores, recetario);
  }
}

interface IReceta {
  nombre: string;
  fecha: number;
  pasos: Pasos[];
}

export class Receta implements IReceta {
  nombre: string;
  fecha: number;
  pasos: Pasos[];

  constructor(nombre: string, fecha: number, pasos: Pasos[]) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.pasos = pasos;
  }

  /**
   * Obtiene el número total de pasos de la receta contando tanto los pasos opcionales como los no opcionales.
   * @returns El número total de pasos de la receta.
   */
  obtenerNumeroPasos(): number {
    return this.pasos.length;
  }

  /**
   * Calcula la duración total de la receta sumando la duración de todos los pasos. Si hay pasos opcionales, se muestra un rango de duración mínima (sin los pasos opcionales) y máxima (con todos los pasos).
   * @returns La duración total de la receta en formato de cadena, indicando el rango si hay pasos opcionales.
   */
  obtenerDuracionTotal(): string {
    let min = 0;
    let max = 0;
    for (const paso of this.pasos) {
      max += paso.duracion;
      if (!paso.opcional) {
        min += paso.duracion;
      }
    }

    if (min === max) {
      return `${max} segundos`;
    } else {
      return `entre ${min} y ${max} segundos`;
    }
  }
}

export class Recetario {
  constructor(public recetas: Receta[] = []) {}
}

interface IPasos {
  nombre: string;
  duracion: number;
  etiquetas: string[];
  opcional: boolean;
  vecesCompletado: number;
}

export class Pasos implements IPasos {
  nombre: string;
  duracion: number;
  etiquetas: string[];
  opcional: boolean;
  vecesCompletado: number;

  constructor(
    nombre: string,
    duracion: number,
    etiquetas: string[],
    opcional: boolean,
    vecesCompletado: number
  ) {}
}

type FilaTabla = {
  Chef: string;
  Tipo: string;
  Seguidores: number;
  Receta: string;
  'Año publicación': number;
  'Número de pasos': number;
  'Duración total': string;
  Pasos: string;
};

export class GestorRecetas {
  private chefs: Chef[] = [];

  /**
   * Agrega un chef al gestor de recetas.
   * @param chef El chef a agregar al gestor de recetas.
   */
  agregarChef(chef: Chef): void {
    this.chefs.push(chef);
  }

  /**
   * Muestra toda la información de los chefs, recetas y pasos en formato de tabla.
   */
  mostrarInfo(): void {
    const datosTabla: FilaTabla[] = [];
    this.chefs.forEach((chef) => {
      chef.recetario.recetas.forEach((receta) => {
        datosTabla.push({
          Chef: chef.nombre,
          Tipo: chef instanceof ChefProfesional ? 'Profesional' : 'Aficionado',
          Seguidores: chef.seguidores,
          Receta: receta.nombre,
          'Año publicación': receta.fecha,
          'Número de pasos': receta.obtenerNumeroPasos(),
          'Duración total': receta.obtenerDuracionTotal(),
          Pasos: receta.pasos.map((p) => p.nombre).join(', '),
        });
      });
    });
    console.table(datosTabla);
  }

  /**
   * Busca un chef por su nombre en la lista de chefs.
   * @param nombre El nombre del chef a buscar.
   * @returns El chef encontrado o undefined si no se encuentra ningún chef con ese nombre
   */

  buscarChef(nombre: string): Chef | undefined {
    const busqueda = this.chefs.find((chef) => chef.nombre === nombre);
    if (busqueda) {
      const datosTabla: FilaTabla[] = [];
      busqueda.recetario.recetas.forEach((receta) => {
        datosTabla.push({
          Chef: busqueda.nombre,
          Tipo:
            busqueda instanceof ChefProfesional ? 'Profesional' : 'Aficionado',
          Seguidores: busqueda.seguidores,
          Receta: receta.nombre,
          'Año publicación': receta.fecha,
          'Número de pasos': receta.obtenerNumeroPasos(),
          'Duración total': receta.obtenerDuracionTotal(),
          Pasos: receta.pasos.map((p) => p.nombre).join(', '),
        });
      });
      console.log(`Se ha encontrado el chef "${nombre}":`);
      console.table(datosTabla);
      return busqueda;
    } else {
      console.log(`No se ha encontrado ningún chef con el nombre "${nombre}".`);
      return undefined;
    }
  }

  /**
   * Busca una receta por su nombre en todas las recetas de todos los chefs.
   * @param nombre El nombre de la receta a buscar.
   * @returns La receta encontrada o undefined si no se encuentra ninguna receta
   */
  buscarReceta(nombre: string): Receta | undefined {
    for (const chef of this.chefs) {
      const recetaEncontrada = chef.recetario.recetas.find(
        (receta) => receta.nombre === nombre
      );
      if (recetaEncontrada) {
        const datosTabla: FilaTabla[] = [];
        datosTabla.push({
          Chef: chef.nombre,
          Tipo: chef instanceof ChefProfesional ? 'Profesional' : 'Aficionado',
          Seguidores: chef.seguidores,
          Receta: recetaEncontrada.nombre,
          'Año publicación': recetaEncontrada.fecha,
          'Número de pasos': recetaEncontrada.obtenerNumeroPasos(),
          'Duración total': recetaEncontrada.obtenerDuracionTotal(),
          Pasos: recetaEncontrada.pasos.map((p) => p.nombre).join(', '),
        });
        console.log(`Se ha encontrado la receta "${nombre}":`);
        console.table(datosTabla);
        return recetaEncontrada;
      }
    }
    console.log(
      `No se ha encontrado ninguna receta con el nombre "${nombre}".`
    );
    return undefined;
  }

  /**
   * Busca un paso por su nombre en todas las recetas de todos los chefs.
   * @param nombre El nombre del paso a buscar.
   * @returns El paso encontrado o undefined si no se encuentra ningún paso
   */
  buscarPaso(nombre: string): Pasos | undefined {
    for (const chef of this.chefs) {
      for (const receta of chef.recetario.recetas) {
        const pasoEncontrado = receta.pasos.find(
          (paso) => paso.nombre === nombre
        );
        if (pasoEncontrado) {
          const datosTabla: FilaTabla[] = [];
          datosTabla.push({
            Chef: chef.nombre,
            Tipo:
              chef instanceof ChefProfesional ? 'Profesional' : 'Aficionado',
            Seguidores: chef.seguidores,
            Receta: receta.nombre,
            'Año publicación': receta.fecha,
            'Número de pasos': receta.obtenerNumeroPasos(),
            'Duración total': receta.obtenerDuracionTotal(),
            Pasos: pasoEncontrado.nombre,
          });
          console.log(`Se ha encontrado el paso "${nombre}":`);
          console.table(datosTabla);
          return pasoEncontrado;
        }
      }
    }
    console.log(`No se ha encontrado ningún paso con el nombre "${nombre}".`);
    return undefined;
  }
}
