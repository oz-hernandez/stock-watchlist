import { useState } from 'react';
import Stocks from './Components/Stocks';
import Timeline from './Components/Timeline';
import './App.css';


function App() {
    const [userTimeline, setTimeline] = useState<number>(3);
    return (
        <div className="main">
              <h3 className="main-header" style={{fontSize:'2.8rem', color:'#FF1d58', fontWeight:'bold', borderBottom:'1px solid #2F3F4D'}}>
                  Company Indexes
              </h3>

            <div className="stock-container">
                <h3 className="header" style={{fontSize:'20px', color:'white', fontWeight:'bold' }}>
                    Apple Highs
                </h3>
                <Timeline timelineFunc={setTimeline}/>
                <div className="stocks">
                    <Stocks timeline={userTimeline}/>
                </div>
            </div>
        </div>
    );
}

export default App;
