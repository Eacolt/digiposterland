
import 'pixi-spine'
import * as baseUrl from './utils.js'
import App from './components/App.jsx'
import autoScreen from './components/util/autoScreen'

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
 
window.addEventListener('DOMContentLoaded',function d(){
    autoScreen();
    document.getElementById('app').style.setProperty('visibility','visible')
})