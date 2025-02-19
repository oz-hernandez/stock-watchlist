import {useEffect, useState} from 'react'
import Plot from 'react-plotly.js';
import '../App.css';

export default function Stocks({ timeline }: { timeline: number }) {
    const [dateData, setDateData] = useState<string[]>();
    const [stockHighData, setStockHighData] = useState<number[]>();

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                let year = (new Date().getFullYear() - timeline).toString();
                console.log(year);
                let result : any = await fetch('/appleTestData.json').then(res => res.json());
                result = result["Time Series (Daily)"];

                let datesData: string[] = [];
                let stockData: number[] = [];
                let filteredData: string[];

                let currentDate = new Date();
                // debug
                // console.log(currentDate);
                let startYearRange = new Date();
                startYearRange.setFullYear(currentDate.getFullYear() - timeline);

                filteredData = Object.keys(result).filter(dates => {
                    const date = new Date(dates);
                    // debug
                    // console.log(date);
                    return date >= startYearRange && date <= currentDate;
                });

                console.log(filteredData);

                filteredData.forEach( val => {
                    datesData.push(val);
                    stockData.push(result[val]["2. high"]);
                });

                if(isMounted) {
                    setStockHighData(stockData);
                    setDateData(datesData);
                }
            } catch(error) {
                console.log("Error fetching", error);
            }
        }
        fetchData();
        return () => { isMounted = false; };
    }, [timeline]);

    return (
        <Plot
            data={[
                {
                    x: dateData,
                    y: stockHighData,
                    type: 'scatter',
                    name: 'Apple High',
                    mode: 'lines',
                    marker: {color: 'teal'},
                    line: { color: "73c49f", width: 3 },
                },
            ]}
            layout={
                {
                    autosize:true,
                    paper_bgcolor: "rgba(0,0,0,0)", // Makes the entire canvas transparent
                    plot_bgcolor: "rgba(0,0,0,0)",
                    xaxis: { showgrid: false, tickfont: { color: "ffffff", }, tickangle: 25}, // Remove x-axis grid lines
                    yaxis: { showgrid: false, tickfont: { color: "ffffff", }, zerolinecolor: "white" },
                }
            }
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
            config={{
                displayModeBar: false, // Hides the toolbar
            }}
        />
    );
}
