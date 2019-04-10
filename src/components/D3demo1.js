class D3demo1 extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            svgWidth:500,
            svgHeight:450
        }
    }
    componentDidMount(){
        let self = this;
        let datas = [120,200,300,100]
        let svgdemo = this.refs.svgdemo;
        let mysvg = D3.select(svgdemo).append('svg').attr('width',this.state.svgWidth).attr('height',this.state.svgHeight);

        
        let myrect = mysvg.selectAll()
            .data(datas)
            .enter()
            .append('rect')
            .attr('class','MyRect')
            .attr('x',function(d,i){
                return 120+35*i
            })
            .attr('y',function(d,i){
                return self.state.svgHeight-d
            })
          
            .attr('width',30)
            .attr('height',function(d,i){
                return d
            });
            console.log(myrect)
         //let tr = D3.select(svgdemo)
        //  myrect.each(function(d,i,nodes){
        //      D3.select(nodes[i].parentNode).append('text').text('haha')
        //      .attr('x',)
        //  });

         let scaleOrdinal = D3.scaleOrdinal()
                            .domain([0,1,2,3,4,5])
                            .range([100,150,200,250,300,350])

         let linear = D3.scaleLinear()
                        .domain([100,0])
                        .range([0,300]);
        console.log(linear(50),scaleOrdinal(2))

        let xAxis = D3.axisBottom(scaleOrdinal);
        let yAxis = D3.axisLeft(linear);
        let gxAxios = mysvg.append('g')
                           .attr('transform',`translate(0,${self.state.svgHeight-20})`)
                           
                            .call(xAxis);

        let gyAxios = mysvg.append('g')
        .attr('transform',`translate(100,130)`)
        
            .call(yAxis);
                    
                    this.createAnime();
         
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
        <div style={{display:'flex'}}>
        <div ref='svgdemo' className='lala'>



        </div>
        <div ref='svgani'></div>
        </div>
           
        )
     
    }
}
export default D3demo1