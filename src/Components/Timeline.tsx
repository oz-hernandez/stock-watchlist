import React from "react";


export default function Timeline({timelineFunc}: {timelineFunc: React.Dispatch<React.SetStateAction<number>>}) {
    return (
        <div className="timeline">
            <input type='radio' id='radio1' name='timeline' onClick={() => {timelineFunc(1)}} />
            <label htmlFor='radio1'>1yr</label>
            <input type='radio' id='radio2' name='timeline' defaultChecked  onClick={() => {timelineFunc(3)}} />
            <label htmlFor='radio2'>3yr</label>
            <input type='radio' id='radio3' name='timeline' onClick={() => {timelineFunc(5)}} />
            <label htmlFor='radio3'>5yr</label>
        </div>
    );
}