import React, { Component } from 'react';
import ReactCKEditor from 'react-ckeditor5-classic';

class App extends Component {
  onChange(content){
    console.log("Content: " + content);
  }
  render() {
      return (
          <div className="App">
              <h2>Using CKEditor 5 build in React</h2>
              <ReactCKEditor
                  name='example'
                  content={this.state.content}
                  onChange={this.onChange}
              />
          </div>
      );
  }
}

export default App;
