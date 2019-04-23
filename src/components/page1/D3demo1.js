import { TweenMax } from "gsap";

class D3demo1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            circleList:[{
                name:'circle',
                x:100,
                y:0
            }]
        }

    }
    componentDidMount(){
        var self = this;
  
   
        animate(5,todo)();
        function todo(times){
            // this.state.circleList.push({
            //     name:'circle',
            //     x:self.state.circleList[self.state.circleList.length-1].x+100,
            //     y:0
            // })
            let newArr = self.state.circleList.slice(0);
            newArr.push({
                name:'circle',
                x:self.state.circleList[self.state.circleList.length-1].x+100,
                y:0
            })
            this.setState({
                circleList:newArr
            })
            console.log(this.refs[this.state.circleList[times].name+times])
           console.log(this.state)

           let circle = ReactDOM.findDOMNode(this.refs[this.state.circleList[times].name+times])
           TweenMax.to(circle,1,{
               a 
           })
        }

        function animate(maxTimes = 5,_Fn){
            var times = 0;
            var setterTime;
            return function recal(){

                setterTime = setTimeout(()=>{
                    if(times>=maxTimes){
                        clearTimeout(setterTime);
                        return;
                    }
                
                    if(_Fn){
                        _Fn.apply(self,[times])
                    }
                    times++;
                    recal();
                },1000)
            }
        }
    }
    render(){
        return(
            <div>
                <svg width='500' height='400'>
                <g ref="circleGroup">
                    {
                        this.state.circleList.map((item,index)=>{
                            return <circle ref={item.name+index} r='50' cx={item.x} cy={item.y} style={{fill:'red'}} key={index}></circle>
                        })
                    }
                
                </g>
           
                </svg>
            </div>
        )
    }
}
export default D3demo1