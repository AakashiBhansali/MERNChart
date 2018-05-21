import React, {Component} from 'react';

class FrequencySelector extends React.Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	static defaultProps = {
		frequency : [1,2,5,'random']
	}

	createSelectItems(frequency){
		let items = [];
		frequency.forEach(function(element,index){
			let code = <option key={index} value={element}>{element}</option>
			items.push(code);
		});	
		return items;
	}
	onChange(){
		var value = this.refs.frequency.value;
		console.log('Frequency changed to : ' + value);
		this.props.changeFrequency(value);
	}
	render(){
		return (
			<div className="FrequencySelector form-group text-center">
				<label for="frequency">Data Fetch Frequency</label>
				<select onChange={this.onChange} class="form-control" ref="frequency">
					{this.createSelectItems(this.props.frequency)}
				</select>
			</div>
		)
	}
}

export default FrequencySelector;