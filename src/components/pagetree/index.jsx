import './index.less'
 import Title from '../common/Title.jsx'
 import TimelineTrend from './TimelineTrend.jsx'
 import ForwardMediaCount from './ForwardMediaCount.jsx'
import HotRanking from './HotRanking.jsx'
 import Weekspreadtrend from './Weekspreadtrend.jsx'
import PressDistributePie from './PressDistributePie.jsx';
import TreeSpineList from './TreeSpineList.jsx'
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

		this.timelineTl = null;
		this.state = {
			whitchPressCount:0,//第几个渠道
			fontSize:12,
			reportlist:{},//1.	左上KPI数据概览
			reprinthottop:{},//4.发稿渠道占比
			reprintlistlatest:{},//2.	近一周融合传播力趋势
			weekspreadtrend:{},//3.	发稿数量近7天分日渠道图(UserAnalyTrendLine)X
 
			freshRender:false,
			treefreshRender:false,
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
     
		let reportlist = await this.getJson_promise('./json/pagetree/reportlist.json');
		let reprinthottop = await this.getJson_promise('./json/pagetree/reprinthottop.json');
		let reprintlistlatest = await this.getJson_promise('./json/pagetree/reprintlistlatest.json');
		let weekspreadtrend = await this.getJson_promise('./json/pagetree/weekspreadtrend.json');
 
		return {
			reportlist,
			reprinthottop,
			reprintlistlatest,
			weekspreadtrend
 
		}
		 
	}
    initPixi(){
		var self =this;
		const PixiLoader = new PIXI.loaders.Loader();
        let pixiApp = new PIXI.Application({
            width:1920,
            height:1080,
            transparent:true
		});
		pixiApp.view.style.cssText = 'width:100%;height:100%;position:relative;'
        this.refs.pixicanvas.appendChild(pixiApp.view)
		PixiLoader.add([
            {
                "name":"skeleton_an",
                "url":"./spine/pagetree/skeleton.json"

            }
        ])
        .load((loader, resources) => {
            console.log(resources,'rrr')
           let myspine = new PIXI.spine.Spine(resources.skeleton_an.spineData)
		   pixiApp.stage.addChild(myspine);

 

           myspine.x = 968;
           myspine.y = 550;
		   myspine.state.setAnimation(0,'animation',true)
		   setTimeout(()=>{
	     	self.playTree();
		   },0)
		   myspine.state.addListener({
			   complete:function(){
				self.playTree();
			   }
		   })
		 
		   

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
			setInterval(()=>{
				self.setState({
					freshRender:!self.state.freshRender,
				
				});
				self.timelineTl.restart();
			},13000)

				self.playTimeline();
	
				this.initPixi.call(this)
	
	
			var setterTime = true;
			var setters;
		

			console.log('weekspreadtrend',this.state.weekspreadtrend)
			//setInterval(playTree,5000)
		
		 
	 
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
	  playTree(){
		  let self = this;
		 
	 
		self.setState({
			treefreshRender:!self.state.treefreshRender,
		
		});
		// setTimeout(()=>{
		// 	self.playTree();
		// 	console.log('重新来啊')
		// },10800)
	
	};

	playTimeline(){
		var i =0,self = this;
		var kuais = ['kuai1','kuai2','kuai3','kuai4'].map((item,index)=>{
			return {
				x:index*1.4,
				imgName:item,
				freshRender:false
			}
		})
		self.setState({
			timelineList:kuais
		})
		// setInterval(()=>{
		// 	let newArr = self.state.timelineList.slice(0);
		// 	newArr[0].freshRender = !newArr[1].freshRender
		// 	console.log('....',newArr[1].freshRender)
		// 	self.setState({
		// 		timelineList:newArr
		// 	})
		// },1100)
		let newArr = self.state.timelineList.slice(0);
	 
		this.timelineTl = new gsap.TimelineMax();
	
		this.timelineTl.add(function(){
		 
				newArr.forEach((item)=>{
					item.freshRender = false;
				})
			self.setState({
				timelineList:newArr
			})
		},0)
 
		this.timelineTl.add(function(){
			newArr[0].freshRender = true
			self.setState({
				timelineList:newArr
			})
		},0.1)
		this.timelineTl.add(function(){
			newArr[1].freshRender = true
			self.setState({
				timelineList:newArr
			})
		},'+=1');
		this.timelineTl.add(function(){
			newArr[2].freshRender = true
			self.setState({
				timelineList:newArr
			})
		},'+=1');
		this.timelineTl.add(function(){
			newArr[3].freshRender = true
			self.setState({
				timelineList:newArr
			})
		},'+=1')


		// while(i<4){
	
		// 	(function(i){
		// 		setTimeout(()=>{
		// 			console.log('get out!');
		// 			let newArr = self.state.timelineList.slice(0);
		// 			newArr.push({
		// 				x:(i)*1.4,
		// 				imgName:kuais[i]
					 
		// 			})
		// 			self.setState({
		// 				timelineList:newArr
		// 			})
		// 		},i*1000)
		// 	}(i));
		// 	i++;
		// }
		
	}
	componentDidUpdate(){

	}

	render() {
		let reprintNews;
	 
		if(this.state.reportlist && this.state.reportlist.length>0){
			reprintNews= this.state.reportlist.map((item)=>{
			return {
				pubtime:item.pubtime,
		     	title:item.title

			}
		})
		 reprintNews = reprintNews.slice(0,5)
		}
		console.log('!!!>>>>reprintNews',reprintNews)

	 
		//console.log(this.state.paper_sevenday,'llll')
		return (
		   <div className='PageTree'>
		   

           <div ref='pixicanvas' className='pixicanvas'></div>
		       <Weekspreadtrend timestamp={this.state.weekspreadtrend.timestamp} series={this.state.weekspreadtrend.series} freshRender={this.state.freshRender}/>
              <TimelineTrend freshRender={this.state.freshRender} bandList={this.state.timelineList} fontSize={this.state.fontSize}/>
			  <PressDistributePie freshRender={this.state.freshRender} pressTypes={this.state.reportlist[0]}/>
			  <ForwardMediaCount/>
			  <HotRanking series={this.state.reprinthottop} />
			  {
				  reprintNews && <TreeSpineList freshRender={this.state.treefreshRender} series={reprintNews}/>
			  }
			  <div className='DigiText'>
			  	<img src={require('../../img/textdigi.png')} width='100%' height='auto'/>
			  </div>
			

			  <Title/>
		   </div>
		   
 
		)
	}
}
export default Index;