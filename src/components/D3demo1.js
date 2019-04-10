class D3demo1 extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            svgWidth:500,
            svgHeight:400
        }
    }
    componentDidMount(){
        let self = this;
        let chartData = [120,200,300,100,55,200]
        let svgdemo = this.refs.svgdemo;
        let mysvg = D3.select(svgdemo).append('svg').attr('width',this.state.svgWidth).attr('height',this.state.svgHeight);

   
         //let tr = D3.select(svgdemo)
        //  myrect.each(function(d,i,nodes){
        //      D3.select(nodes[i].parentNode).append('text').text('haha')
        //      .attr('x',)
        //  });

         let xScale = D3.scaleBand();
         xScale.domain(D3.range(0,chartData.length))
         xScale.range([0,250])
         let yScale = D3.scaleLinear()
                        .domain([100,0])
                        .range([0,300]);
        

        let xAxis = D3.axisBottom(xScale);
        let yAxis = D3.axisLeft(yScale);
        let gxAxios = mysvg.append('g')
                           .attr('transform',`translate(100,${self.state.svgHeight-20})`)
                           
                            .call(xAxis);

        let gyAxios = mysvg.append('g')
        .attr('transform',`translate(100,80)`)
        
            .call(yAxis);

            //创建柱状图;
            
            //let dataSets = [30,33,44,55,66,73]
           yScale.domain([0,300]);
           xScale.paddingOuter(0.1)
            let rects = mysvg.selectAll('.MyRect')
                                .data(chartData)
                                .enter()
                                .append('rect')
                                .attr('class','MyRect')
                                .attr('transform','translate(103,30)')
                                .attr('x',function(d,i){
                                    return xScale(i);
                                })
                                .attr('y',function(d,i){
                                    return  self.state.svgWidth - 150 - yScale(d)
                                })
                                .attr('width',function(){
                                    return xScale.bandwidth()-4;
                                })
                                .attr('height',function(d){
                                    return yScale(d)
                                })
                                console.log('....xScale',xScale.bandWidth)

                    
                 //   this.createAnime();
         
                // .selectAll('tr')
                // .data([1,2,3,4])
                // .enter()
                // .append('tr')
    }
    createAnime(){
        let svgdom = D3.select(this.refs.svgani).append('svg').attr('width',300).attr('height',300)
        .attr('class','svgAnimeContainer');
        let gCircle = svgdom.append('circle').attr('r',30)
                      .attr('class','MyCircle')
                    
                      console.log(gCircle._groups[0][0],'gCircle')

        
             

    }
    render(){
        return (
        <div style={{display:'flex',height:'400px'}}>
        <div ref='svgdemo' className='lala'>



        </div>
        <div ref='svgani' style={{background:'blue'}}></div>
        </div>
           
        )
     
    }
}
export default D3demo1