
import './Weekspreadtrend.less'
class Weekspreadtrend extends React.Component{
    myChart;
    myOption;
    constructor(props){
        super(props)
        this.state = {
            shown:false
        }
    }
    componentWillReceiveProps(nextProps){
  
        if(nextProps.freshRender !== this.props.freshRender){
            this.myChart.resize();
            this.myChart.clear();
            console.log('强制更新!!')
        }
    }
    componentWillUpdate(nextProps){
        var self = this;
  
  
  
        const fontsize = parseInt(document.documentElement.style.fontSize);
        let xAxisData = []
 
        if(this.props.freshRender !== nextProps.freshRender){
            this.setState({
                shown:true
            })
            let seriesData = Object.entries(self.props.series)
         
            
             let _series  = seriesData.map((item)=>{
                let _name;
                switch(item[0]){
                    case 'forwardCount':
                    _name = ['转载数','#44F0FFFF'];
                    break;
                    case 'forwardMediaCount':
                    _name = ['媒体转载数','#ECB100FF'];
                    break;
                    default:
                    break;

                }
                xAxisData.push({
                    name:_name[0],
                    icon:'roundRect'
                })
                
                return {
                    name:_name[0],
                    type:'line',
          
                    areaStyle: {
                        opacity:0.25
                    },
                    data:item[1],
                    smooth:true,
                    itemStyle:{
                        color:_name[1]
                    },
                }
            })
         
      
            this.myOption.xAxis.data = this.props.timestamp;
     
            this.myOption.series = _series;

      
            this.myOption.legend = {
                data:xAxisData,
                right:'9%',
                top:'13%',
                textStyle:{
                    color:'#fff'
                }
            }
   
            this.myChart.setOption(this.myOption);
 
            console.log('我就是不一样的烟火')
       
           
        }


     
    }
    componentDidMount(){
  
        this.myChart = Echarts.init(this.refs.demo);
        this.myOption = {

            legend: {
                data:[ ],
           
            },
            xAxis :  {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日'],
                    axisLabel:{
                        color:'#fff',
           
                    },
                    splitLine:{
                        width:1,
                        opacity:0.2

                    }
               
                },
          
            yAxis : {
               
                    type : 'value',
                    axisLabel:{
                        color:'#fff'
                    },
                  
                    splitLine:{
                       lineStyle:{
                           opacity:0.5
                       }

                    }
                
                },
         
         
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[120, 132, 101, 134, 90, 230, 210],
                    smooth:true
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[220, 182, 191, 234, 290, 330, 310],
                    smooth:true
                }
            ]
        }
        this.myChart.setOption(this.myOption);
    }
    render(){
        return(
            <div ref='demo' className='Weekspreadtrend' style={{visibility:this.state.shown ? 'visible' : 'hidden'}} >
            asdfasdf
            </div>
        )
    }
}
Weekspreadtrend.defaultProps = {
    freshRender:false,
    // series:{
    //     forwardMediaCount: [
    //         228,
    //         172,
    //         146,
    //         110,
    //         473,
    //         376,
    //         128
    //     ],
    //     forwardCount: [
    //         703,
    //         571,
    //         572,
    //         411,
    //         842,
    //         757,
    //         341
    //     ]
    // }
}
export default Weekspreadtrend;