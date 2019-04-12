
import D3demo1 from './D3demo1.js'
import EchartDemo1 from './EchartDemo1'
import EchartDemoLine from './EchartDemoLine.js';
import EchartDemoRadar from './EchartDemoRadar.js'
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showme: false,
			digiData:[0,1,2,3,4]
		}
	}

	componentDidMount() {
		let self = this;
		setInterval(() => {
		   // self.state.digiData.splice(self.state.digiData.length,0,4)
			var newData = [0,1,2,30,4]
			console.log(self.state.digiData)
			self.setState(Object.assign(this.state, {
				showme: !self.state.showme,
				digiData:newData
			 
			}))
		}, 2000);
		self.setState({})
		
	}
	render() {
		return (
			<div style={{display:'flex',flexWrap:'wrap',justifyContent:'start',alignItems:'center'}}>
				<D3demo1 datas={this.state.digiData} />
				<EchartDemo1 shown={this.state.showme} />
				<EchartDemoLine  shown={this.state.showme}/>
				<EchartDemoRadar shown={this.state.showme}/>
			</div>


		)
	}
}
export default App;