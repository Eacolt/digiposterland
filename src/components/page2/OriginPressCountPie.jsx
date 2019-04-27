//发稿渠道占比;
 
class OriginPressCountPie extends React.Component{
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
       var seriesLegend = [],self= this;
       var seriresData = this.props.pressTypes.map((item)=>{
        let names = {
            news:['网站','#0E6DE9'],
            weibo:['微博','#AC4ED3'],
            wechat:['微信','#00AF6D'],
       
            app:['APP','#E6AF08'],
            epaper:['数字报','pink'],
            wemedia:['自媒体','brown']
        };
     
        seriesLegend.push(names[item.dataType][0])
    
        return{
            value:item.originalCount,
             name:names[item.dataType][0],
             color:names[item.dataType][1],
             label: false,
             labelLine:false
        }
    });
    self.chartOption.series[0].data=seriresData.sort(function (a, b) { return a.value - b.value; });
    self.chartOption.legend.data=seriesLegend;
    this.myChart.setOption(self.chartOption)
       if(nextprops.freshRender !== this.props.freshRender){
           let option = this.myChart.getOption();
          
           this.myChart.clear();
           this.myChart.setOption(option)
      }
   }
   componentDidUpdate(){
       setTimeout(()=>{  this.refs.demo.style.visibility = 'visible'
      },10)
   }
   componentDidMount(){
       var self = this,seriesLegend = [];
       self.myChart = Echarts.init(this.refs.demo);
       var seriresData = this.props.pressTypes.map((item)=>{
           let names = {
               news:['网站','#0E6DE9'],
               weibo:['微博','#AC4ED3'],
               wechat:['微信','#00AF6D'],
          
               app:['APP','#E6AF08'],
               epaper:['数字报','pink'],
               wemedia:['自媒体','brown']
           };
        
           seriesLegend.push(names[item.dataType][0])
       
           return{
               value:item.originalCount,
                name:names[item.dataType][0],
                color:names[item.dataType][1]
           }
       });
 
       self.chartOption = {

           tooltip : {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           legend: {
            orient: 'vertical',
            x: '70%',
            y:'middle',
            textStyle:{
                color:'#fff'
            },
            data:seriesLegend
        },
           
           series : [
               {
                   name:'访问来源',
                   type:'pie',
                   radius : ['15%','50%'],
                   center: ['40%', '50%'],
                   data:seriresData.sort(function (a, b) { return a.value - b.value; }),
               
                   label: false,
                   labelLine:false,
                   itemStyle: {
                       
                           color: function(item){
                         
                               return item.data.color
                        

                           },
                           shadowBlur: 200,
                           shadowColor: 'rgba(0, 0, 0, 0.5)'
                    
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
           <div ref="demo"  className='OriginPressCountPie' style={{visibility:'hidden'}}>
               
           </div>
       )
   }
}
export default OriginPressCountPie
OriginPressCountPie.defaultProps = {
    customClass:'OriginPressCountPie',
   pressTypes:[{
       "dataType": "news",
       "originalCount": "636"
   },
   {
       "dataType": "epaper",
       "originalCount": "50"
   },
   {
       "dataType": "wemedia",
       "originalCount": "133"
   },
   {
       "dataType": "app",
       "originalCount": "238"
   },
   {
       "dataType": "wechat",
       "originalCount": "322"
   },
   {
       "dataType": "weibo",
       "originalCount": "322"
   }
]
}