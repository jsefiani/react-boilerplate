import React from 'react';

class App extends React.Component {

    handleClick() {
        console.log("Clicked");
    }

    render() {
        return(
            <>
                <button onClick={this.handleClick}>Click me!</button>
            </>
        )
    }
}

export default App;