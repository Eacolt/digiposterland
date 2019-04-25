//发稿渠道占比;
 
class PressCountRatioPie extends React.Component{
    chartOption;
    myChart;
   constructor(props){
       super(props)
   }
   componentWillReceiveProps(){
       this.refs.demo.style.visibility = 'hidden'
   }
   componentWillUpdate(nextprops){
       this.myChart.resize();
       if(nextprops.freshRender !== this.props.freshRender){
           let _newOption = this.myChart.getOption();
           this.myChart.clear();
           this.myChart.setOption(_newOption)
      }
   }
   componentDidUpdate(){
       setTimeout(()=>{  this.refs.demo.style.visibility = 'visible'
       console.log('updatedd..')},10)
   }
   componentDidMount(){
       var self = this;
       self.myChart = Echarts.init(this.refs.demo);
       var seriresData = this.props.pressTypes.map((item)=>{
           let names;
       
           return{
               value:item.pressCount,
                name:item.dataType
           }
       });
       var seriesLegend = this.props.pressTypes.map((item)=>{
  
        return item.dataType
    })
       self.chartOption = {
          
       
       
       
           tooltip : {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           legend: {
            orient: 'vertical',
            x: 'right',
            data:seriesLegend
        },
           visualMap: {
               show: false,
               min: 80,
               max: 600,
               inRange: {
                   colorLightness: [0, 1]
               }
           },
           series : [
               {
                   name:'访问来源',
                   type:'pie',
                   radius : [25,80],
                   center: [159, 180],
                   data:seriresData.sort(function (a, b) { return a.value - b.value; }),
               
                   label: {
                       normal: {
                           textStyle: {
                               color: '#fff'
                           }
                       }
                   },
                   labelLine: {
                       normal: {
                           lineStyle: {
                               color: 'rgba(255, 255, 255, 0.3)'
                           },
                           smooth: 0.2,
                           length: 10,
                           length2: 20
                       }
                   },
                   itemStyle: {
                       normal: {
                           color: '#c23531',
                           shadowBlur: 200,
                           shadowColor: 'rgba(0, 0, 0, 0.5)'
                       }
                   },
       
                   // animationType: 'scale',
                   // animationEasing: 'elasticOut',
                   // animationDelay: function (idx) {
                   //     return Math.random() * 200;
                   // }
               }
           ]
       };
       self.myChart.setOption(self.chartOption)
   }
   render(){
       return(
           <div ref="demo"  className="PressCountRatioPie" style={{visibility:'hidden'}}>
               
           </div>
       )
   }
}
export default PressCountRatioPie
PressCountRatioPie.defaultProps = {
   pressTypes:[{
       "dataType": "news",
       "pressCount": "636"
   },
   {
       "dataType": "epaper",
       "pressCount": "50"
   },
   {
       "dataType": "wemedia",
       "pressCount": "133"
   },
   {
       "dataType": "app",
       "pressCount": "238"
   },
   {
       "dataType": "wechat",
       "pressCount": "322"
   },
   {
       "dataType": "weibo",
       "pressCount": "322"
   }
]
}