import './index.less'
class UserAnalyTrendLine extends React.Component{
 
    constructor(props){
        super(props);
        this.myChart = null;
        this.myOption = null;
    }

    componentDidUpdate(){
        console.log('componentWillUpdate')
        var seriesData = Object.entries(this.props.series);
        var series = seriesData.map((item)=>{
            return {
                data:item[1],
                type: 'line',
                smooth:true,
                areaStyle: {}
            }
        })
        this.myOption.series = series;
        this.myChart.setOption(this.myOption);
        console.log(this.myOption,'mychart')
 
    }
    componentDidMount(){
     
        var self = this;
        this.myChart = Echarts.init(this.refs.demo);
        console.log('fuckk',this.props.series)
        var seriesData = Object.entries(this.props.series);
        var series = seriesData.map((item)=>{
            return {
                data:item[1],
                type: 'line',
                smooth:true,
                areaStyle: {}
            }
        })
        console.log('reerer',seriesData)


  
        setTimeout(()=>{ 
            var fontSize = parseInt(document.documentElement.style.fontSize)*0.2;
            this.myOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:self.props.timestamp,
                    axisLabel:{
                        color:'#fff',
                        fontSize:fontSize
                    }
                },
                yAxis: {
                    type: 'value',
                    nameTextStyle:{
                        color:'white'
                    }
                },
                series: series,
           
            };
           
            console.log('fontssss',fontSize)     
               this.myChart.setOption(this.myOption);
               this.myChart.resize();

            //    setTimeout(()=>{
            //        let option = self.myChart.getOption();
            //        self.myChart.clear();
            //     self.myChart.setOption(option);
            //    },2222)
        
        },1)

    }
    render(){
        return(
            <div ref="demo" className="UserAnalyTrendLine" >
            
            </div>
        )
    }
}
export default UserAnalyTrendLine
UserAnalyTrendLine.defaultProps = {
    timestamp: ['Mon', '666', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series:{
       
    }
  
}