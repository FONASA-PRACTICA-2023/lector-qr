import React, { Component } from "react";

import RegionesSelect from "./Regiones.jsx";
import ComunasSelect from "./Comunas.jsx";

// get data
import { comunas } from "../comunas";

class MainSelector extends Component{

	constructor(props){

		super(props);

		this.updateHandler = this.updateHandler.bind(this);
		this.renderComunasSelector = this.renderComunasSelector.bind(this);

		this.state = { region:null, selectedRegion:null, selectedComuna:null };

	}

	updateHandler(t, v){

		if( t === "region" ){
			// update the selected region
			this.setState({
				region: v !== "" ? comunas[v] : null,
				selectedRegion:v !== "" ? v : null,
				selectedComuna:null
			});
		} else {
			this.setState({
				selectedComuna:v
			});
		}

	}
	renderComunasSelector(){
		if( !this.props.regiones ) {
			return(
				<ComunasSelect
					update={this.updateHandler}
					comunas={this.state.region !== null ? this.state.region.comunas : []}
					type="comuna"
					
					 />
			);
		}
	}

	render(){
		
		return(
			<div>
				<RegionesSelect
					update={this.updateHandler}
					regiones={comunas}
					type="region"
				/>
				{this.renderComunasSelector()}
			</div>
		);

	}

}

export default MainSelector;
