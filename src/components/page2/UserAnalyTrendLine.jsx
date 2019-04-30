import './index.less'
class UserAnalyTrendLine extends React.Component{
 
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
            var legendName = []
            var series = seriesData.map((item)=>{
                let names = {
                    newsPressCount:'网站发稿量',
                    appPressCount:'APP发稿量',
                    weiboPressCount:'微博发稿量',
                    wechatPressCount:'微信发稿量'

                }
                legendName.push(names[item[0]])
                return {
                    name:names[item[0]],
                    data:item[1],
                    type: 'line',
                    smooth:true,
                    areaStyle: {}
                }
            })
            this.myOption.series = series;
            this.myOption.xAxis = Object.assign(this.myOption.xAxis,{
                data:self.props.timestamp,
            });
            legendName = legendName.map((item)=>{
                return {
                    name:item,
                    icon:'roundRect'
                }
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
            <div  ref="demo" className="UserAnalyTrendLine" style={{visibility:'hidden'}}  >
            
            </div>
        )
    }
}
export default UserAnalyTrendLine
UserAnalyTrendLine.defaultProps = {
    freshRender:false,//重新播放图标动画
    // timestamp: ['Mon', '666', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series:{
       
    }
  
}