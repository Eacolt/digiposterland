function autoScreen(){
                
    //判断是否有iframe:
    if(window.parent.document.getElementsByTagName('iframe').length>0){
        let iframeArr = window.parent.document.body.getElementsByTagName('iframe');
        for(let i=0;i<iframeArr.length;i++){
            if(iframeArr[i].src === window.location.href){
                console.log(iframeArr[i])
             //   console.log('sdf',iframeArr[i].width,iframeArr[i].height);
                let deviceW = iframeArr[i].width;
                let deviceH = iframeArr[i].height;
                function resize(){

                        let screen = deviceW/deviceH;
                        if(screen>1920/1080){
                            window.document.documentElement.style.fontSize = deviceH/1080*100+'px';
                        }else{
                            window.document.documentElement.style.fontSize = deviceW/1920*100+'px';
                        }
                        let app = document.getElementById('app');
                        let appH =parseInt(window.getComputedStyle(app,null).height);
                        let appW =parseInt(window.getComputedStyle(app,null).width);

                        let blackH = deviceH-appH;
                        let blackW = deviceW-appW;
                        let yScale = 1+blackH/appH;
                        let xScale = 1+blackW/appW;
                        console.log('xxxx',xScale)


                        app.style.setProperty('transform',`scaleX(${xScale}) scaleY(${yScale})`);

                        app.style.setProperty('transform-origin','0px 0px')
                    }
                    resize();
                    window.addEventListener('resize',resize);
  
            }
          
        }

        
    }else{

        //没有;
              function resize(){

                    let screen = document.documentElement.clientWidth/document.documentElement.clientHeight;
                    if(screen>1920/1080){
                        window.document.documentElement.style.fontSize = document.documentElement.clientHeight/1080*100+'px';
                    }else{
                        window.document.documentElement.style.fontSize = document.documentElement.clientWidth/1920*100+'px';
                    }
                    let app = document.getElementById('app');
                    let appH =parseInt(window.getComputedStyle(app,null).height);
                    let appW =parseInt(window.getComputedStyle(app,null).width);
                 
                    let blackH = document.documentElement.clientHeight-appH;
                    let blackW = document.documentElement.clientWidth-appW;
                    let yScale = 1+blackH/appH;
                    let xScale = 1+blackW/appW;
                    console.log('xxxx',xScale)
          
               
                    app.style.setProperty('transform',`scaleX(${xScale}) scaleY(${yScale})`);
                
                    app.style.setProperty('transform-origin','0px 0px')
                }
                resize();
                window.addEventListener('resize',resize);
    }


}
export default autoScreen;