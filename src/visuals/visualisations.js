
/** 
 * Container function for the visualisations
 */
class VisualisationsContainer {
	constructor() {
		/** Array to store visualisations*/
		this.visuals = [];

		/** The selected visualisation */
		this.selectedVisual = null;
	}

	/** 
	 * Add a new visualisation to the array
	 * @param {Visualisation} newVisual A new visualisation object 
	 */
	add(newVisual) {
		// Add the new visual to the array
		this.visuals.push(newVisual);

		// If selectedVisual is null, set the new visual as the current visualiation
		if (this.selectedVisual == null) {
			this.selectVisual(newVisual.name);
		}
	}

	/** 
	 * Select a visualisation by name
	 * @param {String} visualName A string representing the name of a visualisation
	 */
	selectVisual(visualName) {
		for (let visual of this.visuals) {
			if (visualName == visual.name) {
				this.selectedVisual = visual;
			}
		}
	}
}