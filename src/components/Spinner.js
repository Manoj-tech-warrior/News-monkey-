import React, { Component } from 'react'
// import loading from './loading.gif'


export class Spinner extends Component {
  render() {
    return (
      <div className='text-center m-4  '>
        <div className="spinner-border text-center  text-secondary" role="status">
            {/* <img src="{loading}" alt="loading" /> */}
             <span className="visually-hidden">Loading...</span>
       </div>

      </div>
    )
  }
}

export default Spinner;
