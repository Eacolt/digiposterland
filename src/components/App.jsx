import './App.less'
 import baseUrl from '../utils.js'
import Page2 from './page2/index.jsx'
// import PageTree from './pagetree/index.jsx'
import PageTree2 from './pagetree2/index.jsx'
 import PageMap from './pagemap/index.jsx'
 
class App extends React.Component {
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
		// setTimeout(()=>{
		// 	self.setState(Object.assign(self.state,{
		// 		digiData:[12,13,13,23]
		// 	}))
		// 	console.log('fuuuk')
		// },2000)
	 // self.setState({})

	}
	render() {
		console.log('更舞台更新',baseUrl)
		return (
	 
            <div style={{fontSize:'0.5rem'}}>
					{/* <Page2/> */}
				 <PageTree2/>
				 {/* <PageMap/> */}
			</div>

		 


		)
	}
}
export default App;