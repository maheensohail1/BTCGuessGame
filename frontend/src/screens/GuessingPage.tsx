import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000"; // Update when deploying

interface GuessingPageProps {
    playerId: string | null;
}
const GuessingPage = ({ playerId }: GuessingPageProps) => {
    const [price, setPrice] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [guess, setGuess] = useState<"up" | "down" | null>(null);
    //const [playerId] = useState("user13"); // Replace with a real user ID logic
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        if(playerId){
        fetchPrice();
        fetchScore();
        const priceInterval = setInterval(fetchPrice, 60000); // Fetch the latest price every 15 seconds
        
        return () => {
            clearInterval(priceInterval); // Cleanup interval when the component unmounts
        };
    }
    }, [playerId]);

    const fetchPrice = async () => {
        try {
            const response = await axios.get(`${API_URL}/price`);
            setPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching price", error);
        }
    };

    const fetchScore = async () => {
        try {
            const response = await axios.get(`${API_URL}/score/${playerId}`);
            setScore(response.data.score);
        } catch (error) {
            console.error("Error fetching score", error);
        }
    };

    const makeGuess = async (direction: "up" | "down") => {
        if (!price || guess) return;
        setGuess(direction);

        await axios.post(`${API_URL}/guess`, {
            playerId,
            guess: direction,
            priceAtGuess: price,
        });

        setTimeout(() => resolveGuess(), 30000);
    };

    const resolveGuess = async () => {
        try {
            const response = await axios.get(`${API_URL}/guess/resolve/${playerId}`);
            const { message, newScore} = response.data;
            setScore(newScore);
            setMessage(message);
            
            console.log("score set");
        } catch (error) {
            console.error("Error resolving guess", error);
        }
        setGuess(null);
        fetchPrice();
    };

    const handleLogout = () => {
        navigate("/");  // Use navigate to go back to the login page
    };
    return (
        <div>
            <h1>Bitcoin Price Predictor</h1>
            <p>Current Price: {price ? `$${price}` : "Loading..."}</p>
            <p>Your Score: {score}</p>
            <button onClick={() => makeGuess("up")} disabled={!!guess}>Guess Up</button>
            <button onClick={() => makeGuess("down")} disabled={!!guess}>Guess Down</button>
            {guess && <p>Waiting for 60 seconds...</p>}

            {/* Show message after guess resolution */}
            {message && (
                <div>
                    <h3>Result: </h3>
                    <p>{message}</p>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
        
    );
};

export default GuessingPage;
