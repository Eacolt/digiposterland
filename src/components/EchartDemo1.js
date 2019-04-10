 
class EchartDemo1 extends React.Component{
    mychart;
    chartOption;
    constructor(props){
        super(props);
        this.state = {
            shown:this.props.shown
        }
    }
    componentWillReceiveProps(props){
        if(props.shown){
            this.myChart.clear();
            this.myChart.setOption(this.chartOption);
        }

    }
 
    componentDidMount(){
        this.myChart = Echarts.init(this.refs.demo);

        // 指定图表的配置项和数据
         this.chartOption = {
            // title: {
            //     text: 'ECharts 入门示例'
            // },
            // tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
       console.log(this.state.shown,'<<<<')

       
        this.myChart.setOption(this.chartOption);
        // let op = myChart.getOption();
    }
    render(){
        return(
            <div ref="demo" style={{display:'flex', width:'600px',height:'400px',display:this.props.shown===true?'block':'block'}}>
            </div>
        )
    }
}
export default EchartDemo1