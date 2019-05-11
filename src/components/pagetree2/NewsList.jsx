import './NewsList.less'
import { TweenMax } from 'gsap';
 

class NewsList extends React.Component{
    rolltimes = 3;
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        let  self = this;



        // TweenMax.to(ReactDOM.findDOMNode(this.refs.listAnDom).children[0],1,{
        //     y:'-=100'
        // })
        let perNum = 3;
        // self.setState({
        //     list:
        // });
        console.log(this.props.lists,'<<<<list')
 
     
    }
    startRolling(totalList){
        
        var self = this;
        this.setState({
            list:totalList.slice(0,self.rolltimes)
        });
        function createNewArr(callback){
   
            let newArr = self.state.list.concat();
            self.rolltimes++;
            if(self.rolltimes>=totalList.length){
                self.rolltimes = 0;
            }
            newArr.push(totalList[self.rolltimes]);
     
            self.setState({
                list:newArr
            },()=>{
                callback();
                // var fontsize = parseInt(document.documentElement.style.fontSize);
                // ReactDOM.findDOMNode(self.refs.listAnDom).scrollTop = fontsize;
              //  let tops = window.getComputedStyle(ReactDOM.findDOMNode(self.refs.listAnDom).childNodes[1],null).display;
                //console.log('第一个TOP',tops);
               // runRolling();
            });
        }
        setTimeout(()=>{


            createNewArr(function(){
                runRolling();
            });
        
          console.log('我要曹操你')
        },5000)
        function runRolling(){
            var fontsize = parseInt(document.documentElement.style.fontSize);
             TweenMax.to(ReactDOM.findDOMNode(self.refs.listAnDom),1.2,{
                scrollTop:'+='+fontsize,
                onStart:function(){
                    console.log('啥个意思?')
                },
                 onComplete:function(){
                     

                     let newArr = self.state.list.concat();
                     newArr.shift();
                     self.setState({
                         list:newArr
                     });
                     setTimeout(()=>{
                        createNewArr(function(){
                            runRolling();
                        });
                     },5000)
             
       
                 }
             })

        }
    }
    componentWillReceiveProps(nextProps){
         if( nextProps.lists.length>0 &&  JSON.stringify(this.props.lists) !== JSON.stringify(nextProps.lists)){
       
             this.startRolling.call(this,nextProps.lists);
       
        
        }
    }
    
    render(){
      
        return(
            <div className='NewsList' ref="listAnDom">
            {
               this.state.list.map((item,index)=>{
                   console.log('iiiiiitem',item)

          
                   let pic = (function(_item){
                       switch(_item.dataType){
                           case 'news':
                           return 'icon_ie.png';
                           case 'wechat':
                           return 'icon_wx.png';
                           case 'weibo':
                           return 'icon_xl.png';
                           case 'app': 
                           return 'icon_ie.png'
                           default:
                           return 'icon_ie.png'
                       }
                   }(item));

                    return (
                        <div className='Item' key={index}>
                           <div className='pic' style={{backgroundImage:`url("../../img/${pic}")`,backgroundSize:'contain',backgroundPosition:'55% 0',backgroundRepeat:'no-repeat'}}>
                           
                           </div>
                           <div >
                             <div className='title'>{item.title}</div>
                             <div className='content' style={{color:'#02baf2'}}>
                             <span>{item.pubdate}</span>
                             <span style={{paddingLeft:'0.2rem'}}>{item.source}</span>
                        
                             </div>
                           </div>
                           
                        </div>
                    )
                })
            }

            </div>
        )
    }
}
NewsList.defaultProps = {
    lists:[{},{}],
    freshRender:false
}
export default NewsList;