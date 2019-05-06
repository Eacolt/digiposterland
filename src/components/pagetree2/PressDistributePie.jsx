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
            this.myChart.resize();
            this.myChart.clear();
       
        }
    }
    componentWillUpdate(nextProps){
        let self = this;
        if(nextProps.freshRender !== this.props.freshRender){
            this.setState({
                visibility:true
            })
 
            let legendNames = [];
            let pressTypes = this.props.pressTypes.pressTypes.map((item,index)=>{

                let _names = {
                    news:['网站','#00A1E4'],
                    wechat:['微信','#24C768'],
                    webo:['微博','#ECB100'],
                    app:['APP','#FF7E00'],
                    epaper:['数字报','#FFFFFF'],
                    wemedia:['自媒体','#ECB100']

                }
           
                legendNames.push({
                  name:_names[item.dataType][0],
                  icon:'roundRect'
                })
                return{
                    value:item.forwardCount, 
                    name:_names[item.dataType][0],
                    itemStyle:{
                        color:_names[item.dataType][1]
                    }
                  
                }
            })
            this.myOption.legend.data = legendNames;
            this.myOption.series.data = pressTypes;


            this.myOption.legend.formatter =  function(name){
 
                let mount = 0,idx = 0;
                for(let i=0;i<self.myOption.series.data.length;i++){
                    mount+=Number(self.myOption.series.data[i].value)
                }
                self.myOption.series.data.forEach((item,index)=>{
                    if(item.name === name){
                        idx = index;
                    }
                })
                return name+'  '+ (self.myOption.series.data[idx].value/mount*100).toFixed(2)+'%';
            }


   
   
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
                    radius : ['15%','54%'],
                    center: ['30%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    // roseType:'radius',
                    
                    labelLine:false,
                    label:false,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
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