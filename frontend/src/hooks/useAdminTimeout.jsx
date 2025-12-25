import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../services/Auth";

const useAdminTimeout = () => {
    const navigate = useNavigate();
    const [remainingSeconds, setRemainingSeconds] = useState(10);

    useEffect(() => {
        let timeoutId;
        let intervalId;
        let deadline = Date.now() + 10000;
        const resetTimer = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
            deadline = Date.now() + 10000;
            setRemainingSeconds(10);
            timeoutId = setTimeout(() => {
                clearToken();
                navigate("/");
            }, 10000);
            intervalId = setInterval(() => {
                const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
                setRemainingSeconds(remaining);
            }, 1000);
        };

        const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [navigate]);

    return remainingSeconds;
};

export default useAdminTimeout;