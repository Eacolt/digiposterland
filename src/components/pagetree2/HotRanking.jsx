import './HotRanking.less'
class HotRanking extends React.Component{
    constructor(props){
        super(props)
        this.state = {

            
        }
    }
    // bubbleObject(_arr){
    //     var arr = _arr.slice(0);
    //     for(var i=0;i<arr.length;i++){
    //         for(var k=0;k<arr.length-1-i;k++){
    //             if(arr[k].forwardCount < arr[k+1].forwardCount){
    //                 var temp = arr[k+1];
    //                 arr[k+1] = arr[k];
    //                 arr[k] = temp;
    //             }
    //         }

    //     }
    //     return arr;

    // }
    componentWillReceiveProps(nextProp){
        
        // let rankList = this.bubbleObject(this.props.rankList);
        // rankList = rankList.map((item,index)=>{
        //     let colors = ['#FF0000','#FF7E00','#ECB100','#0080EC','#0080EC']
        //     return Object.assign(item,{
        //         color:colors[index]
        //     })
        // })
        
        

    }

    render(){
       

        return(
            <div className='HotRanking'>
            {
                this.props.rankList.length>0 && this.props.rankList.map((item,index)=>{
                    let picname = index===0?'rank1.gif':'rank'+(index+1)+'.png';
                    let colors = (function(indexs){
                        if(indexs === 0){
                            return 'red'
                        }
                        else if(indexs === 1){
                            return '#FF7E00';
                        }
                        else if(indexs === 2){
                            return '#FF7E00'
                        }
                        else{
                            return 'white'
                        }
                    }(index));
  
                    return(
                        <div className='item' key={index}>
                        <div className={index===0?'gif':'pic'}>
                            <img src={require('../../img/'+picname) || '#'} width='100%' height='100%'/>
                        </div>
                  
                        <div className='medianame' style={{color:colors}}>{item.source}</div>
                        <div className='count' style={{color:colors}}>{item.forwardCount}</div>
                      </div>

                    )
                })
            }
            </div>
        )
    }

}

HotRanking.defaultProps = {
    rankList:[]
}
export default HotRanking;


