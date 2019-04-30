//内容分析趋势图;
import './index.less'
class ContentAnalyTrendLine extends React.Component{
 
    constructor(props){
        super(props);
        this.myChart = null;
        this.myOption = null;
    }
    componentWillReceiveProps(){
        this.refs.demo.style.visibility = 'hidden'
    }

    componentWillUpdate(nextprops){
        let self = this;
        this.myChart.resize();
        // this.refs.demo.style.visibility = 'hidden'
          if(this.myOption){
            var seriesData = Object.entries(this.props.series);
            var legendName = [];
            var series = seriesData.map((item)=>{
                let names = {
                    newsForwardCount:'网站转发数',
                    appForwardCount:'APP转发数',
                    weiboForwardCount:'微博转发数',
                    wechatReadCount:'微信阅读数'

                }
 
                legendName.push(names[item[0]])
                
            
                return {
                    name:names[item[0]],
                    data:item[1],
                    type: 'line',
                    smooth:true,
                    areaStyle: {}
                }
            });
            legendName = legendName.map((item)=>{
                return {
                    name:item,
                    icon:'roundRect'
                }
            })
            console.log('legendNamelegendName',legendName)
            this.myOption.series = series;
            
            // console.log('updddd self.props.timestamp',self.props.timestamp)
      
            this.myOption.xAxis = Object.assign(this.myOption.xAxis,{
                data:self.props.timestamp,
            })
      
            this.myOption.legend = Object.assign(this.myOption.legend,{
                data:legendName
           });
            
            this.myChart.setOption(this.myOption);
 
 

            if(nextprops.freshRender !== this.props.freshRender){
              
                 this.myChart.clear();
                 this.myChart.setOption(this.myOption)
            }

          }
    }
    componentDidUpdate(){
        setTimeout(()=>{  this.refs.demo.style.visibility = 'visible'
        console.log('updatedd..')},10)
      
    }
    componentDidMount(){
     
        var self = this;
        this.myChart = Echarts.init(this.refs.demo);
        console.log('fuckk',this.props.series)
        var seriesData = Object.entries(this.props.series);
        var fontSize = parseInt(document.documentElement.style.fontSize)*0.2;
        var series = seriesData.map((item)=>{
            return {
                data:item[1],
                type: 'line',
                smooth:true,
                areaStyle: {}
            }
        })
 
            this.myOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:['Mon', '666', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLabel:{
                        color:'#fff',
                        fontSize:fontSize
                    }
                },
                legend:{
                    right:'5%',
                    
                    textStyle:{
                        color:'#fff'
                    },
                    top: '5%',
                    
                    
                },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        color:'#fff',
                        fontSize:fontSize
                    },
                    splitLine:{
                        lineStyle:{
                            opacity:0.5
                        }
 
                     }
                
                },
                series: series,
           
            };
           
 
               this.myChart.setOption(this.myOption);

      
     

    }
    render(){
        return(
            <div  ref="demo" className="ContentAnalyTrendLine" style={{visibility:'hidden'}}  >
            
            </div>
        )
    }
}
export default ContentAnalyTrendLine
ContentAnalyTrendLine.defaultProps = {
    freshRender:false,//重新播放图标动画
    // timestamp: ['Mon', '666', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series:{
       
    }
  
}