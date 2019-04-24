 import './index.less'
 
import D3Lines from './D3Lines.jsx'
import Axios from '_axios@0.18.0@axios';
import UserCounts from './UserCounts.jsx'
import PressCountLineEx from './PressCountLineEx.jsx'
//长沙县概览;


 
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.myChart = null;
		this.chartOption = null;
		this.state = {
			kpiData:{},//左上KPI数据概览
			original_ratio:{},//原创稿件数量渠道,
			oneweek:{},//近一周融合传播,
			paper_sevenday:{},//发稿数量最近七天,
			papercount_ratio:{},//发稿数量渠道占比
			webo_app:{}//网站微博



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
		let _kpiData,_oneweek;
		
 
 
		this.myChart = Echarts.init(this.refs.demo,null);

		
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
			console.log(self.state)
			setTimeout(()=>{
			
 

				var fontsizes = parseInt(document.documentElement.style.fontSize)*0.18;
	
				self.chartOption  = {
				 
				
						title: {
							text: 'Customized Pie',
							left: 'center',
							top: 20,
							textStyle: {
								color: '#ccc'
							}
						},
					 
					
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
					
						// visualMap: {
						// 	show: false,
						// 	min: 80,
						// 	max: 600,
						// 	inRange: {
						// 		colorLightness: [0, 1]
						// 	}
						// },
						legend: {
							orient: 'vertical',
							right: '0',
							data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
							textStyle:{
								fontSize:fontsizes
							}
						},
						series : [
							{
								name:'访问来源',
								type:'pie',
								radius : [20,100],
								center: ['40%', '50%'],
						 
								avoidLabelOverlap: false,
								
								data:[
									{value:335, name:'直接访问',color:'gold'},
									{value:310, name:'邮件营销',color:'green'},
									{value:274, name:'联盟广告',color:'purple'},
									{value:235, name:'视频广告',color:'lightblue'},
									{value:400, name:'搜索引擎',color:'pink'}
								],
								roseType:'area',
					 
								label: {
								 
									 position:'outside',
								
									 
								},
								labelLine:false,
								// labelLine: {
								// 	normal: {
								// 		lineStyle: {
								// 			color: 'rgba(255, 255, 255, 0.3)'
								// 		},
								// 		smooth: 0.2,
								// 		length: 10,
								// 		length2: 20
								// 	}
								// },
		
		
								itemStyle: {
								  color:function(d,i){
									  return d.data.color
								 
								  },
									 shadowBlur: 10,
									 
									// }
								},
								// itemStyle: {
								// 	emphasis: {
								// 		shadowBlur: 10,
								// 		shadowOffsetX: 0,
								// 		shadowColor: 'rgba(0, 0, 0, 0.5)'
								// 	}
								// },
					
								animationType: 'scale',
								animationEasing: 'elasticOut',
								animationDelay: function (idx) {
									return Math.random() * 200;
								}
							}
						]
					
				};
			 
				self.myChart.setOption(self.chartOption);
					 self.myChart.resize();
	 
				
				},1)
		})
	 
		
	
	}
	componentDidUpdate(){

	}
	render() {
		let kpiDatalist = Object.entries(this.state.kpiData);
		return (
		   <div className='Page2'>
			
			   {/* 左上角KPI */}
			   <UserCounts kpiDataList={kpiDatalist}/>
			   {/* 近一周融合传播力,onweek */}
			   {/* <UserLineEx/> */}
			   <PressCountLineEx/>
			   {/* 网站,微博APP转发 */}
			   {/* <ContentLineEx/> */}
			   {/* 近七天分日渠道 */}
			   {/* <PaperSevenLineEx/> */}
			   {/* 原创稿件数量 */}
			   {/* <OriginPieEx/> */}
			   {/* 发稿数量渠道占比 */}
			   {/* <UserAmountPieEx/> */}
			   <div ref="demo" style={{position:'relative',padding:'0.1rem',borderRadius:'50%',border:'2px solid red',width:'6rem',height:'4rem',background:'gray'}}>
			    
				</div>
		   </div>
 
		)
	}
}
export default Index;