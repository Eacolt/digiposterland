 
import EchartDemo1 from './EchartDemo1'
import EchartDemoLine from './EchartDemoLine.js';
import EchartDemoRadar from './EchartDemoRadar.js'
import D3react from './D3react.js'
import D3demo1 from './D3demo1.js'
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showme: false,
			digiData:[2,1,2,5]
		}
	}

	componentDidMount() {
		let self = this;
		// setInterval(() => {
		//    // self.state.digiData.splice(self.state.digiData.length,0,4)
		// 	var newData = [1,1,10,4,7]
		// 	console.log(self.state.digiData)
		// 	self.setState(Object.assign(this.state, {
		// 		showme: !self.state.showme,
		// 		digiData:newData
			 
		// 	}))
		// }, 2000);
		setTimeout(()=>{
			self.setState(Object.assign(self.state,{
				digiData:[12,13,13,23]
			}))
			console.log('fuuuk')
		},2000)
		self.setState({})


		
	}
	render() {
		console.log('更舞台更新')
		return (
			<div style={{display:'flex',flexWrap:'wrap',justifyContent:'start',alignItems:'center'}}>
				{/* <D3react datas={this.state.digiData}/>
				<EchartDemo1 shown={this.state.showme} />
				<EchartDemoLine  shown={this.state.showme}/>
				<EchartDemoRadar shown={this.state.showme}/> */}
				<D3demo1/>
			</div>


		)
	}
}
export default Index;