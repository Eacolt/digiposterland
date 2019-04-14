 import mypic from '../../assets/img/sdf.jpg'
class EchartDemo1 extends React.Component{
    mychart;
    chartOption;
    myData;
    constructor(props){
        super(props);
        this.myData = [10,30,41,100];//[20,44,50,64];
        this.newData = [22,55,33,77];
        this.state = {
            shown:this.props.shown
        }
    }
    componentWillReceiveProps(props){
        // if(props.shown){
        //     let oldOption = this.myChart.getOption();
        //     oldOption.series[0].data = this.newData;
        //     this.myChart.clear();
        //     this.myChart.setOption(oldOption);
        // }

    }
 
    componentDidMount(){
        let self =this;
    
        this.myChart = Echarts.init(this.refs.demo,null,{
            renderer:'svg'
        });

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
            // series: [{
            //     name: '销量',
            //     type: 'custom',
            //     id:'xhyy',
            //     data: self.myData,
                
            //     renderItem:function(params,api){
            //         console.log('我的唯独:',api.coord([api.value(0),api.value(1)]));
            //         console.log("params",params)
            //         console.log('api',api)
            //         let coords = api.coord([api.value(0),api.value(1)]);
            //         return {
            //             type:'rect',
            //             shape: {
            //                 x: coords[0]-20, y: coords[1], width: 60, height: 100
            //             },
            //             style:api.style()
            //         }
            //     }
        
 

 
            // }],


            series: [{
                name: '销量',
                type: 'bar',
                data: self.myData,
                id:'mybar',
              
                itemStyle: {
                    color:{}

               
           
 
                  
                },
                animationDelay: function (idx) {
                    return idx * 100;
                }
 

 
            }],
         
          
        };

        // 使用刚指定的配置项和数据显示图表。
       console.log(Echarts,'<<<<Ecart')

                    var myimg = new Image();
                        myimg.src = mypic;
                        myimg.onload = function(){
                                document.body.appendChild(myimg)
                                       let oldOption = self.myChart.getOption();
                                       oldOption.series[0].itemStyle.color = {
                                           image:  myimg,
                                           repeat:'repeat'
                                       }
                                    self.myChart.setOption(oldOption)
                         
    
                        }
        this.myChart.setOption(this.chartOption);

        console.log('myOptons',this.chartOption)
        // let op = myChart.getOption();

         
    }
  
    render(){
       // const imgsrc = '../assets/img/recttexture.jpg'
     
        return(
            <div ref="demo" style={{display:'flex', width:'600px',height:'400px',display:this.props.shown===true?'block':'block'}}>
            {/* <img id="myIImg" ref='myimg' src='public/img/recttexture.jpg' /> */}
              {/* <div className='showPic' style={{position:'relative',width:'100px',height:'100px' }}></div> */}
            </div>
        )
    }
}
export default EchartDemo1