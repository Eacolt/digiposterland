import './HotRanking.less'
class HotRanking extends React.Component{
    constructor(props){
        super(props)
        this.state = {

            
        }
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
    componentWillReceiveProps(nextProp){
        let rankList = this.bubbleObject(this.props.rankList);
        rankList = rankList.map((item,index)=>{
            let colors = ['#FF0000','#FF7E00','#ECB100','#0080EC','#0080EC']
            return Object.assign(item,{
                color:colors[index]
            })
        })
        console.log('rankListrankList',rankList)
        

    }

    render(){
        const ranklist = this.bubbleObject(this.props.rankList);

        return(
            <div className='HotRanking'>
            {
                ranklist.map((item,index)=>{
                    let picname = index===0?'rank1.gif':'rank'+(index+1)+'.png';
                    return(
                        <div className='item' key={index}>
                        <div className={index===0?'gif':'pic'}>
                            <img src={require('../../img/'+picname) || '#'} width='100%' height='100%'/>
                        </div>
                        <div className='medianame' style={{color:item.color}}>{item.source}</div>
                        <div className='count' style={{color:item.color}}>{item.forwardCount}</div>
                      </div>

                    )
                })
            }
            </div>
        )
    }

}

HotRanking.defaultProps = {
    rankList:[{
        "source": "搜狐网",
        "forwardCount": 25
      },
      {
        "source": "人民网",
        "forwardCount": 20
      },
      {
        "source": "东北新闻网",
        "forwardCount": 13
      },
      {
        "source": "天天快报-手机客户端",
        "forwardCount": 13
      },
      {
        "source": "腾讯网",
        "forwardCount": 12
      }
    ]
}
export default HotRanking;


