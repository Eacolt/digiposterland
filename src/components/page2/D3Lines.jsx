
class D3Lines extends React.Component{
    mysvg;
    gxAxis;
    gyAxis;
 
    xAxis;
    yAxis;
    yScale;
    xScale;

    linepath;
    lines;
    constructor(props){
        super(props)

 
    }
    componentDidMount(){
        this.mysvg = D3.select(this.refs.mysvg);
        this.xScale = D3.scaleBand().domain(D3.range(0, this.props.datas.length)).range([0,this.props.svgWidth-50]);
        this.yScale = D3.scaleLinear().domain([100,0]).range([0,this.props.svgHeight])

        this.xAxis = D3.axisBottom(this.xScale);
        this.yAxis = D3.axisLeft(this.yScale);
        this.gxAxis = this.mysvg.select('g.xAxis');
        this.gyAxis = this.mysvg.select('g.yAxis');
        this.gxAxis.call(this.xAxis)
        this.gyAxis.call(this.yAxis);



        // this.linepath = this.mysvg.select('path');
        // this.lines = D3.line();

        // this.linepath.datum(this.props.datas).attr('d',function(d,i,notes){
        //     console.log(d)
        // })
        this.yScale.domain([0,100])

        var lineGenerator = D3.line()
        .x((d)=>{
            console.log(d)
            return  d[0]
        })
        .y((d)=>{
            console.log(this.yScale(d[1]))
            return this.props.svgHeight-this.yScale(d[1])
        });
        // var pathData = lineGenerator(points);
        //    D3.select(this.refs.myArc).append('path')
        // this.mysvg.select('.myline').datum(this.props.datas).append('path')
        this.mysvg.select('.myline').select('path')
   .attr('d', lineGenerator(this.props.datas))
// .attr('d', lineGenerator(points))
  .attr('stroke-width','2')
  .attr('stroke','blue')
  .attr('fill','none')

  

        // this.linepath.attr('d',this.lines(this.props.datas))
        // .attr('stroke-width','2')
        // .attr('stroke','blue')
        // .attr('fill','none')

       
    
        

        // this.xAxis = D3.

    }
    render(){
        return(<div>
            <svg ref='mysvg' transform='translate(20,0)' width={this.props.svgWidth} height={this.props.svgHeight}>
               <g className='xAxis' ref='xAxis' transform={`translate(30,${this.props.svgHeight-20})`}>
                
               
               </g> 
               <g className='yAxis'  transform={`translate(30,${0})`}>
                

                </g> 
                <g className='myline'>
                <path></path>
                </g>
           
            </svg>


        </div>)
    }
}
D3Lines.defaultProps = {
     datas : [
        [0, 80],
        [100, 100],
        [170, 30],
        [258, 50],
        [300, 40],
        [380, 80]
      ],
    svgWidth:500,
    svgHeight:400
}
D3Lines.propTypes = {
    datas:PropTypes.array,
    svgWidth:PropTypes.number,
    svgHeight:PropTypes.number
 
}
export default D3Lines;