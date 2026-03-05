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

  obtenerNumeroPasos(): number {
    return this.pasos.length;
  }

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

  agregarChef(chef: Chef): void {
    this.chefs.push(chef);
  }

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
            Tipo: chef instanceof ChefProfesional ? 'Profesional' : 'Aficionado',
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
