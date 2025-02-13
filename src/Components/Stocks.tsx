import {useEffect, useState} from 'react'
import Plot from 'react-plotly.js';
import '../App.css';

type dates = string[];
type data = number[];

export default function Stocks() {
    const [dateData, setDateData] = useState<dates>();
    const [stockHighData, setStockHighData] = useState<data>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            setLoading(true);
            try {
                let result : any = await fetch('/data.json').then(res => res.json());
                result = result["Monthly Adjusted Time Series"];

                let datesData: dates = [];
                let stockData: data = [];
                Object.keys(result).forEach(key => {
                    datesData.push(key);
                    stockData.push(result[key]["2. high"]);
                });


                if(isMounted) {
                    setStockHighData(stockData);
                    setDateData(datesData);
                }
            } catch(error) {
                console.log("Error fetching", error);
            } finally {
                if(isMounted) setLoading(false);
            }
        }
        fetchData();
        return () => { isMounted = false; };
    }, []);

    return (
        <Plot
            data={[
                {
                    x: dateData,
                    y: stockHighData,
                    type: 'scatter',
                    name: 'IBM High',
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
