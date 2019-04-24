class UserCounts extends React.Component{
	constructor(props){
		super(props);


	}
	componentDidMount(){
	 
	}
	render(){
		return(
			<div className="UserCounts">
			{

				this.props.kpiDataList.map((item,index)=>{
					let names;
					let icons;
					// "increaseUserCount": 1738,
					// "userCount": 8343,
					// "pressCount": 7343,
					// "originalCount": 4173
					switch(item[0]){
						case 'increaseUserCount':
						names = '净增用户数';
						icons = 'icon01'
						break;
						case 'userCount':
						names = '累计用户数';
						icons = 'icon02'
						break;
						case 'pressCount':
						names = '发稿用户数';
						icons = 'icon03'
						break;
						case 'originalCount':
						names = '原创用户数';
						icons = 'icon04'
						break;
						default:
						break;
					}
					return(
						<div className="items" key={index}>
						<div className="picture">
							<img  src={require('../../img/'+icons+'.png')} width='100%' height='100%'/>
						</div>
						<div className="number">{item[1]}</div>
						<div className="text">{names}</div>
					</div>
					)
				})
			}

			
	 
			</div>
		)
	}
}
export default UserCounts