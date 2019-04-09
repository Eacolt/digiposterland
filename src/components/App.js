
import D3demo1 from './D3demo1.js'
import EchartDemo1 from './EchartDemo1'
class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showme:false
		}
	}

	componentDidMount(){
		let self = this;
		setInterval(()=>{
			self.setState(Object.assign(this.state,{
				showme:!self.state.showme
			}))
		},2000)
		 
	}
	render(){
		return (
			<div>
		<D3demo1 style={{display:'none'}}/>
		<EchartDemo1 shown={this.state.showme}/>
			</div>
	
		 
		)
	}
}
export default App;