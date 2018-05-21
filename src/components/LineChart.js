import React from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends React.Component{
	constructor(props){
		super(props);
		// this.state = {chartData : props.chartData}
		this.state = {flag:true}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.chartData !== nextProps.chartData){
			this.setState({flag: !this.state.flag})
		}
	}

	render(){
		return(
			<div className="LineChart">
				<p className="text-center"><b>Time taken by each machine per instance</b></p>
				<Line 
					data = {this.props.chartData}
				/>	
			</div>
		)
	}
}
export default LineChart;