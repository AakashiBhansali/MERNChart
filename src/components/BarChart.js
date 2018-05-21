import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component{
	constructor(props){
		super(props);
		// this.state = {chartData : props.chartData}
		this.state = {flag:true}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.chartData !== nextProps.chartData){
			var chartDataLabels = nextProps.chartData.labels;
			var chartDataData = nextProps.chartData.datasets[0].data.map((x) => x);
			var APILabels = chartDataLabels.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
			var APIZip = chartDataData.map(function(e,i){
						return [e, chartDataLabels[i]]
					});

			var obj = {};
			APILabels.forEach(function(element){
						obj[element] = [];
			})
			for(var key in APIZip){
			    obj[APIZip[key][1]].push(APIZip[key][0]);
			}

			var APIData = [];
			for(var key in obj){
			    var sum = obj[key].reduce(function(a, b) { return a + b; });
			    var avg = sum / obj[key].length;
			    APIData.push(avg);
			}

			nextProps.chartData.labels = APILabels;
			nextProps.chartData.datasets[0].data = APIData;

			this.setState({flag: !this.state.flag})
		}
	}

	render(){
		return(
			<div className="BarChart">
				<p className="text-center"><b>Average time taken by each machine</b></p>
				<Bar data = {this.props.chartData}/>	
			</div>
		)
	}
}
export default BarChart;