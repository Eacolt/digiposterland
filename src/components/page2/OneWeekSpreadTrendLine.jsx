//近一周融合传播：
class OneWeekSpreadTrendLine extends React.Component{
    myChart;
    myOption;
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(){
        this.refs.demo.style.visibility = 'hidden';
    }
    componentWillUpdate(nextprops){
        let self = this;
        this.myChart.resize();
        // this.refs.demo.style.visibility = 'hidden'
          if(this.myOption){
            var seriesData = Object.entries(this.props.series);
            var series = seriesData.map((item)=>{
                console.log('..',item)
                return {
                    data:item[1],
                    type: 'line',
                    smooth:true,
                    lineStyle:{
                        color:'#FB9B04'
                    }
                   
                }
            })
            this.myOption.series = series;
            
            // console.log('updddd self.props.timestamp',self.props.timestamp)
            let newOption = Object.assign( this.myOption,{
                xAxis: {
                    data:self.props.timestamp,
               
                },
            })
        
            this.myChart.setOption(newOption);
 
 

            if(nextprops.freshRender !== this.props.freshRender){
                 let _newOption = this.myChart.getOption();
                 this.myChart.clear();
                 this.myChart.setOption(_newOption)
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
 
       
 
        var seriesData = Object.entries(this.props.series);
        var fontSize = parseInt(document.documentElement.style.fontSize)*0.2;

        console.log('capcap',seriesData)
        var series = seriesData.map((item)=>{
            return {
                data:item[1],
                type: 'line',
                smooth:true,
                lineStyle:{
                    color:'#FB9B04'
                }
               
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
            <div ref='demo' className="OneWeekSpreadTrendLine" style={{visibility:'hidden'}}>
               
            </div>
        )
    }
}
export default OneWeekSpreadTrendLine;
OneWeekSpreadTrendLine.defaultProps = {
    series:[]
}