import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = ""; // Updated when deploying

/**
 * Props passed to GuessingPage
 */
interface GuessingPageProps {
    playerId: string | null; // Unique identifier for the player
}
/**
 * Main guessing game page where users predict Bitcoin's price movement.
 */
const GuessingPage = ({ playerId }: GuessingPageProps) => {
    // Current Bitcoin price
    const [price, setPrice] = useState<number | null>(null);
    // Player's current score
    const [score, setScore] = useState<number>(0);
     // Player's active guess (either "up" or "down")
    const [guess, setGuess] = useState<"up" | "down" | null>(null);
     // Feedback message after a guess is resolved
    const [message, setMessage] = useState<string>("");
     // React Router hook to redirect the user
    const navigate = useNavigate();
     /**
     * Fetch price and score when component mounts (and playerId is available).
     * Also sets an interval to keep price updated every 60 seconds.
     */
    useEffect(() => {
        if(playerId){
            fetchPrice();
            fetchScore();
            const priceInterval = setInterval(fetchPrice, 60000); // Fetch the latest price every 1 minute
            
            return () => {
                // Cleanup interval on component unmount
                clearInterval(priceInterval); 
            };
        }
    }, [playerId]);
    /**
     * Fetches the current Bitcoin price from the backend API.
     */

    const fetchPrice = async () => {
        try {
            const response = await axios.get(`${API_URL}/price`);
            setPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching price", error);
        }
    };
    /**
     * Fetches the player's current score from the backend.
     */
    const fetchScore = async () => {
        try {
            const response = await axios.get(`${API_URL}/score/${playerId}`);
            setScore(response.data.score);
        } catch (error) {
            console.error("Error fetching score", error);
        }
    };
    /**
     * Sends the player's guess to the backend and starts the resolution timer.
     * @param direction - "up" or "down" guess made by the player
     */
    const makeGuess = async (direction: "up" | "down") => {
        if (!price || guess) return;// Prevent guess if no price or already guessed
        setGuess(direction);

        // Send guess to server
        await axios.post(`${API_URL}/guess`, {
            playerId,
            guess: direction,
            priceAtGuess: price,
        });
        // Wait 60 seconds before resolving the guess
        setTimeout(() => resolveGuess(), 60000);
    };

    /**
     * Resolves the guess by checking price movement and updates the score.
     */
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
        // Reset guess state and fetch new price
        setGuess(null);
        fetchPrice();
    };
    /**
     * Logs the player out and navigates back to the login screen.
     */
    const handleLogout = () => {
        localStorage.removeItem("playerId");
        navigate("/");
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
            <br />

            <button onClick={handleLogout}>Logout</button>
        </div>
        
    );
};

export default GuessingPage;
