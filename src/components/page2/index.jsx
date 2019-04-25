 import './index.less'
 
import D3Lines from './D3Lines.jsx'
import Axios from '_axios@0.18.0@axios';
import UserCounts from './UserCounts.jsx'
import UserAnalyTrendLine from './UserAnalyTrendLine.jsx'
import OriginPressCountPie from './OriginPressCountPie.jsx'
//长沙县概览;


 
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.myChart = null;
		this.chartOption = null;
		this.state = {
			kpiData:{},//左上KPI数据概览
			original_ratio:{},//原创稿件数量渠道_发稿渠道占比
			oneweek:{},//发稿数量图——近一周融合传播
			paper_sevenday:{},//发稿数量最近七天——用户分析趋势图(UserAnalyTrendLine)
			papercount_ratio:{},//发稿数量渠道占比
			webo_app:{},//网站微博_内容分析趋势,
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
		let kpiData = await this.getJson_promise('../../json/page2/kpi_view.json');
		let oneweek = await this.getJson_promise('../../json/page2/oneweek.json');
		let original_ratio = await this.getJson_promise('../../json/page2/original_ratio.json');
		let paper_sevenday = await this.getJson_promise('../../json/page2/paper_sevenday.json');
		let papercount_ratio = await this.getJson_promise('../../json/page2/papercount_ratio.json');
		let webo_app = await this.getJson_promise('../../json/page2/webo_app.json');
		return {
			kpiData,
			oneweek,
			original_ratio,
			paper_sevenday,
			papercount_ratio,
			webo_app
		}
		 
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

			window.addEventListener('resize',function(){
				// if(setterTime){
				// 	clearTimeout(setterTime);
				// }
				if(setterTime){
					setters = setTimeout(()=>{
						setterTime = true;
						console.log(888)
					},300)
					setterTime = false;
				}
		

				//self.setState({freshRender:!self.state.freshRender});
			})
			// self.setState({})
 
			console.log('this.state.paper_sevenday.timestamp',this.state.paper_sevenday.timestamp)

		})
	 
		
	
	}
	componentDidUpdate(){

	}
	render() {
		let kpiDatalist = Object.entries(this.state.kpiData);
		console.log(this.state.paper_sevenday,'llll')
		return (
		   <div className='Page2'>
			
			   {/* 左上角KPI */}
			   <UserCounts kpiDataList={kpiDatalist}/>
			   {/* 近一周融合传播力,onweek */}
			   {/* <UserLineEx/> */}
			   <UserAnalyTrendLine freshRender={this.state.freshRender} timestamp={this.state.paper_sevenday.timestamp} series={this.state.paper_sevenday.series} />
			   <OriginPressCountPie freshRender={this.state.freshRender} />
			   {/* 网站,微博APP转发 */}
			   {/* <ContentLineEx/> */}
			   {/* 近七天分日渠道 */}
			   {/* <PaperSevenLineEx/> */}
			   {/* 原创稿件数量 */}
			   {/* <OriginPieEx/> */}
			   {/* 发稿数量渠道占比 */}
			   {/* <UserAmountPieEx/> */}
	 
		   </div>
 
		)
	}
}
export default Index;