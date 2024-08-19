import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchDailyCount, updateCount } from '../services/Api';
import Confetti from'react-confetti';

const CountCategory = React.memo(({ counts, category, handleUpdate }) => {
    const audioRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (imageRef.current && containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const buttonHeight = 60;
            const maxMovement = containerHeight - 2 * buttonHeight - imageRef.current.height;
            const movement = Math.min(counts[category] * 10, maxMovement);
            
            imageRef.current.style.transform = `translateY(-${movement}px)`;
            if (movement === maxMovement) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }
        }
    }, [counts, category]);

    const handleClick = (change) => {
        if(change==-1 && counts[category]==0)return;
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        const audio = new Audio(change > 0 ? '/annyo.mp3' : '/uwa.mp3');
        audioRef.current = audio;
        audio.currentTime = 0;
        audio.play();

        handleUpdate(change, category);
    };

    return (
        <div className="counter" ref={containerRef}>
            {showConfetti && <Confetti />}
            <button onClick={() => handleClick(-1)} className="minus-button">-</button>
            <div className="image-container">
                <div className="scrolling-background"></div>
                <img 
                    ref={imageRef}
                    src={`../${category}.png`} 
                    alt={category} 
                    className="category-image"
                />
            </div>
            <button onClick={() => handleClick(1)} className="plus-button">+</button>
        </div>
    );
});
const Counter = ({ onUpdate }) => {
    const [counts, setCounts] = useState({ right: 0, haina: 0, basically: 0 });
    const [maxCount, setMaxCount] = useState(0);

    useEffect(() => {
        fetchDailyCount().then(data => {
            setCounts(data);
            setMaxCount(Math.max(...Object.values(data)));
            onUpdate(data);
        });
    }, [onUpdate]);

    const handleUpdate = useCallback(async (change, category) => {
        try {
            const dailyCount = await updateCount(category, change);
            setCounts(dailyCount);
            setMaxCount(Math.max(...Object.values(dailyCount)));
            onUpdate(dailyCount);
        } catch (error) {
            console.error('Error updating count:', error);
        }
    }, [onUpdate]);

    return (
        <div className='counter-container'>
            <CountCategory counts={counts} category="right" handleUpdate={handleUpdate} maxCount={maxCount} />
            <CountCategory counts={counts} category="haina" handleUpdate={handleUpdate} maxCount={maxCount} />
            <CountCategory counts={counts} category="basically" handleUpdate={handleUpdate} maxCount={maxCount} />
        </div>
    );
};


export default Counter;
