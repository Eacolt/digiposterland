import './PressDistributePie.less'
class PressDistributePie extends React.Component{
    myChart;
    myOption;
    constructor(props){
        super(props);
        this.state = {
            visibility:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.freshRender !== this.props.freshRender){
            this.setState({
                visibility:true
            })
        }
    }
    componentWillUpdate(nextProps){
        this.myChart.resize();
        if(nextProps.freshRender !== this.props.freshRender){
 
            let legendNames = [];
            let pressTypes = this.props.pressTypes.pressTypes.map((item,index)=>{

                let _names = {
                    news:'网站',
                    wechat:'微信',
                    webo:'微博',
                    app:'APP',
                    epaper:'数字报',
                    wemedia:'自媒体'

                }
           
                legendNames.push({
                  name:_names[item.dataType],
                  icon:'roundRect'
                })
                return{
                    value:item.forwardCount, 
                    name:_names[item.dataType]
                }
            })
            this.myOption.legend.data = legendNames;
            this.myOption.series.data = pressTypes;
   
            this.myChart.clear();
            this.myChart.setOption(this.myOption)
            console.log('DOOOO')
        }
    }
    componentDidMount(){
        this.myChart = Echarts.init(this.refs.demo);
        this.myOption = {
            legend:{
                orient:'vertical',
                top:'middle',
                right:'15%',
                textStyle:{
                    color:'#fff',
                },
                data:[
                    {
                        name:'直接访问',
                        icon:'roundRect'

                    },
                    {
                        name:'邮件营销',
                        icon:'roundRect'

                    },
                    {
                        name:'直接访问',
                        icon:'roundRect'

                    },
                    {
                        name:'直接访问',
                        icon:'roundRect'

                    }
                ]
            },
            series : {
                    name: '访问来源',
                    type: 'pie',
                    radius : [30,60],
                    center: ['30%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    
                    labelLine:false,
                    label:false,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
        }
        this.myChart.setOption(this.myOption);
    }
    render(){
        return(
            <div className="PressDistributePie" ref='demo' style={{visibility:this.state.visibility===true?'visible':'hidden'}}></div>
        )
    }
}
PressDistributePie.defaultProps = {
    freshRender:false
}
export default PressDistributePie