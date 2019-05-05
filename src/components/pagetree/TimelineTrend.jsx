import './TimelineTrend.less'
import Power0, { TweenMax } from 'gsap'
 
 
class Bands extends React.Component{
    tl;
    constructor(props){
        super(props)
        this.state = {
            movedY:0,
            opacity:0,
            circleX:0,
            circleOpa:0
        }
    }
    componentWillReceiveProps(nextProps){
        let self = this;
        if(nextProps.freshRender === true && self.props.freshRender !== nextProps.freshRender){
   

            let newState = Object.create(null);
            newState.opacity = 0;
            newState.movedY = 0;
            newState.circleOpa = 0;
      
            self.setState({
                opacity:newState.opacity,
                movedY:newState.movedY,
                
                circleOpa:newState.circleOpa
            })
            if(self.props.moveDir === 0){
                gsap.TweenMax.to(newState,1,{
                    opacity:1,
             
                    onUpdate:()=>{
                      
                        self.setState({
                            opacity:newState.opacity,
                   
    
                        })
                    }
                })

            }else{
                if(self.props.moveDir%2 === 0){

                    gsap.TweenMax.to(newState,1,{
                        opacity:1,
                        movedY:-0.5,
                        circleOpa:1,
                        onUpdate:()=>{
                          
                            self.setState({
                                opacity:newState.opacity,
                                movedY:newState.movedY,
                                circleOpa:newState.circleOpa
        
                            })
                        }
                    })
                }else{
                    gsap.TweenMax.to(newState,1,{
                        opacity:1,
                        movedY:0.45,
                        circleOpa:1,
                        onUpdate:()=>{
                          
                            self.setState({
                                opacity:newState.opacity,
                                movedY:newState.movedY,
                                circleOpa:newState.circleOpa
        
                            })
                        }
                    })

                }
               

            }
         
           
            
         
  
        } 
        if(nextProps.freshRender === false ){
            let newState = Object.create(null);
            newState.opacity = 0;
            newState.movedY = 0;
            newState.circleOpa = 0;
            self.setState({
                opacity:newState.opacity,
                movedY:newState.movedY,
                circleOpa:newState.circleOpa
            })
        }
    }
    componentDidMount(){
        this.tl = new gsap.TimelineMax();
        var self = this;
     

        self.setState({
            opacity:0
        })
        // if(self.props.moveDir ===1){
        //     self.setState({
        //         movedY:0.2
        //     })

        // }
      //  console.log('moveDir=============>',this.props.moveDir)
    //   let _state = Object.create(this.state);
    //   let delayTime = this.props.moveDir;
    //   if(this.props.moveDir===0){
    //       self.setState({
    //           opacity:0,
    //           circleOpa:0,

    //       })
    //       this.tl.add(gsap.TweenMax.set(_state,{
    //             opacity:1,
    //         }),0);
    //         console.log('fuck')
    //       return;
    //   }
    //     if(this.props.moveDir%2===0){
          
    //         this.tl.add(gsap.TweenMax.set(_state,{
    //             movedY:-0.2
    //         }),delayTime);
    //         this.tl.add(gsap.TweenMax.to(_state ,1,{
    //             opacity:1,
    //             circleOpa:1,


    //             movedY:-0.4,
    //             onUpdate:()=>{
    //                 self.setState({
    //                     movedY:_state.movedY,
    //                     opacity:_state.opacity,
    //                     circleOpa:_state.circleOpa
    //                 })
    //             }
    //         }),delayTime);
          

    //     }else{
    //         this.tl.add(gsap.TweenMax.set(_state,{
    //             movedY:0.2,

    //         }),delayTime)
    //         this.tl.add(gsap.TweenMax.to(_state ,1,{
    //             opacity:1,
    //             movedY:0.4,
    //             circleOpa:1,
    //             onUpdate:()=>{
    //                 self.setState({
    //                     movedY:_state.movedY,
    //                     opacity:_state.opacity,
    //                     circleOpa:_state.circleOpa
    //                 })
    //             }
    //         }),delayTime);
    //     }
    }
    render(){
        return(
            <g>
            <circle r={this.props.fontSize*0.05} cx={this.props.x +this.props.fontSize*0.6 }  cy={this.props.fontSize*0.4} style={{fill:'#E97C31',opacity:this.state.circleOpa}}></circle>
            <image   x={this.props.x} y={this.state.movedY*this.props.fontSize} style={{opacity:this.state.opacity}}   xlinkHref={require(`../../img/pagetree/${this.props.imgName}.png`)} width={this.props.fontSize*1.44} height={this.props.fontSize*0.79}/>
        </g>
        )
    }
}

const TimerBox = (props)=>{
    var allTime = 300;
    var minutes,seconds,hours;
    if(allTime/(24*60) < 1){
        hours = allTime/(24*60)
    }
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
    tl;
 
    constructor(props){
        super(props);
        this.state = {
            x:11,
            lineMax:0,
            fontSize:12
        }
 
        
    }
 
    componentWillReceiveProps(nextProps,state){
 
       var self = this;
   
       if(nextProps.freshRender !== this.props.freshRender){
           console.log('时间轴更新了!!!')
           if(   self.tl ){
            // self.tl.pause(0)
           // self.tl.restart();
           }
           let newState = Object.create(null);
           newState.lineMax = 0;
           gsap.TweenMax.to(newState,4,{
               lineMax:self.props.fontSize*4,
               onUpdate:()=>{
                   self.setState({
                       lineMax:newState.lineMax
                   })
               }
           })

            
     
       }
 
   
    }
    componentWillUpdate(nextProps,state){
       let self = this;
        
        
 
   

        
    }
    
    componentDidMount(){
      
    }
    componentDidUpdate(){

    }
 
    render(){
        var self = this;
        return(
            <div className='TimelineTrend'>
            <svg ref='svgdemo' width='100%' height='100%'>
            <g>
             <line  x1="0" y1="0" x2={this.state.lineMax || 0} y2="0" style={{stroke:'#275CD1',strokeWidth:this.props.fontSize*0.02}} transform={`translate(${this.props.fontSize*1.8},${this.props.fontSize*2.55})`}></line>
            </g>
            
            <g className='gg'  transform={`translate(${0.45*this.props.fontSize},${2.16*this.props.fontSize})`}>
            {this.props.bandList.map((item,idx)=>{
                return (
                    <Bands freshRender={item.freshRender}   ref={'band'+idx} imgName={item.imgName} fontSize={this.props.fontSize} moveDir={idx} x={item.x*this.props.fontSize}   key={idx}/>
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
    fontSize:12,
    freshRender:false
}
Bands.defaultProps = {
    fontSize:12,
    circleX:100,
    freshRender:false
}
export default TimelineTrend;