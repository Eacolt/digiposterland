import './TreeSpineList.less'
class TreeSpineList extends React.Component{
    tl;
    constructor(props){
        super(props);
        this.state = {
          
            lists:[
                
            ]
        }
    }
 
    componentWillReceiveProps(nextProps){
        var self = this;
     
        if(this.props.series.length>0 && this.state.lists.length===0){
            let newarr = this.props.series.map((item)=>{
                return {
                    opacity:0
                }
            });

 
            self.setState({
                lists:newarr
            });
 

            this.tl = new gsap.TimelineMax();
 
            this.tl.add(function(){
                let newarr = self.state.lists.slice(0);
                newarr.forEach((item)=>{
                    item.opacity = 0;
                })
            },2.55)
            this.tl.add(delay.bind(this,4),'+=0')
            this.tl.add(delay.bind(this,3),'+=0.7')
            this.tl.add(delay.bind(this,2),'+=0.7')
            this.tl.add(delay.bind(this,1),'+=0.7')
            this.tl.add(delay.bind(this,0),'+=0.5 ')
            this.tl.pause(0)
 
 
            function delay(i){
                let newarr= self.state.lists.slice(0);
               // newarr[i].opacity = 1;
                gsap.TweenMax.to(newarr[i],1,{
                    opacity:1,
                    onUpdate:()=>{
                    
                        self.setState({
                            lists:newarr
 
                        })

                    }
                })
           
 
            }
        }
        if(this.state.lists.length>0){
            if(nextProps.freshRender !== this.props.freshRender){
               
              
 
                let newarr= self.state.lists.slice(0);
                newarr.forEach((item)=>{
                    item.opacity = 0;
                })
   
           
            
                 self.setState({
                    lists:newarr

                })
                self.tl.restart();
                // setTimeout(()=>{
                //     self.tl.restart();
                // },1000)


             
        
            }
        }
 
    }
    componentDidMount(){
       

    }
    componentWillUpdate(nextProps,nextState){

        //console.log('让哪一个求求滚动',JSON.stringify(nextState.lists));
    }
    shouldComponentUpdate(nextProps){
 
 
        return true;
    }
 
 
    render(){
 

        return(
            <div className='TreeSpineList'>

            {
                this.state.lists.length>0 && this.props.series.map((item,index)=>{
               
                    return (
                        <div className={'step'+(index+1)} key={index} style={{opacity:this.state.lists[index].opacity}}  >
                            <div className='title'>{item.title}</div>
                            <div className='pubtime'>{item.pubtime}</div>
                       </div>
                    )
                })
            }
                
            </div>
        )
    }
}
TreeSpineList.defaultProps={
    series:[
        {
            title:'',
            pubtime:'23'
        }
    ],
    freshRender:false
}
export default TreeSpineList;