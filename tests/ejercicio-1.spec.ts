import { describe, expect, test } from 'vitest';
import { miGestor, Articulo, Libro, ContribucionCongreso, TFG_TFM} from '../src/ejercicio-1';

describe('addElemento', () => {
  test('Agregar un elemento al gestor', () => {
    const elemento = new Articulo(
      'Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training',
      [
        'Rafael Herrero-Álvarez',
        'Gara Miranda',
        'Coromoto León',
        'Eduardo Segredo',
      ],
      [
        'Computer science',
        'computational thinking',
        'primary education',
        'secondary education',
        'syllabus',
      ],
      `Although Computer Science has grown to become one of the most highly demanded professional careers,
       every year, only a small percentage of students choose a degree directly related to Computer Science.
       Perhaps the problem lies in the lack of information that society has about Computer Science itself,
       and particularly about the work computer scientists do. No one doubts the role of Mathematics or Languages
       as core subjects in every primary and secondary education syllabus; however, Computer Science plays a negligible
       role in most current syllabuses. Only in a few countries have governments paid special attention to content 
       related to Computer Science and to learning to analyze and solve problems the way computer scientists do (Computational Thinking).
       In this article, we present Piens@ Computacion@ULLmente, a project that provides a methodology to promote
       Computer Science through Computational Thinking activities among primary and secondary education students.
       The results obtained from an exhaustive statistical analysis of the data we collected demonstrate that the perception
       of Computer Science that pre-university students have can be improved through specific training. Moreover, we can also 
       confirm that the performance of pre-university students involving Computational Thinking skills is independent of gender, 
       particularly at the primary education level`,
       '05 April 2022',
      [56, 69],
      'IEEE',
      11,
      1,
    );
    const gestor = new miGestor();
    gestor.addElemento(elemento);
    expect(gestor.getElementos()).toContain(elemento);
  });

  test('Obtener referencia IEEE', () => {
    const elemento = new Articulo(
      'Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training',
      [
        'Rafael Herrero-Álvarez',
        'Gara Miranda',
        'Coromoto León',
        'Eduardo Segredo',
      ],
      [
        'Computer science',
        'computational thinking',
        'primary education',
        'secondary education',
        'syllabus',
      ],
      `Although Computer Science has grown to become one of the most highly demanded professional careers,
       every year, only a small percentage of students choose a degree directly related to Computer Science.
       Perhaps the problem lies in the lack of information that society has about Computer Science itself,
       and particularly about the work computer scientists do. No one doubts the role of Mathematics or Languages
       as core subjects in every primary and secondary education syllabus; however, Computer Science plays a negligible
       role in most current syllabuses. Only in a few countries have governments paid special attention to content 
       related to Computer Science and to learning to analyze and solve problems the way computer scientists do (Computational Thinking).
       In this article, we present Piens@ Computacion@ULLmente, a project that provides a methodology to promote
       Computer Science through Computational Thinking activities among primary and secondary education students.
       The results obtained from an exhaustive statistical analysis of the data we collected demonstrate that the perception
       of Computer Science that pre-university students have can be improved through specific training. Moreover, we can also 
       confirm that the performance of pre-university students involving Computational Thinking skills is independent of gender,
       particularly at the primary education level`,
      '05 April 2022',
      [56, 69],
      'IEEE',
      11,
      1,
    );
    const referenciaIEEE = elemento.obtenerReferenciaIEEE();
    expect(referenciaIEEE).toBe(
      'Rafael Herrero-Álvarez, Gara Miranda, Coromoto León, Eduardo Segredo. "Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training", IEEE, vol. 11, no. 1, pp. 56-69, 05 April 2022.'
    );
  });

  test('Mostrar tabla de elementos', () => {
    const capituloTest = new Libro(
      'Generating diverse and discriminatory knapsack instances by searching for novelty in variable dimensions of feature-space',
      ['Alejandro Marrero', 'Eduardo Segredo', 'Emma Hart', 'Coromoto León'],
      ['Knapsack Problem', 'Novelty Search', 'Instance Space'],
      `In this paper, we propose a novel approach to generating diverse and discriminatory instances for the Knapsack Problem using novelty search.`,
      '14 August 2022',
      [223, 236],
      'Springer',
      'Parallel Problem Solving from Nature - PPSN XVII',
      'Cham',
    );

    const congresoTest = new ContribucionCongreso(
    "A Generating diverse and discriminatory knapsack instances by searching for novelty in variable dimensions of feature-space",
    ['Alejandro Marrero', 'Eduardo Segredo', 'Coromoto León', 'Emma Hart'],
    ['search methodologies', 'evolutionary computation'],
    `The Rubik's cube is arguably the most popular combinatorial puzzle. We propose a quality diversity approach to assemble it based on MAP-Elites.`,
    '2023',
    [1047, 1055],
    'ACM',
    "Proceedings of the Genetic and Evolutionary Computation Conference (GECCO '23)",
    'Lisbon, Portugal'
  );
    const gestor = new miGestor();
    gestor.addElemento(capituloTest);
    gestor.addElemento(congresoTest);
    expect(gestor.getElementos()).toContain(capituloTest);
    expect(gestor.getElementos()).toContain(congresoTest);
    expect(gestor.showTabla()).toBeUndefined(); // showTabla() no devuelve nada, solo muestra la tabla en consola
  });
});
