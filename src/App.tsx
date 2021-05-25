import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host('ws://localhost:8080')

// Expose the `sayHelloJS` function to Python as `say_hello_js`
function sayHelloJS(x: any) {
    console.log('Hello from ' + x)
}

// WARN: must use window.eel to keep parse-able eel.expose{...}
window.eel.expose(sayHelloJS, 'say_hello_js')

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg: string) {
    console.log(msg)
}

window.eel.expose(show_log, 'show_log')

// Test calling sayHelloJS, then call the corresponding Python function
sayHelloJS('Javascript World!')
eel.say_hello_py('Javascript World!')

// Set the default path. Would be a text input, but this is a basic example after all
const defPath = '~'

interface IAppState {
    message: string
    path: string
}


export class MainMenu extends Component<{}, {}> {
    public state: IAppState = {
        message: "temp",
        path: "patterns"
    }

    public getPatterns = () => {
        console.log("getPatterns called!")
        eel.get_patterns()((message: string) => this.setState({message}))
    }

    public render() {
        return (
            <div>
                temp lul
            </div>
        )
    }
}


export class App extends Component<{}, {}> {
    public state: IAppState = {
        message: `Click button to choose a random file from the user's system`,
        path: defPath,
    }

    public pickFile = () => {
        eel.pick_file(defPath)((message: string) => this.setState({message}))
    }

    public render() {
        eel.expand_user(defPath)((path: string) => this.setState({path}))
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>{this.state.message}</p>
                    <button className='App-button' onClick={this.pickFile}>Pick Random Pile From `{this.state.path}`
                    </button>

                </header>
            </div>
        );
    }
}

//export default App;
export default MainMenu