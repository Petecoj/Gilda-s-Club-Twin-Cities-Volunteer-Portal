import React from 'react';
import {CSVLink} from 'react-csv';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {};
  }

  
 
  getFileName() {
    if (!this.state.filename) return undefined;
    if (!this.state.filename.endsWith('.csv')) return this.state.filename + '.csv';
    return this.state.filename;
  }
  render() {
    return (
      <div>
          <div ><h4>Download CSV Document</h4></div>
          <div className="row">
              <div className="large-6 columns"></div>
              <div className="large-4 columns">
                  <input
                    onKeyUp={(e) => this.setState({filename: e.target.value})}
                    type="text" placeholder="Create File Name"/>
              </div>
              <div className="large-2 columns">
                  <CSVLink
                    data={this.props.data}
                    filename={this.getFileName()}
                    className="btn">Export to CSV ⬇</CSVLink>
              </div>
          </div>

      </div>
    );
  }
}

export default App;
