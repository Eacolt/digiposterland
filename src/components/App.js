
import D3demo1 from './D3demo1.js'
class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showme:false
		}
	}

	componentDidMount(){
		 
	}
	render(){
		return (
			<div>
		<D3demo1 style={{display:'none'}}/>
			</div>
	
		 
		)
	}
}
export default App;