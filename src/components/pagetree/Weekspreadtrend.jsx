
import './Weekspreadtrend.less'
class Weekspreadtrend extends React.Component{
    myChart;
    myOption;
    constructor(props){
        super(props)
    }
    componentWillUpdate(nextProps){
        var self = this;
        this.myChart.resize();

  
        const fontsize = parseInt(document.documentElement.style.fontSize);
        let xAxisData = []
 
        if(this.props.freshRender !== nextProps.freshRender){
            let seriesData = Object.entries(self.props.series)
         
            
             let _series  = seriesData.map((item)=>{
                let _name;
                switch(item[0]){
                    case 'forwardCount':
                    _name = '转载数';
                    break;
                    case 'forwardMediaCount':
                    _name = '媒体转载数';
                    break;
                    default:
                    break;

                }
                xAxisData.push(_name)
                
                return {
                    name:_name,
                    type:'line',
          
                    areaStyle: {},
                    data:item[1],
                    smooth:true
                }
            })
         
      
            this.myOption.xAxis.data = this.props.timestamp;
     
            this.myOption.series = _series;

      
            this.myOption.legend = {
                data:xAxisData,
                right:0,
                top:'13%',
                textStyle:{
                    color:'#fff'
                }
            }
            
            this.myChart.clear();
            this.myChart.setOption(this.myOption);
            console.log('dddd')
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
            <div ref='demo' className='Weekspreadtrend'>
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