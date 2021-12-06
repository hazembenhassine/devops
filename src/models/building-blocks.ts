/**
 * 
 */
export class BuildingBlocks {

    constructor(private _blockSizes: number[]) {}

    get blockSizes(): number[] {
        return this._blockSizes;
    }

    set blockSizes(blockSizes: number[]) {
        this._blockSizes = blockSizes;
    }

    /**
     * Calcule la surface totale d'eau collectée en calculant la
     * surface d'eau collectée en dessous de chaque bâtiment.
     * Complexité O(n^2).
     * @returns La surface d'eau collectée par les bâtiments
     */
    getCollectedWater(): number {
        // Surface totale d'eau stockée
        let total = 0;
        // Pour chaque bloc sauf le premier et le dernier
        // Complexité de O(n^2) puisqu'il y a 2 parcours imbriqués du tableau.
        this.blockSizes.slice(1, -1).forEach((block, i) => {
            // Obtenir l'index réel du bâtiment courant (Corriger l'offset causé par le slice).
            const index = i + 1;

            // Trouver le maximum à gauche du bâtiment courant.
            // La complexité de cette instruction est O(n) puisque Array.Prototype.reduce() fait un parcours complet du tableau.
            const leftMax = this.blockSizes.slice(0, index + 1).reduce((a,b) => Math.max(a, b), 0);

            // Trouver le maximum à droite du bâtiment courant.
            // La complexité de cette instruction est O(n) puisque Array.Prototype.reduce() fait un parcours complet du tableau.
            const rightMax = this.blockSizes.slice(index).reduce((a, b) => Math.max(a, b), 0);

            // Le niveau d'eau est le minimum entre le bâtiment le plus élevé à gauche et celui à droite.
            const waterLevel = Math.min(leftMax, rightMax);

            // La surface d'eau en dessous de chaque bâtiment est la difference entre l'hauteur du bâtiment et le niveau d'eau.
            const waterSurface = waterLevel - block;

            // Ajouter la surface d'eau au total
            total += waterSurface;
        });
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
    getCollectedWaterOptimized(): number {
        // Trouver l'indice de la valeur maximale
        // O(n)
        const maxIndex = this.blockSizes.reduce((currentMaxIndex, x, i) => x > this.blockSizes[currentMaxIndex] ? i : currentMaxIndex, 0);
        // Valeur maximale à gauche
        let maxLeft = 0;
        // Total du sous-tableau gauche
        let totalLeft = 0;
        // Parcours du premier sous-tableau
        // O(n)
        this.blockSizes.slice(undefined, maxIndex).forEach(elm => {
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
        this.blockSizes.slice(maxIndex + 1).reverse().forEach(elm => {
            // Calculer le maximum à gauche actuel
            maxRight = elm > maxRight ? elm : maxRight;
            // Math.min(maxRight, max) === maxRight est toujours vraie puisque le maximum actuel est toujours inférieur ou égal au maximum absolu du tableau.
            totalRight += maxRight - elm;
        });
        return totalLeft + totalRight;
    }

}