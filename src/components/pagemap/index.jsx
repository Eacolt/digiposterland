

import './index.less'
import Axios from '_axios@0.18.0@axios';
import Title from '../common/Title.jsx'
import { util } from 'node-forge';
//content.json// 镇街报道内容列表;
//ranking.json//镇街报道周榜单
class Index extends React.Component{
    contentJson;
    rankingJson;
    constructor(props){
        super(props)
        this.state = {
            mapIndex:0,
            contentList:[],
            rankingList:[]
        }
    }
    componentDidMount(){
       this.initPixi();
    }
    bubbleObject(_arr){
        var arr = _arr.slice(0);
        for(var i=0;i<arr.length;i++){
            for(var k=0;k<arr.length-1-i;k++){
                if(arr[k].forwardCount < arr[k+1].forwardCount){
                    var temp = arr[k+1];
                    arr[k+1] = arr[k];
                    arr[k] = temp;
                }
            }

        }
        return arr;

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
                "url":"./spine/pagemap/skeleton.json"

            }
        ])
        .load((loader, resources) => {
           let myspine = new PIXI.spine.Spine(resources.skeleton_an.spineData)
		   pixiApp.stage.addChild(myspine);
 
           myspine.x = 968;
           myspine.y = 550;
           myspine.state.setAnimation(0,'animation',true)
           
           Axios.get('./json/pagemap/content.json').then((content)=>{
                Axios.get('./json/pagemap/ranking.json').then((ranking)=>{
                    // "count": 72.5,
                    // "forwardCount": 156,
                    // "centralMedia": 13235,
                    // "provincialMedia": 2367,
                    // "countyMedia": 612,
                    // "keyWord": "果园镇"
                 
                    self.contentJson = content.data.data;
                    self.rankingJson = ranking.data.data;
                    console.log(self.rankingJson);
                    self.setState({
                        contentList:content.data.data,
                        rankingList:self.bubbleObject(ranking.data.data.slice(0,17))
                    });
                    self.setState((prestate)=>{
                     
                  
                       
                 
                       return {
                           mapIndex:0,
                           contentList:self.contentJson.slice(0,4),
                       }
                   });
                   myspine.state.setAnimation(0,'animation2',true)
                   self.lightMapAt(self.state.rankingList[self.state.mapIndex].keyWord,myspine)

               
           

                   setInterval(()=>{
                       
                       self.setState((prestate)=>{
                            let newList = self.contentJson.slice(0);
                     
                              
                       
                            let d = prestate.mapIndex >= 16 ? 0 : prestate.mapIndex+1
                   
                            let last = d+4>14 ? self.contentJson.length : d+4
                         
                           return {
                               mapIndex:d,
                               contentList:newList.slice(d,d+4),
                           }
                       });
                       self.lightMapAt(self.state.rankingList[self.state.mapIndex].keyWord,myspine)
                   },4000)


                })
          
           })
		 
		   

        });
		
 
    }
    lightMapAt(_name,myspine){
        let an_name;
        switch(_name){
            case '金井镇':
            an_name = 'jinjingzhen';
            break;

            case '江背镇':
            an_name = 'jiangbeizhen';
            break;

            case '果园镇':
            an_name = 'guoyuanzhen';
            break;

            case '春华镇':
            an_name = 'chunhuazhen';
            break;

            case '北山镇':
            an_name = 'beishanzhen';
            break;

            case '黄花镇':
            an_name = 'huanghuazhen';
            break;

            case '安沙镇':
            an_name = 'anshazhen';
            break;

            case '开慧镇':
            an_name = 'kaihuizhen';
            break;

            case '黄兴镇':
            an_name = 'huangxingzhen';
            break;

            
            case '路口镇':
            an_name = 'lukouzhen';
            break;

            case '福临镇':
            an_name = 'fulinzhen';
            break;

            case '高桥镇':
            an_name = 'gaoqiaozhen';
            break;

            case '青山铺镇':
            an_name = 'qingshanpuzhen';
            break;

            
            case '长龙街道':
            an_name = 'changlongjiedao';
            break;
            
            case '㮾梨街道':
            an_name = 'langlijiedao';
            break;

            case '星沙街道':
            an_name = 'xingshazhen';
            break;
            case '湘龙街道':
            an_name = 'xianglongjiedao';
            break;
            case '泉塘街道':
            an_name = 'quantangjiedao';
            break;
         

            default:
            an_name = ''

            break;
        }
        myspine.skeleton.setSkinByName(an_name);
       // myspine.skeleton.setSlotsToSetupPose();
    //    myspine.state.setAnimation(0,'animation2',true)
    }
 
    render(){
        var arrangeList = this.state.rankingList.map((item,index)=>{
            let n = 'rank3.png';
      
            switch(index){
                case 0:
                n = 'rank1.gif'
                break;

                case 1:
                n = 'rank2.png'
                break;

                case 2:
                n = 'rank3.png'
                break;
 
                default:
                n = 'rank'+(index+1)+'.png'
                break;
            }
            return Object.assign(item,{
                pic:n
            })
        })
        return(
            <div className='Pagemap'>
                <div ref='pixicanvas' className='pixicanvas'></div>

                
                <ul className='leftData'>
                {
                    arrangeList.map((item,index)=>{
                        return(
                            <li key={index} style={{color:index===this.state.mapIndex? 'gold ':'white'}}>
                            <div style={{width:'0.25rem'}}><img src={require('../../img/'+item.pic+'')}  width='100%' height='100%'/></div>
                            <div style={{width:'1.3rem',paddingLeft:'0.2rem'}}>{item.keyWord}</div>
                            <div style={{width:'1rem'}}>{item.forwardCount}</div>
                            <div style={{width:'0.82rem'}}>{item.centralMedia}</div>
                            <div style={{width:'1rem'}}>{item.provincialMedia}</div>
                            <div style={{width:'0.75rem'}}>{item.countyMedia}</div>
                            <div style={{width:'0.8rem'}}>{item.count}</div>
                           </li>
                        )

                    })
                }
                   
                    
                </ul>
               
                <ul className='rightData'>
                {
                   this.state.contentList.map((item,index)=>{
                        return (
                            <li className='lists' key={index}>
                            <div className='uppon'   >{item.title}></div>
                            <div className='bottom'  >{item.source}&nbsp;{item.pubdate}</div>
                   
                        </li>
                        )
                    })
                }
                  

           
 
                    
                </ul>
                <Title text='长沙县镇街发稿'/>
            </div>
        )
    }

}
export default Index