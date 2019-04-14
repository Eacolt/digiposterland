class SubComponent extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentWillReceiveProps(){
       console.log('孙子接受父亲的props更新')
    }
    render(){
        console.log('孙子渲染啦')
        
        return(
            <div>sdf</div>
        )
    }
}

class D3react extends React.Component{
    svgdemo_d3;
    gxAxis_cta;
    gyAxis_cta;
    xScale_d3;
    yScale_d3;
    xAxis_d3;
    yAxis_d3;
 
    gxAxis_d3;
    gyAxis_d3;
    gRectCta;

    //上一个坐标数值;
    old_rectHeight=[];
    old_rectY=[];

    constructor(props){
        super(props)
        this.state = {
            svgHeight:400,
            svgWidth:500,
           
        }
    }
    componentWillReceiveProps(nextProp){

        console.log('儿子组件收到消息',nextProp)
        console.log(this.gRectCta.selectAll('rect').nodes)

        // this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
        //     D3.select(nodes[i]).transition().attr('height', this.yScale_d3(this.props.datas[i]))
        // })
    }
    
    componentDidMount(){
        let self = this;
        console.log('初始化成功')
        this.svgdemo_d3 = D3.select(this.refs.svgdemo);
        this.gRectCta = D3.select(this.refs.gRectCta);

          this.yScale_d3 = D3.scaleLinear();
        // this.yScale_d3.domain([0,100]).range([0,300]);
        // this.yAxis_d3 = D3.axisLeft(this.yScale_d3);

        this.xScale_d3 = D3.scaleBand();
        //  this.xScale_d3 = D3.scaleOrdinal().domain([0,1,2,3,4]).range([0,50,100,150,200]);
         this.gyAxis_cta = D3.select(this.refs.gyAxis).attr('transform',`translate(100,20)`)
         this.gxAxis_cta = D3.select(this.refs.gxAxis).attr('transform',`translate(100,${self.state.svgHeight-20})`);
         this.gxAxis_d3 = this.gxAxis_cta.append('g');

       // this.gxAxis_d3 = D3.scaleLinear().domain([0,5]).range([0,250]);
       //  console.log('>>>',  this.xScale_d3(3))
      this.updateXAxis();

      setTimeout(()=>{
          console.log('儿子要更新一次！');
          this.setState({})
      },3000)
    this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
        D3.select(nodes[i]).transition().attr('height', this.yScale_d3(self.props.datas[i]))
    })
   let mybox  = D3.select(this.refs.mybox);
   mybox.attr('x','200').attr('y',100).attr('fill','red')
   .attr('width','22').attr('height',22);

    var gArc_d3  = D3.select(this.refs.myArc);
    var arcData = [
        {label: 'A', startAngle: 0, endAngle: 0.2},
        {label: 'B', startAngle: 0.2, endAngle: 0.6},
        {label: 'C', startAngle: 0.6, endAngle: 1.4},
        {label: 'D', startAngle: 1.4, endAngle: 3},
        {label: 'E', startAngle: 3, endAngle: 2* Math.PI}
    ];
    function Arc(){
       function arc(){
           buffer = 111;
       }
       arc.radius = 100;
       return arc;
    }
    let meArc = Arc();

   console.log(meArc.radius,'<<<')
 
    var arcGenerator = D3.arc()
    .innerRadius(20)
    .outerRadius(100)
    .cornerRadius(4)
    .padAngle(0.06)
    //console.log('arGGGG',arcGenerator)
    // var arcGenerator = arc({
    //     innerRadius: 20,
    //     outerRadius: 100,
    //     startAngle: 0,
    //     endAngle: Math.PI*2
    // });
    console.log('......>>>',arcGenerator)
    gArc_d3.selectAll('path')
    .data(arcData)
    .enter()
    .append('path')
    .attr('d',arcGenerator);
    // .attr('fill-opacity',0.4)
   gArc_d3.attr('transform','rotate(0,100,100)')

     gArc_d3.transition()
     .attr('transform','rotate(-90,100,100)')
     .duration(1000)
 
  
//    .attr('fill-opacity',1)
//    .duration(1000);

// gArc_d3.attr('transform','translate(200,300)')
//  .attr('dx','0')
//    gsap.TweenMax.to(this.refs.myArc,6,{
 
//        opacity:'0.2',
//        transform:'translate(330,0)'
//    })
   console.log(gsap.TweenMax,'TweenMax')
    // gArc_d3.attr('d',arcGenerator)
    // gArc_d3.call(arc)
  

//    setTimeout(()=>{
//        console.log('mybox attr',mybox.attr('y'));
//        mybox.transition().attr('height',200)
//        .attr('y',100-200+22)
//    },2000)
    }
    updateXAxis(){
        if(!this.svgdemo_d3)return;
        let self = this;
        if(this.gxAxis_cta){
            this.gxAxis_cta.selectAll('*').remove();
            this.gyAxis_cta.selectAll('*').remove();
        }
        // this.yScale_d3.domain([0,100])
                // this.yScale_d3 = D3.scaleLinear();
                this.yScale_d3.domain([100,0]).range([0,300]);
                this.yAxis_d3 = D3.axisLeft(this.yScale_d3);


             
                this.xScale_d3.domain(D3.range(0,self.props.datas.length)).range([0,250]);
                this.xAxis_d3 = D3.axisBottom(this.xScale_d3);



 
            this.gxAxis_d3 = this.gxAxis_cta.append('g');
            this.gyAxis_d3 = this.gyAxis_cta.append('g');

          



            this.gxAxis_d3.call(this.xAxis_d3)
            this.gyAxis_d3.call(this.yAxis_d3);
          
           this.yScale_d3.domain([0,100]) 
    
        //    let allRect =  this.gRectCta.selectAll('rect').data(self.props.datas);
            // allRect.enter().append('rect').attr('class','MyRect')
 
            // .attr('transform','translate(103,30)')
            // .attr('x',function(d,i){
            //     return xScale(i);
            // })
            // .attr('y',function(d,i){
            //     return  self.state.svgWidth - 150 - yScale(d)
            // })
            // .attr('width',function(){
            //     return xScale.bandwidth()-4;
            // })
            // .attr('height',function(d){
            //     return yScale(d)
            // })

            // this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
            //     D3.select(nodes[i]).transition().attr('height', this.yScale_d3(self.props.datas[i]))
            // })
    }


   
    componentDidUpdate(){
        let self = this;
        // console.log(  D3.select(nodes[i]).transition().attr)
        // if(!this.old_rectHeight){
        //     self.old_rectHeight = [];
        //     self.old_rectY = [];
        //     this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
        //         // D3.select(nodes[i]).transition().attr('height', this.yScale_d3(this.props.datas[i]))
        //         // .attr('y', 0- this.yScale_d3(this.props.datas[i]))
        //         self.old_rectHeight[i] =  this.yScale_d3(this.props.datas[i])
        //         self.old_rectY[i] = 0- this.yScale_d3(this.props.datas[i])
    
        //     })
        // }else{
        //     this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
        //         D3.select(nodes[i]).attr('height',  self.old_rectHeight[i])
        //         .attr('y',self.old_rectY[i])
    
    
        //     })
        // }

     // if(self.old_rectHeight.length>0){
        this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
            D3.select(nodes[i]).attr('height',  self.old_rectHeight[i] || '1')
            .attr('y',self.old_rectY[i] ||  D3.select(nodes[i]).attr('y') )


        })
    //  }

    this.gRectCta.selectAll('rect').each((d,i,nodes)=>{
        setTimeout(()=>{
            D3.select(nodes[i]).transition().attr('height', this.yScale_d3(this.props.datas[i]))
            .attr('y', 0- this.yScale_d3(this.props.datas[i]))
            self.old_rectHeight[i] = this.yScale_d3(this.props.datas[i]);
            self.old_rectY[i] =  0- this.yScale_d3(this.props.datas[i])
        },i*100)
       

        });



    }
    render(){
        this.updateXAxis();


        const AA = (props)=>{
          let a =  this.props.datas.map((item,index)=>{
                let mh = this.yScale_d3(item);

            return ( <rect x={this.xScale_d3(index)}
             width={this.xScale_d3.bandwidth()-4}
             
             
     
              className='MyRect' key={index}></rect>)
        });

return a;
        }
      
        return (
            <div style={{display:'flex',height:'400px',alignItems:'center'}}>
            <svg ref='svgdemo' width='500' height='400'>
                <g ref='gxAxis'>
                   
                
                </g>
                <g ref='gyAxis'>
                   
                
                   </g>
                <g ref='gRectCta' transform = {`translate(103,${this.state.svgHeight-40})`}>
                    {
                        
                        this.svgdemo_d3 && <AA/>
                    
                    }
                </g>

                <rect ref='mybox'></rect>
                <g  ref='myArc'></g>
              
            </svg>
            
        </div>
        )

    }
}
export default D3react;