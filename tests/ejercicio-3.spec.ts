import { describe, expect, test } from 'vitest';
import { ChefAficionado, ChefProfesional, Receta, Recetario, Pasos, GestorRecetas } from '../src/ejercicio-3';

describe('Ejercicio 3', () => {
    test('Almacenamietno de todos los datos', () => {
        const pasos1: Pasos[] = [
            { nombre: 'Amasar', duracion: 15, etiquetas: ['etiqueta1', 'etiqueta2'], opcional: false, vecesCompletado: 0 },
            { nombre: 'Hornear', duracion: 10, etiquetas: ['etiqueta1'], opcional: false, vecesCompletado: 0 },
            { nombre: 'Enfriar', duracion: 5, etiquetas: ['etiqueta3'], opcional: true, vecesCompletado: 0 }
        ];
        const pasos2: Pasos[] = [
            { nombre: 'Evaporar', duracion: 20, etiquetas: ['etiqueta1'], opcional: false, vecesCompletado: 0 },
            { nombre: 'Hervir', duracion: 15, etiquetas: ['etiqueta2'], opcional: false, vecesCompletado: 0 }
        ];
        const pasos3: Pasos[] = [
            { nombre: 'Calentar', duracion: 30, etiquetas: ['etiqueta1'], opcional: false, vecesCompletado: 0 },
            { nombre: 'Mezclar', duracion: 20, etiquetas: ['etiqueta2'], opcional: false, vecesCompletado: 0 },
            { nombre: 'Paso 3', duracion: 10, etiquetas: ['etiqueta3'], opcional: true, vecesCompletado: 0 }
        ];
        const receta1 = new Receta('Receta 1', 2024, pasos1);
        const receta2 = new Receta('Receta 2', 2025, pasos2);
        const receta3 = new Receta('Receta 3', 2026, pasos3);
        const recetario = new Recetario([receta1, receta2]);
        const recetario2 = new Recetario([receta3]);

        const chefAficionado = new ChefAficionado('Chef Aficionado', 100, recetario2);
        const chefProfesional = new ChefProfesional('Chef Profesional', 1000, recetario);

        const gestorRecetas = new GestorRecetas();
        gestorRecetas.agregarChef(chefAficionado);
        gestorRecetas.agregarChef(chefProfesional);

        expect(gestorRecetas.buscarChef('Chef Aficionado')).toEqual(chefAficionado);
        expect(gestorRecetas.buscarChef('Chef Profesional')).toEqual(chefProfesional);
        expect(gestorRecetas.buscarChef('Chef Desconocido')).toBeUndefined();

        expect(gestorRecetas.buscarPaso('Amasar')).toEqual(pasos1[0]);
        expect(gestorRecetas.buscarPaso('Hornear')).toEqual(pasos1[1]);
        expect(gestorRecetas.buscarPaso('Enfriar')).toEqual(pasos1[2]);
        expect(gestorRecetas.buscarPaso('Calentar')).toEqual(pasos3[0]);
        expect(gestorRecetas.buscarPaso('Paso 4')).toBeUndefined();

        expect(gestorRecetas.buscarReceta('Receta 1')).toEqual(receta1);
        expect(gestorRecetas.buscarReceta('Receta 2')).toEqual(receta2);
        expect(gestorRecetas.buscarReceta('Receta 3')).toEqual(receta3);
        expect(gestorRecetas.buscarReceta('Receta 4')).toBeUndefined();

        // Mostrar toda la información de los chefs, recetas y pasos
        expect(gestorRecetas.mostrarInfo()).toBeUndefined();
    });
});