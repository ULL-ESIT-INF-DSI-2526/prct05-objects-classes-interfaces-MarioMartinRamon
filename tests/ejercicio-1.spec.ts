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

  test('Filtros de búsqueda', () => {
    const elemento1 = new TFG_TFM(
      'Diseño e Implementación de un Gestor de Referencias Bibliográficas en TypeScript',
      ['Estudiante'],
      ['TypeScript', 'POO', 'Gestor Bibliográfico', 'IEEE'],
      `Este Trabajo de Fin de Grado detalla el desarrollo de una herramienta de gestión bibliográfica utilizando TypeScript y aplicando principios de Programación Orientada a Objetos y TDD.`,
      '12 feb 2024',
      [1, 50],
      'RIULL',
      'Universidad de La Laguna',
      ['Profesor Tutor 1', 'Profesor Tutor 2'],
      'Dept. de Ingeniería Informática y de Sistemas',
      'San Cristóbal de La Laguna, España'
    );
    const elemento2 = new Articulo(
      'Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training',
      [
        'Rafael Herrero-Álvarez',
        'Estudiante',
        'Coromoto León',
        'Eduardo Segredo',
      ],
      [
        'Computer science',
        'computational thinking',
        'TypeScript',
        'Gestor Bibliográfico',
        'IEEE',
      ],
      `Un buen resumen del artículo.`,
      '05 April 2022',
      [56, 69],
      'IEEE',
      11,
      1,
    );
    const gestor = new miGestor();
    gestor.addElemento(elemento1);
    gestor.addElemento(elemento2);
    const resultadosBusqueda = gestor.busquedaPorPalabraClave('TypeScript', gestor.getElementos());
    expect(resultadosBusqueda).toContain(elemento1);
    expect(resultadosBusqueda).toContain(elemento2);

    const resultadosBusqueda2 = gestor.busquedaPorPalabraClave('POO', gestor.getElementos());
    expect(resultadosBusqueda2).toContain(elemento1);
    expect(resultadosBusqueda2).not.toContain(elemento2);

    const resultadosBusqueda3 = gestor.busquedaPorPalabraClave('Computer science', gestor.getElementos());
    const filtroAutor = gestor.busquedaPorAutor('Coromoto León', resultadosBusqueda3);
    expect(filtroAutor).toContain(elemento2);

    const resultadosBusqueda4 = gestor.busquedaPorPalabraClave('IEEE', gestor.getElementos());
    const filtroFecha = gestor.busquedaPorFecha('05 April 2022', resultadosBusqueda4);
    expect(filtroFecha).toContain(elemento2);

    const resultadosBusqueda5 = gestor.busquedaPorPalabraClave('IEEE', gestor.getElementos());
    const filtroTitulo = gestor.busquedaPorTitulo('Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training', resultadosBusqueda5);
    expect(filtroTitulo).toContain(elemento2);

    const resultadosBusqueda6 = gestor.busquedaPorPalabraClave('IEEE', gestor.getElementos());
    const filtroEditorial = gestor.busquedaPorEditorial('IEEE', resultadosBusqueda6);
    expect(filtroEditorial).toContain(elemento2);
  });

  test('Mostrar formato IEEE', () => {
    const elemento1 = new TFG_TFM(
      'Diseño e Implementación de un Gestor de Referencias Bibliográficas en TypeScript',
      ['Estudiante'],
      ['TypeScript', 'POO', 'Gestor Bibliográfico', 'IEEE'],
      `Este Trabajo de Fin de Grado detalla el desarrollo de una herramienta de gestión bibliográfica utilizando TypeScript y aplicando principios de Programación Orientada a Objetos y TDD.`,
      '12 feb 2024',
      [1, 50],
      'RIULL',
      'Universidad de La Laguna',
      ['Profesor Tutor 1', 'Profesor Tutor 2'],
      'Dept. de Ingeniería Informática y de Sistemas',
      'San Cristóbal de La Laguna, España'
    );
    const elemento2 = new Articulo(
      'Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training',
      [
        'Rafael Herrero-Álvarez',
        'Estudiante',
        'Coromoto León',
        'Eduardo Segredo',
      ],
      [
        'Computer science',
        'computational thinking',
        'TypeScript',
        'Gestor Bibliográfico',
        'IEEE',
      ],
      `Un buen resumen del artículo.`,
      '05 April 2022',
      [56, 69],
      'IEEE',
      11,
      1,
    );
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

    expect(elemento1.obtenerReferenciaIEEE()).toBe(
      'Estudiante. "Diseño e Implementación de un Gestor de Referencias Bibliográficas en TypeScript", in San Cristóbal de La Laguna, España, Universidad de La Laguna, Dept. de Ingeniería Informática y de Sistemas, Profesor Tutor 1, Profesor Tutor 2, 12 feb 2024, pp. 1-50.'
    );
    expect(elemento2.obtenerReferenciaIEEE()).toBe(
      'Rafael Herrero-Álvarez, Estudiante, Coromoto León, Eduardo Segredo. "Engaging Primary and Secondary School Students in Computer Science Through Computational Thinking Training", IEEE, vol. 11, no. 1, pp. 56-69, 05 April 2022.'
    );
    expect(capituloTest.obtenerReferenciaIEEE()).toBe(
      'Alejandro Marrero, Eduardo Segredo, Emma Hart, Coromoto León. "Generating diverse and discriminatory knapsack instances by searching for novelty in variable dimensions of feature-space", in Parallel Problem Solving from Nature - PPSN XVII, Cham: Springer, 14 August 2022, pp. 223-236.'
    );
    expect(congresoTest.obtenerReferenciaIEEE()).toBe(
      'Alejandro Marrero, Eduardo Segredo, Coromoto León, Emma Hart. "A Generating diverse and discriminatory knapsack instances by searching for novelty in variable dimensions of feature-space", in Proceedings of the Genetic and Evolutionary Computation Conference (GECCO \'23), Lisbon, Portugal, 2023, pp. 1047-1055.'
    );
});
});

