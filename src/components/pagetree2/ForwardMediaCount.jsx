//装载数。四个;
import './ForwardMediaCount.less'
class ForwardMediaCount extends React.Component{
    times = 0;
    constructor(props){
        super(props);
        this.state = {
            itemList:[ {
                pic:'icon02',
                number:'632',
                text:'发稿总数'
            },{
                pic:'icon01',
                number:'12,897',
                text:'转载媒体数'
            }]
        }
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.freshRender === this.props.freshRender){
            return false;
        }else{
            return true;
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.lists.length>0 && this.props.freshRender !== nextProps.freshRender){
            if(this.times>=nextProps.lists.length){
                this.times = 0;

            }
            let newData = nextProps.lists[this.times];
            let arrState =  this.state.itemList.slice(0);
            arrState[0].number = newData.forwardMediaCount;
            arrState[1].number = newData.forwardCount;
     
            this.setState({
                itemList:arrState
            })
  
            this.times++;
        }
     


    }
    render(){
        return(
            <div className='ForwardMediaCount'>
           
                <div className='Contents'>
                
                {
                this.state.itemList.map((item,index)=>{
                    return(
                        <div className="item" key={index}>
                        <div className='pic'>
                            <img src={require(`../../img/pagetree/${item.pic}.png`)} width='100%' height='100%'/>
                        </div>
                        <div className='number'>{item.number}</div>
                        <div className='text'>{item.text}</div>

   
                    </div>
                    )
                })
            }
                </div>
            </div>
        )
    }
}
ForwardMediaCount.defaultProps = {
    freshRender:false,
    itemList:[ {
        pic:'icon02',
        number:'632',
        text:'发稿总数'
    },{
        pic:'icon01',
        number:'12,897',
        text:'转载总数'
    }]
}
export default ForwardMediaCount;