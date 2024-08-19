import React, { memo } from 'react';
import '../styles/DailyCount.css';

const DailyCount = memo(function DailyCount({ counts }) {
    console.log(counts);
    return (
        <div className="daily-count">
            <div><p>Right<br></br>{counts?.right ? counts.right : 0 }</p></div>
            <div><p>Haina <br></br>{counts?.haina ? counts.haina : 0 }</p></div>
            <div><p>Basically <br></br>{counts?.basically? counts.basically : 0 }</p></div>
        </div>
    );
});

export default DailyCount;