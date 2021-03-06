 import './index.less'
 
import D3Lines from './D3Lines.jsx'
import Title from '../common/Title.jsx'
import Axios from '_axios@0.18.0@axios';
import UserCounts from './UserCounts.jsx'
import UserAnalyTrendLine from './UserAnalyTrendLine.jsx'
import OriginPressCountPie from './OriginPressCountPie.jsx'
import ContentAnalyTrendLine from './ContentAnalyTrendLine.jsx';
import PressCountRatioPie from './PressCountRatioPie.jsx';
import OneWeekSpreadTrendLine from './OneWeekSpreadTrendLine.jsx';
//长沙县概览;
/**
 * 
 * 
 */
 
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.myChart = null;
		this.chartOption = null;
		this.state = {
			kpiData:{},//1.	左上KPI数据概览
			original_ratio:{},//4.发稿渠道占比
			oneweek:{},//2.	近一周融合传播力趋势
			paper_sevenday:{},//3.	发稿数量近7天分日渠道图(UserAnalyTrendLine)X
			papercount_ratio:{},//5.累计用户渠道占比
			webo_app:{},//6.内容分析趋势图
			freshRender:false

 
		}
	}
	getJson_promise(url){

		return new Promise((resolve)=>{
			Axios.get(url).then((resp)=>{
		
				resolve(resp.data.data);
				 
			});

		})
	}

	async reg_pro(){
		let kpiData = await this.getJson_promise('./json/page2/kpi_view.json');
		let oneweek = await this.getJson_promise('./json/page2/oneweek.json');
		let original_ratio = await this.getJson_promise('./json/page2/original_ratio.json');
		let paper_sevenday = await this.getJson_promise('./json/page2/paper_sevenday.json');
		let papercount_ratio = await this.getJson_promise('./json/page2/papercount_ratio.json');
		let webo_app = await this.getJson_promise('./json/page2/webo_app.json');
		return {
			kpiData,
			oneweek,
			original_ratio,
			paper_sevenday,
			papercount_ratio,
			webo_app
		}
		 
	}
	initPixi(){
		const self  = this;
			/////
			const PixiLoaderBase = new PIXI.loaders.Loader();
			let pixiBase = new PIXI.Application({
				width:1920,
				height:1080,
				transparent:true
			});
			pixiBase.view.style.cssText = 'width:100%;height:100%;position:relative;';
			this.refs.lightAnime.appendChild(pixiBase.view);
			PixiLoaderBase.add([
				{
					"name":"bganime_an",
					"url":"./spine/background/skeleton.json"
	
				}
			])
			.load((loader, resources) => {
				console.log(resources,'rrr')
			   let myspine = new PIXI.spine.Spine(resources.bganime_an.spineData)
			   pixiBase.stage.addChild(myspine);
			   console.log(myspine,'myspppp')
	
	 
	
				myspine.x = 1920/2;
				myspine.y = 1080/2+50;
				myspine.state.setAnimation(0,'animation',true);
	
	
			   
	
			});
			
	
			//////////////
	
	}
 
	componentDidMount() {
		let self = this;
		var settimer;
		var throttles = true;
		this.reg_pro().then(({
			kpiData,
			oneweek,
			original_ratio,
			paper_sevenday,
			papercount_ratio,
			webo_app
		})=>{
			self.setState({
				kpiData,
				oneweek,
				original_ratio,
				paper_sevenday,
				papercount_ratio,
				webo_app
			});
			console.log('lalallal',self.state);
			
			self.setState({freshRender:!self.state.freshRender});
			var setterTime = true;
			var setters

			console.log('sesse',self.state)
			this.initPixi();


			// window.addEventListener('resize',function(){
			// 	// if(setterTime){
			// 	// 	clearTimeout(setterTime);
			// 	// }
			// 	if(setterTime){
			// 		setters = setTimeout(()=>{
			// 			setterTime = true;
			// 			console.log(888)
			// 		},300)
			// 		setterTime = false;
			// 	}
		

			// 	 self.setState({freshRender:!self.state.freshRender});
			// })
			// self.setState({})
 
 
		})
	 
		setInterval(()=>{
			this.setState({
				freshRender:!self.state.freshRender
			})
		},10000)
   
	
	}
	componentDidUpdate(){

	}
	render() {
		let kpiDatalist = Object.entries(this.state.kpiData);
		console.log(this.state.paper_sevenday,'llll')
		return (
		   <div className='Page2'>

			<div style={{position:'absolute',width:'100%',height:'100%'}}>
						<img src={require('../../img/dataview.png')} width='100%' height='100%'/>
			</div>
		    <div ref='lightAnime' className='pixicanvas'></div>


			
			   {/* 左上角KPI */}
			   <UserCounts kpiDataList={kpiDatalist}/>
 
			  
			   <UserAnalyTrendLine freshRender={this.state.freshRender} timestamp={this.state.paper_sevenday.timestamp} series={this.state.paper_sevenday.series} />
				{/* 累计用户渠道占比 */}
				<OriginPressCountPie customClass='OriginPressCountPie' freshRender={this.state.freshRender}pressTypes={this.state.original_ratio.pressTypes}/>
			  
			  {/* 内容分析趋势图 */}
			   <ContentAnalyTrendLine freshRender={this.state.freshRender} timestamp={this.state.webo_app.timestamp} series={this.state.webo_app.series} />

			   <PressCountRatioPie freshRender={this.state.freshRender} pressTypes={this.state.papercount_ratio.pressTypes}/>
			  <OneWeekSpreadTrendLine freshRender={this.state.freshRender} timestamp={this.state.oneweek.timestamp} series={this.state.oneweek.series} />
		 
		   </div>
 
		)
	}
}
export default Index;