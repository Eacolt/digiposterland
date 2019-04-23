 import './index.css'
import D3Lines from './D3Lines.jsx'
class Index extends React.Component {
	constructor(props) {
		super(props)
		this.myChart = null;
		this.chartOption = null;
	}

	componentDidMount() {
		let self = this;
 
		this.myChart = Echarts.init(this.refs.demo,null);

		
 
	 
		setTimeout(()=>{
			
 

			var fontsizes = parseInt(document.documentElement.style.fontSize)*0.18;

			this.chartOption  = {
			 
			
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
		 
			this.myChart.setOption(this.chartOption);
				 this.myChart.resize();
 
			
			},1)
	
	}
	componentDidUpdate(){

	}
	render() {
		return (
		   <div>
			   <div ref="demo" style={{position:'relative',padding:'0.1rem',borderRadius:'50%',border:'2px solid red',width:'6rem',height:'4rem',background:'gray'}}>
			     {/* <div ref="demo" style={{position:'absolute',border:'2px solid green',width:'100%',height:'100%' }}></div> */}
			   </div>
		   </div>
 
		)
	}
}
export default Index;