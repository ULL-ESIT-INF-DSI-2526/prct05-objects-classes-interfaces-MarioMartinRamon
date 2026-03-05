export abstract class Participante {
  private id: number;
  private name: string;
  private pais: string;
  private fechaInsc: Date;
  private puntuacion: number;

  constructor(
    id: number,
    name: string,
    pais: string,
    fechaInsc: Date,
    puntuacion: number
  ) {
    this.id = id;
    this.name = name;
    this.pais = pais;
    this.fechaInsc = fechaInsc;
    this.puntuacion = puntuacion;
  }

  get g_id(): number {
    return this.id;
  }
  set s_id(num: number) {
    this.id = num;
  }

  get g_name(): string {
    return this.name;
  }
  set s_name(nombre: string) {
    if (nombre === '') {
      console.log('No puede estar vacio');
    } else {
      this.name = nombre;
    }
  }

  get g_pais(): string {
    return this.pais;
  }
  set s_pais(p: string) {
    this.pais = p;
  }

  get g_fechaInsc(): Date {
    return this.fechaInsc;
  }
  set s_fechaInsc(d: Date) {
    if (d > new Date()) {
      console.log('Fecha invalida');
    } else {
      this.fechaInsc = d;
    }
  }

  get g_puntuacion(): number {
    return this.puntuacion;
  }
  set s_puntuacion(points: number) {
    if (points < 0) {
      console.log('Puntuación invalida');
    } else {
      this.puntuacion = points;
    }
  }

  abstract perfil(): string;
}
