//装载数。四个;
import './ForwardMediaCount.less'
class ForwardMediaCount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemList:[{
                pic:'icon04',
                number:'13',
                text:'报道区县数'
            },{
                pic:'icon03',
                number:'87.37%',
                text:'完成比例'

            },{
                pic:'icon02',
                number:'632',
                text:'发稿总数'
            },{
                pic:'icon01',
                number:'12,897',
                text:'转载总数'
            }]
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
export default ForwardMediaCount;