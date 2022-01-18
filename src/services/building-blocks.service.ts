import { Counter, Gauge, Histogram } from "prom-client";

/**
 * Service qui gère le problème algorithmique 
 */
export class BuildingBlocksService {

    executionTime: Gauge<string>;
    callCount: Counter<string>;

    constructor() {
        this.executionTime = new Gauge({
            name: 'building_blocks_execution_time_counter',
            help: 'Metric for building blocks execution time',
            labelNames: ['algorithmType']
        })
        this.callCount = new Counter({
            name: 'building_blocks_call_counter',
            help: 'Metric for number of calls for normal algorithm',
            labelNames: ['algorithmType']
        });
    }

    /**
     * Calcule la surface totale d'eau collectée en calculant la
     * surface d'eau collectée en dessous de chaque bâtiment.
     * Complexité O(n^2).
     * @returns La surface d'eau collectée par les bâtiments
     */
    getCollectedWater(blockSizes: number[]): number {
        const end = this.executionTime.labels({algorithmType: 'normal'}).startTimer();
        // Surface totale d'eau stockée
        let total = 0;
        // Pour chaque bloc trouver le max à droite et le max à gauche pour déterminer le niveau d'eau
        // Complexité de O(n^2) puisqu'il y a 2 parcours imbriqués du tableau.
        blockSizes.forEach((block, index) => {
            // Trouver le maximum à gauche du bâtiment courant.
            // La complexité de cette instruction est O(n) puisque Array.Prototype.reduce() fait un parcours complet du tableau.
            const leftMax = blockSizes.slice(0, index + 1).reduce((a,b) => Math.max(a, b), 0);

            // Trouver le maximum à droite du bâtiment courant.
            // La complexité de cette instruction est O(n) puisque Array.Prototype.reduce() fait un parcours complet du tableau.
            const rightMax = blockSizes.slice(index).reduce((a, b) => Math.max(a, b), 0);

            // Le niveau d'eau est le minimum entre le bâtiment le plus élevé à gauche et celui à droite.
            const waterLevel = Math.min(leftMax, rightMax);

            // La surface d'eau en dessous de chaque bâtiment est la difference entre l'hauteur du bâtiment et le niveau d'eau.
            const waterSurface = waterLevel - block;

            // Ajouter la surface d'eau au total
            total += waterSurface;
        });
        end();
        this.callCount.labels({algorithmType: 'normal'}).inc();
        return total;
    }

    /**
     * Optimise la fonction de calcul d'eau collectée.
     * Trouver le maximum absolu signifie qu'on peut diviser
     * le tableau initial sur deux sous-tableaux: un premier sous-
     * tableau à gauche et un deuxième à droite.
     * Le premier tableau est parcouru de gauche à droite en
     * gardant la valeur maximale actuellle comme valeur maximale
     * à gauche. La valeur maximale à droite est le maximum absolu
     * du tableau intial.
     * Le deuxième tableau est parcouru de droite à gauche
     * en gardant la valeur maximale actuelle comme valeur maximale
     * à droite. La valeur maximale à gauche est le maximum absolu
     * du tableau intial.
     * Complexité O(n).
     * @returns La surface d'eau collectée par les bâtiments
     * @see {@link getCollectedWater}
     */
    getCollectedWaterOptimized(blockSizes: number[]): number {
        const end = this.executionTime.labels({algorithmType: 'optimized'}).startTimer();
        // Trouver l'indice de la valeur maximale
        // O(n)
        const maxIndex = blockSizes.reduce((currentMaxIndex, x, i) => x > blockSizes[currentMaxIndex] ? i : currentMaxIndex, 0);
        // Valeur maximale à gauche
        let maxLeft = 0;
        // Total du sous-tableau gauche
        let totalLeft = 0;
        // Parcours du premier sous-tableau
        // O(n)
        blockSizes.slice(0, maxIndex).forEach(elm => {
            // Calculer le maximum à gauche actuel
            maxLeft = elm > maxLeft ? elm : maxLeft;
            // Math.min(maxLeft, max) === maxLeft est toujours vraie puisque le maximum actuel est toujours inférieur ou égal au maximum absolu du tableau.
            totalLeft += maxLeft - elm;
        });
        // Valeur maximale à droite
        let maxRight = 0;
        // Total du sous-tableau droite
        let totalRight = 0;
        // Parcours du deuxième sous-tableau
        // O(n)
        blockSizes.slice(maxIndex + 1).reverse().forEach(elm => {
            // Calculer le maximum à gauche actuel
            maxRight = elm > maxRight ? elm : maxRight;
            // Math.min(maxRight, max) === maxRight est toujours vraie puisque le maximum actuel est toujours inférieur ou égal au maximum absolu du tableau.
            totalRight += maxRight - elm;
        });
        end();
        this.callCount.labels({algorithmType: 'optimized'}).inc();
        return totalLeft + totalRight;
    }

}

export const service: BuildingBlocksService = new BuildingBlocksService();