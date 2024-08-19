import React, { useState, useCallback } from 'react';
import Counter from './components/Counter';
import DailyCount from './components/DailyCount';
import CalendarView from './components/CalenderView';
import LandingPage from './components/LandingPage';
import './styles/App.css';

function App() {
    const [dailyCounts, setDailyCounts] = useState({ right: 0, haina: 0, basically: 0 });
    const [view, setView] = useState('landing');

    const handleUpdate = useCallback((newCounts) => {
        // if (newCounts.right == 0 && newCounts.haina == 0 && newCounts.basically == 0 && view!=='counter') setView('landing');
        setDailyCounts(newCounts);
    }, []);
    const handleStart = () => {
        setView('counter');
    };

    return (
        <div className="app">
            {
                view !== 'landing' ? (
                    <header className="app-header">
                        <h1>Daily Counter Game</h1>
                    </header>
                ) : <></>
            }
            <nav className="app-nav">
                {
                    view !== 'landing' ?
                        (
                            <>
                                <button
                                    onClick={() => setView('counter')}
                                    className={view === 'counter' ? 'active' : ''}
                                >
                                    Counter
                                </button>
                                <button
                                    onClick={() => setView('calendar')}
                                    className={view === 'calendar' ? 'active' : ''}
                                >
                                    Calendar
                                </button>
                            </>
                        ) : <></>
                }

            </nav>
            <main className="app-main">
                {view === 'landing' ? (
                    <LandingPage onStart={handleStart} />
                ) : view === 'counter' ? (
                    <div className="counter-view">
                        <DailyCount counts={dailyCounts} />
                        <Counter onUpdate={handleUpdate} />
                    </div>
                ) : (
                    <CalendarView />
                )}

            </main>
        </div>
    );
}

export default App;