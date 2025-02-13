import React from 'react';
import Stocks from './Components/Stocks';
import './App.css';



function App() {
  return (
        <div className="main">
              <h3 className="main-header" style={{fontSize:'2.8rem', color:'#FF1d58', fontWeight:'bold', borderBottom:'1px solid #2F3F4D'}}>
                  Company Indexes
              </h3>

            <div className="stock-container">
                <h3 className="header" style={{fontSize:'20px', color:'white', fontWeight:'bold' }}>
                    IBM Highs
                </h3>
                <div className="stocks">
                    <Stocks />
                </div>
            </div>
      </div>
  );
}

export default App;
