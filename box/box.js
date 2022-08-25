(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
			:host {
				border-radius: 10px;
				border-width: 2px;
				border-color: black;
				border-style: solid;
				display: block;
			} 
			body {
			  background: green;
			}					
		</style>
		
		// Container für das goJS Diagramm
		<div id="myDiagramDiv" style="height: 400px; width: 400px; border: 1px solid black; background: blue;">Hello World</div>
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));

			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
		}
	}
	
	customElements.define("com-demo-gauge", Box);
})();