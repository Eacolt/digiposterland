class D3demo1 extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let datas = [120,200,300,100]
        let svgdemo = this.refs.svgdemo;
        let mysvg = D3.select(svgdemo).append('svg').attr('width',500).attr('height',400);
        mysvg
        .attr('class','MyRect')
        .selectAll('.MyRect')
            .data(datas)
            .enter()
            .append('rect')
            .attr('x',function(d,i){
                return 120+35*i
            })
            .attr('y',function(d,i){
                return 400-d
            })
          
            .attr('width',30)
            .attr('height',function(d,i){
                return d
            })
    }
    render(){
        return (
 
            <div ref='svgdemo'>



            </div>
        )
     
    }
}
export default D3demo1