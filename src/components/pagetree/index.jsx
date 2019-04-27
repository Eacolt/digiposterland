import './index.less'
 import Title from '../common/Title.jsx'
 import TimelineTrend from './TimelineTrend.jsx'
 import ForwardMediaCount from './ForwardMediaCount.jsx'

 import Weekspreadtrend from './Weekspreadtrend.jsx'
import PressDistributePie from './PressDistributePie.jsx';

//reportlist.json报道列表(稿件传播情况)
//reprinthottop.json,top5列表,右边
//reprintlistlatest.json.最新报道列表（最新转载列表)
//weekspreadtrend.json.周传播趋势图（转载详情分析）




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
			whitchPressCount:0,//第几个渠道
			fontSize:12,
			reportlist:{},//1.	左上KPI数据概览
			reprinthottop:{},//4.发稿渠道占比
			reprintlistlatest:{},//2.	近一周融合传播力趋势
			weekspreadtrend:{},//3.	发稿数量近7天分日渠道图(UserAnalyTrendLine)X
 
			freshRender:false,
			timelineList:[]//{x:4}



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
     
		let reportlist = await this.getJson_promise('../../json/pagetree/reportlist.json');
		let reprinthottop = await this.getJson_promise('../../json/pagetree/reprinthottop.json');
		let reprintlistlatest = await this.getJson_promise('../../json/pagetree/reprintlistlatest.json');
		let weekspreadtrend = await this.getJson_promise('../../json/pagetree/weekspreadtrend.json');
 
		return {
			reportlist,
			reprinthottop,
			reprintlistlatest,
			weekspreadtrend
 
		}
		 
	}
    initPixi(){
		const PixiLoader = new PIXI.loaders.Loader();
        let pixiApp = new PIXI.Application({
            width:1920,
            height:1080,
            transparent:true
		});
		pixiApp.view.style.cssText = 'border:1px solid red;width:100%;height:100%;position:relative;'
        this.refs.pixicanvas.appendChild(pixiApp.view)
		PixiLoader.add([
            {
                "name":"skeleton_an",
                "url":"../../spine/pagetree/skeleton.json"

            }
        ])
        .load((loader, resources) => {
            console.log(resources,'rrr')
           let myspine = new PIXI.spine.Spine(resources.skeleton_an.spineData)
           pixiApp.stage.addChild(myspine);
           myspine.scale.x = myspine.scale.y = 1.5;
           myspine.x = 950;
           myspine.y = 400;
           myspine.state.setAnimation(0,'animation',true)

            
        // resources.bunny
        // resources.spaceship
        });
		
 
	}
 

	componentDidMount() {
		let self = this;
		var settimer;
        var throttles = true;
      
 
 
		
		this.reg_pro().then(({
			reportlist,
			reprinthottop,
			reprintlistlatest,
			weekspreadtrend
		})=>{
	 
			self.setState({
				reportlist,
			reprinthottop,
			reprintlistlatest,
			weekspreadtrend,
			fontSize:parseInt(window.document.documentElement.style.fontSize),

 
			
			},()=>{
				console.log('this.reportlistreportlist',this.state.reportlist[0].pressTypes)
			

			});

			self.setState({
				freshRender:!self.state.freshRender,
			
			});

				self.playTimeline();
	
			 
	
	
			var setterTime = true;
			var setters

			console.log('weekspreadtrend',this.state.weekspreadtrend)
			// window.addEventListener('resize',function(){
 
			// 	if(setterTime){
			// 		setters = setTimeout(()=>{
			// 			setterTime = true;
			// 			console.log(888)
			// 		},300)
			// 		setterTime = false;
			// 	}
 
			// })
 
 
		//	console.log('this.state.paper_sevenday.timestamp',this.state.paper_sevenday.timestamp)
		

	 




		})
	 
		
	
	}
	playTimeline(){
		var i =0,self = this;
		while(i<4){
	
			(function(i){
				setTimeout(()=>{
					console.log('get out!');
					let newArr = self.state.timelineList.slice(0);
					newArr.push({
						x:(i)*1.4,
					 
					})
					self.setState({
						timelineList:newArr
					})
				},i*1000)
			}(i));
			i++;
		}
		
	}
	componentDidUpdate(){

	}

	render() {
	 
		//console.log(this.state.paper_sevenday,'llll')
		return (
		   <div className='PageTree'>
		   

           <div ref='pixicanvas' className='pixicanvas'></div>
		       <Weekspreadtrend timestamp={this.state.weekspreadtrend.timestamp} series={this.state.weekspreadtrend.series} freshRender={this.state.freshRender}/>
              <TimelineTrend bandList={this.state.timelineList} fontSize={this.state.fontSize}/>
			  <PressDistributePie freshRender={this.state.freshRender} pressTypes={this.state.reportlist[0]}/>
			  <ForwardMediaCount/>

			  <Title/>
		   </div>
		   
 
		)
	}
}
export default Index;