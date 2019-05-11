import './NewsList.less'
import { TweenMax } from 'gsap';
class NewsList extends React.Component{
    times = 0;
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

    


 
        // if( nextProps.lists.length>0 && this.props.freshRender !== nextProps.freshRender){
       
        //     if(this.times*perNum+perNum>nextProps.lists.length+perNum){
        //         this.times = 0;
                
        //     }

        //     let arr = nextProps.lists.slice(0);
        //     let newArr = arr.slice(this.times*perNum,this.times*perNum+perNum);
 
        //     this.setState({
        //         list:newArr
        //     },()=>{
        //         // var fontsize = parseInt(document.documentElement.style.fontSize);
        //         // console.log('ffff',fontsize)
        //         // console.log('telist===>>', ReactDOM.findDOMNode(self.refs.listAnDom).childNodes[0])
        //         // TweenMax.to(ReactDOM.findDOMNode(self.refs.listAnDom).childNodes,3,{
        //         //     y:'-='+fontsize
        //         // })
        //     });


         
        //    this.times++;
        // }


      
     
    }
    startRolling(totalList){
        var self = this;
        this.setState({
            list:totalList.slice(0,3)
        });
        setInterval(()=>{
            let newArr = self.state.list.concat(totalList[3])
            this.setState({
                list:lists.slice(0,3)
            });
        },2000)
        function runRolling(){
            self.setState(prestate=>{
                let newArr = prestate.lists.slice(0).slice()
                return {
                    list:prestate.lists.slice(0)
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
                           <div className='pic'>
                               <img src={require(`../../img/${pic}`)} width='100%' height='auto'/>
                           </div>
                           <div >
                             <div className='title'>{item.title}</div>
                             <div className='content' style={{color:'#02baf2'}}>{item.pubtime} {item.source}</div>
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