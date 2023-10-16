import { Progress } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
const TimeTracking = ({ timeTrackingRemaining, timeTrackingSpent, handleChange }) => {
    const [time, setTime] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    });
    const typingRef = useRef(null);
    let max = Number(time.timeTrackingSpent) + Number(time.timeTrackingRemaining);
    let percent = Math.round(Number(time.timeTrackingSpent) / max * 100)
    useEffect(() => {
        if (timeTrackingSpent || timeTrackingRemaining) {
            setTime({ timeTrackingSpent, timeTrackingRemaining })
        }
    }, [timeTrackingSpent, timeTrackingRemaining])

    const handleChangeCallback = (e,callback) => {
        const { value, name } = e.target;
        if (typingRef.current) clearTimeout(typingRef.current)

        if (name === 'timeTrackingSpent') {
            setTime({ ...time, timeTrackingSpent: value })
            typingRef.current = setTimeout(() => callback(e), 400);
        }
        else if (name === 'timeTrackingRemaining') {
            setTime({ ...time, timeTrackingRemaining: value })
            typingRef.current = setTimeout(() => callback(e), 400);
        }
    }

    return (
        <>
            <Progress percent={percent} />
            <div className='time-tracking'>
                <input name='timeTrackingSpent' value={time.timeTrackingSpent} onChange={(e) => handleChangeCallback(e,handleChange)} />h logged
                <input name='timeTrackingRemaining' value={time.timeTrackingRemaining} onChange={(e) => handleChangeCallback(e,handleChange)} />h estimated
            </div>
        </>
    );
};
export default memo(TimeTracking);