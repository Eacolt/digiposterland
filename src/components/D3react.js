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

   
   setTimeout(()=>{
       console.log('mybox attr',mybox.attr('y'));
       mybox.transition().attr('height',200)
       .attr('y',100-200+22)
   },2000)
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
    componentWillUpdate(){
        let self = this;
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
            </svg>
            
        </div>
        )

    }
}
export default D3react;