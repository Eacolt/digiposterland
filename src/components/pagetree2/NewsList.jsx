import './NewsList.less'
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
       
     
    }
    componentWillReceiveProps(nextProps){

 
        if( nextProps.lists.length>0 && this.props.freshRender !== nextProps.freshRender){
       
            if(this.times*4+4>nextProps.lists.length+4){
                this.times = 0;
                
            }

            let arr = nextProps.lists.slice(0);
            let newArr = arr.slice(this.times*4,this.times*4+4);
 
            this.setState({
                list:newArr
            })
            this.times++;
        }
    }
    
    render(){
      
        return(
            <div className='NewsList'>
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
                           <div>
                           <div className='title'>{item.title}</div>
                            <div className='content'>{item.pubtime} {item.source}</div>
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