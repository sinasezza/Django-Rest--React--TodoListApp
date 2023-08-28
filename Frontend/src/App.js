import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='task-container'>
          <div className='form-wrapper'>
            <form  method="post" id='form'> 
              <div className='flex-wrapper'>
                <div style={{flex : 6}}>
                  <input type="text" name="title" id="title" className='form-control' placeholder='task title'/>
                </div>
                <div style={{flex : 1}}>
                  <input id='submit' className='btn btn-warning' type="submit" name='add' value="add" />
                </div>
              </div>
            </form>
          </div>

          <div className='list-wrapper'>

          </div>
        </div>
      </div>
    )
  }
}

export default App;
