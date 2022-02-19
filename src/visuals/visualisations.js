// //container function for the visualisations
// function Visualisations() {
// 	//array to store visualisations
// 	this.visuals = [];
// 	//currently selected vis. set to null until vis loaded in
// 	this.selectedVisual = null;

// 	//add a new visualisation to the array
// 	//@param vis: a visualisation object
// 	this.add = function (vis) {
// 		this.visuals.push(vis);
// 		//if selectedVisual is null set the new visual as the 
// 		//current visualiation
// 		if (this.selectedVisual == null) {
// 			this.selectVisual(vis.name);
// 		}
// 	};

// 	//select a visualisation using it name property
// 	//@param visName: name property of the visualisation
// 	this.selectVisual = function (visName) {
// 		for (var i = 0; i < this.visuals.length; i++) {
// 			if (visName == this.visuals[i].name) {
// 				this.selectedVisual = this.visuals[i];
// 			}
// 		}
// 	};
// }

/** 
 * @desc Container function for the visualisations
 */
class Visualisations {
	constructor() {
		/** @var {Array} visuals Array to store visualisations*/
		this.visuals = [];

		/** @var {Visualisation} selectedVisual Currently selected vis. set to null until vis loaded in */
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
	};
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
	};
}