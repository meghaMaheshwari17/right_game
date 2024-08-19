import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchAllCounts } from '../services/Api';
import '../styles/Calender.css';

const CalendarView = () => {
    const [counts, setCounts] = useState({});
    const [currentDate, setCurrentDate] = useState(moment());

    useEffect(() => {
        fetchAllCounts().then(data => {
            console.log(data);
            const countMap = {};
            data.forEach(item => {
                countMap[moment(item.date).format('YYYY-MM-DD')] = {
                    right:item.right,
                    haina: item.haina,
                    basically: item.basically,
                };
            });
            console.log(countMap);
            setCounts(countMap);
            console.log(countMap);
        });
    }, []);

    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = moment(currentDate).startOf('month').day();

    const goToPreviousMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };

    const renderDays = () => {
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = moment(currentDate).date(day);
            const formattedDate = date.format('YYYY-MM-DD');
            const count = counts[formattedDate];

            days.push(
                <div key={day} className="calendar-day">
                    <div className="day-number">{day}</div>
                    <div className="day-content">
                        {count !== undefined ? (
                            <>
                            <span className="count">Right: {count.right}</span>
                            <span className="count">Haina: {count.haina}</span>
                            <span className="count">Basically: {count.basically}</span>
                            </>
                        ) : (
                            <span className="no-entry">No entry for this day</span>
                        )}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button onClick={goToPreviousMonth}>&lt; Previous</button>
                <h2>{currentDate.format('MMMM YYYY')}</h2>
                <button onClick={goToNextMonth}>Next &gt;</button>
            </div>
            <div className="calendar-days">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarView;