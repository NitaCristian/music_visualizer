
/** 
 * @desc Container function for the visualisations
 */
class VisualisationsContainer {
	constructor() {
		/** @var {Array}  Array to store visualisations*/
		this.visuals = [];

		/** @var {Visualisation}  Currently selected vis. set to null until vis loaded in */
		this.selectedVisual = null;
	}
	/** 
	 * @desc Add a new visualisation to the array
	 * 
	 * @param {Visualisation} vis A new visualisation object 
	 */
	add(vis) {
		// Add the new visual to the array
		this.visuals.push(vis);

		// If selectedVisual is null, set the new visual as the current visualiation
		if (this.selectedVisual == null) {
			this.selectVisual(vis.name);
		}
	}
	/** 
	 * @desc Select a visualisation using its name property
	 * 
	 * @param {String} visNmae A string representing the name of a visualisation
	 */
	selectVisual(visName) {
		for (let i = 0; i < this.visuals.length; i++) {
			if (visName == this.visuals[i].name) {
				this.selectedVisual = this.visuals[i];
			}
		}
	}
}