const Title =  (props)=>{
    var _style={
        position:'absolute',
        left:'1.1rem',
        top:'0.2rem',
        color:'white',
        fontSize:'0.3rem'

    }
    return(
        <div style={_style}>{props.text}</div>
    )
}
export default Title;
Title.defaultProps={
    text:'重要报告监督'
}