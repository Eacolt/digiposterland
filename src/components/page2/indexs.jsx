 
import D3Lines from './D3Lines.jsx'
class Indexs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showme: false,
			digiData:[2,1,2,5]
		}
	}

	componentDidMount() {
		let self = this;
 

		
	}
	render() {

		return (<div style={{display:'flex',flexWrap:'wrap',justifyContent:'start',alignItems:'center'}}>
		     	<D3Lines/>
			</div>


		)
	}
}
export default Indexs;