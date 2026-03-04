import { describe, expect, test } from 'vitest';
import { miGestor } from '../src/ejercicio-1';

describe('addElemento', () => {
  test('debería agregar un elemento al gestor', () => {
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
    miGestor.addElemento(elemento);
    expect(miGestor.getElementos()).toContain(elemento);
  });
});
