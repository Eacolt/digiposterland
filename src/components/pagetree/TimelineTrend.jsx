import './TimelineTrend.less'
 
 
class Bands extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movedY:0,
            opacity:0
        }
    }
    componentDidMount(){
        var self = this;
      //  console.log('moveDir=============>',this.props.moveDir)
      let _state = Object.create(this.state);
      if(this.props.moveDir===0){
          self.setState({
              opacity:1
          })
          return;
      }
        if(this.props.moveDir%2===0){
          
             
            gsap.TweenMax.to(_state ,1,{
                opacity:1,


                movedY:-0.4,
                onUpdate:()=>{
                    self.setState({
                        movedY:_state.movedY,
                        opacity:_state.opacity
                    })
                }
            })
          

        }else{
            gsap.TweenMax.to(_state ,1,{
                opacity:1,
                movedY:0.4,
                onUpdate:()=>{
                    self.setState({
                        movedY:_state.movedY,
                        opacity:_state.opacity
                    })
                }
            })
        }
    }
    render(){
        return(
            <g>

            <image   x={this.props.x} y={this.state.movedY*this.props.fontSize} style={{opacity:this.state.opacity}}   xlinkHref={require('../../img/pagetree/kuai1.png')} width={this.props.fontSize*1.44} height={this.props.fontSize*0.79}/>
        </g>
        )
    }
}

const TimerBox = (props)=>{
    return(
        <div className='TimerBox'>
            <div className='HH'>1</div>
            <div className='H'>8</div>
            <div className='MM'>2</div>
            <div className='M'>1</div>
            <div className='SS'>2</div>
            <div className='S'>2</div>
        </div>
    )

}
class TimelineTrend extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {
            x:11
        }
 
        
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps,state){
     console.log(nextProps,'nextrproprs',state)
       var self = this;
    //    let n = this.state.x+1;
    //    this.setState({
    //        x:n
    //    })
       if(self.props.bandList.length !== nextProps.bandList.length){
           if(self.props.bandList.length%2 === 0){
               
           }
       }
   
    }
    componentWillUpdate(nextProps,state){
       let self = this;
     ///  this.state.x+=1;
        
 
   

        
    }
    componentDidUpdate(){

    }
 
    render(){
        var self = this;
        return(
            <div className='TimelineTrend'>
            <svg ref='svgdemo' width='100%' height='100%'>
            <g className='gg'  transform={`translate(${0.45*this.props.fontSize},${2.16*this.props.fontSize})`}>
            {this.props.bandList.map((item,idx)=>{
                return (
                    <Bands fontSize={this.props.fontSize} moveDir={idx} x={item.x*this.props.fontSize}   key={idx}/>
                )
            })}
            

            </g>
       
          
             
         
            </svg>
            <TimerBox/>
                
            </div>
        )
    }
}
TimelineTrend.defaultProps = {
    bandList:[{x:2}],
    fontSize:12
}
Bands.defaultProps = {
    fontSize:12,
    circleX:100
}
export default TimelineTrend;