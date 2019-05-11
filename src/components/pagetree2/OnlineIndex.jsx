import './index.less'
import baseUrl from '../../utils.js';
 import Title from '../common/Title.jsx'
 import TimelineTrend from './TimelineTrend.jsx'
 import ForwardMediaCount from './ForwardMediaCount.jsx'
import HotRanking from './HotRanking.jsx'
 import Weekspreadtrend from './Weekspreadtrend.jsx'
import PressDistributePie from './PressDistributePie.jsx';
import TreeSpineList from './TreeSpineList.jsx'
import NewsList from './NewsList.jsx'
import common from './common.js'
 
//reportlist.json报道列表(稿件传播情况)
//reprinthottop.json,top5列表,右边
//reprintlistlatest.json.最新报道列表（最新转载列表)
//weekspreadtrend.json.周传播趋势图（转载详情分析）
/**
 * 
 * 
 */




class Index extends React.Component {
	myspine;
	times = 0;
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
			forwardFreshRender:false,
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
	// ===1. 获取关键词
	getPageKey(){
		let self = this;
		return new Promise((resolve,reject)=>{
			Axios.get(baseUrl.baseUrl+"news/getsidBySql",{
				params: {
					source: "文章传播分析"
				}
			}).then((resp)=>{
				resolve(resp.data[0].Configure);
			}).catch((error)=>{
				resolve(0);
			})
		});
	};
	// ====2. 根据关键词获取稿件列表
	getTreeList(keyWord){

		var self = this;
		return new Promise((resolve,reject)=>{
			Axios.get(baseUrl.baseUrl+"sitenews/articlepress",{
				params: {
					keyWord: encodeURI(keyWord)
				}
			}).then((treeData)=>{
				resolve(treeData.data.data)
			}).catch((err)=>{
				resolve(require('../../json/pagetree/reportlist.json'))

			})
		});
	};
	// ====3. 根据稿件id获取转载最新报道列表
	getLatestList(keyWord,id){
		var self = this;
		return new Promise((resolve,reject)=>{
			//baseUrl.baseUrl+"sitenews/newsList";
			Axios.get(baseUrl.baseUrl+"sitenews/newsList",{
				params: {
					keyWord: encodeURI(keyWord),
					id: id
				}
			}).then((latestList)=>{
				resolve(latestList.data.data);
			}).catch((err)=>{
				resolve(require('../../json/pagetree/reprintlistlatest.json'));



			})
		});
	};
	// ====4. 根据稿件id获取转载top5
	getForwardTop(keyWord,id){
		var self = this;
		return new Promise((resolve,reject)=>{
			Axios.get(baseUrl.baseUrl+"sitenews/mediaList",{
				params: {
					keyWord: encodeURI(keyWord),
					id: id
				}
			}).then((forwardTop)=>{
				resolve(forwardTop.data.data);	
			}).catch(()=>{
				 
				resolve(require('../../json/pagetree/reprintlistlatest.json'))
			})
		})
	};
	async reg_pro(_index){
     
		let keyWord = await this.getPageKey();
		let reportlist = await this.getTreeList(keyWord);
		let reprintlistlatest = await this.getLatestList(keyWord,reportlist[_index].id);
		let reprinthottop = await this.getForwardTop(keyWord,reportlist[_index].id)
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
            myspine.y = 1080/2;
		    myspine.state.setAnimation(0,'animation',true);
		});
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
           self.myspine = new PIXI.spine.Spine(resources.skeleton_an.spineData)
		   pixiApp.stage.addChild(self.myspine);
           self.myspine.x = 988;
           self.myspine.y = 550;
		   self.myspine.state.setAnimation(0,'animation',false);
		   self.myspine.skeleton.setSkinByName('k5');
		   self.setState({
			freshRender:!self.state.freshRender,
		
		});
		   self.myspine.state.addListener({
			   complete:function(){
					self.myspine.state.setAnimation(0,'animation2',true);
				
			   }
		   })
        });
	}
	componentDidMount() {
		let self = this;
 
		self.reg_pro(self.times).then(({
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
			});
			setInterval(()=>{
				refreshAll();
			},common.freshTime);//七秒刷新一次

			function refreshAll(){
				self.reg_pro(self.times).then(({
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
						self.myspine.skeleton.setSkinByName('k'+(5-self.times));
						self.times+=1;
						if(self.times>=5){
							self.times = 0;
						}
						self.setState({
							freshRender:!self.state.freshRender,
							forwardFreshRender:!self.state.forwardFreshRender
						
						});

					})
				
				
				});

			}

			self.initPixi.call(self)
	
 
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
		      <div style={{position:'absolute',width:'100%',height:'100%'}}>
			   <img src={require('../../img/treemap.png')} width='100%' height='100%'/>
		   </div>
		    <div ref='lightAnime' className='pixicanvas'></div>
           <div ref='pixicanvas' className='pixicanvas'></div>
		       <Weekspreadtrend timestamp={this.state.weekspreadtrend.timestamp} series={this.state.weekspreadtrend.series} freshRender={this.state.freshRender}/>
              {/* <TimelineTrend freshRender={this.state.freshRender} bandList={this.state.timelineList} fontSize={this.state.fontSize}/> */}
			  <PressDistributePie freshRender={this.state.freshRender} pressTypes={this.state.reportlist[0]}/>
			  <ForwardMediaCount freshRender={this.state.freshRender} lists={this.state.reportlist}/>
			  <HotRanking series={this.state.reprinthottop} />
			  {
				  reprintNews && <TreeSpineList freshRender={this.state.freshRender} series={reprintNews}/>
			  }

			  <NewsList freshRender={this.state.freshRender} lists={this.state.reprintlistlatest}/>
			 
			

		   </div>
		   
 
		)
	}
}
export default Index;