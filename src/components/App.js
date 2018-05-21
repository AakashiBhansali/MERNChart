import React from 'react';
import FrequencySelector from './FrequencySelector';
import LineChart from './LineChart';
import BarChart from './BarChart';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {chartData:{},frequency:1,offset:-1}
    this.changeFrequency = this.changeFrequency.bind(this);
    this.updateChartData = this.updateChartData.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  componentWillMount(){
    this.getChartData();
  }
  getFrequency(){
    // console.log('Getting frequency: '+ this.state.frequency);
    if(this.state.frequency == 'random'){
      var max = 10;
      var min = 1;
      var frequency =  Math.floor(Math.random()*(max-min+1)+min);
      console.log('Frequency: '  + frequency);
      return frequency
    }
    var frequency = this.state.frequency;
    console.log('Frequency: '  + frequency);
    return frequency;
  }
  componentDidMount(){
    console.log('Will invoke function after ' + this.state.frequency + ' seconds');
    setTimeout(this.updateChartData, this.getFrequency()*1000);
  }
  changeFrequency(freq){
    var stateChartData = this.state.chartData;
    var stateOffset = this.state.offset;
    //logic
    this.setState({chartData:stateChartData,frequency:freq,offset:stateOffset});
  }

  setChartData(chartLabels,chartData){
    // console.log('chartLabels');
    // console.log(chartLabels);

    // console.log('chartData');
    // console.log(chartData);

    var stateFrequency = this.state.frequency;
    // console.log('stateFrequency');
    // console.log(stateFrequency);

    var stateOffset = this.state.offset + 1;
    // console.log('offset');
    // console.log(stateOffset);

    this.setState({chartData:{
      labels: chartLabels,
      datasets: [
        {
          label: 'Time in seconds',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData
        }
      ]
    }, frequency: stateFrequency,offset: stateOffset});
  }

  getChartData(){
    //Ajax call here
    // var APILabels = ['A','B','C','D','E'];
    // var APIData = [54,756,321,345,98];
    fetch('/api/get-data')
      .then(resp => resp.json())
      .then((arr) => {
        var APILabels = arr.map(element => element['machine']);
        var APIData =  arr.map(element => element['timeTaken']);
        // console.log(APILabels);
        // console.log(APIData);
        this.setChartData(APILabels,APIData);
      })
      .catch(console.error);
    // this.setChartData(APILabels,APIData);
  }

  updateChartData(){
    console.log('updateChartData invoked at : '+ Date.now());
    var offset = this.state.offset;
    fetch('/api/get-data/' + offset)
      .then(resp => resp.json())
      .then((result) => {
        var APILabel = result['machine'];
        var data =  result['timeTaken'];
        var APILabels = [];
        var APIData = [];
        this.state.chartData.labels.forEach(function(element){
          APILabels.push(element)
        });
        this.state.chartData.datasets[0].data.forEach(function(element){
          APIData.push(element)
        });
        if(data && APILabel){
          APILabels.push(APILabel);
          APIData.push(data);
          return {labels:APILabels,data:APIData};
        }
        else{
          throw "Data limit reached";
        }
      })
      .then((obj) => {
        this.setChartData(obj.labels,obj.data);
        // frequency = this.getFrequency() * 1000;
        setTimeout(this.updateChartData,this.getFrequency()*1000);
      })
      .catch((err) => console.log(err));
        
  }
  render(){
    return(
      <div className="container">
        <h2 className='text-center'>
          Hello React Components!!
        </h2>
        <FrequencySelector changeFrequency={this.changeFrequency}/>
        <LineChart chartData ={this.state.chartData} />
        <BarChart chartData = {JSON.parse(JSON.stringify(this.state.chartData))} />

      </div>
      )
  }
}

export default App;
