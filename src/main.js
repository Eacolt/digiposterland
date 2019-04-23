import '@css/App.css'
import App from './components/App.js'
import autoScreen from './components/util/autoScreen'

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
 
window.addEventListener('load',function d(){
    autoScreen();
    document.getElementById('app').style.setProperty('visibility','visible')
})