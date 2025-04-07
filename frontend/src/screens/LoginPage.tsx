import { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate instead of useHistory

/**
 * Props for the LoginPage component
 */
interface LoginPageProps {
    setPlayerId: (id: string) => void; // Function to store the logged-in player's ID
}
/**
 * Login page where users enter their player ID to start playing the guessing game.
 * If it's their first time, they can choose a new player ID.
 */
const LoginPage = ({ setPlayerId }: LoginPageProps) => {
    // Local state for input field
    const [playerIdInput, setPlayerIdInput] = useState("");
     // React Router hook for navigation
    const navigate = useNavigate(); 

    /**
     * Handle login action.
     * If input is valid, sets the player ID and redirects to guessing page.
     */
    const handleLogin = () => {
        if (playerIdInput.trim()) {
            
            localStorage.setItem("playerId", playerIdInput); 
            setPlayerId(playerIdInput); // Save entered player ID to app state
            navigate("/guessing");      // Navigate to guessing game page
        } else {
            alert("Please enter a valid player ID.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Login</h2>
                <p className="text-center mb-4">Welcome! If this is your first time, simply enter a new Player ID to get started.</p>
                <div className="mb-3">
                    <label htmlFor="playerId" className="form-label">Enter Player ID:</label>
                    <input 
                        id="playerId"
                        type="text" 
                        value={playerIdInput} 
                        onChange={(e) => setPlayerIdInput(e.target.value)} 
                        className="form-control" 
                        placeholder="Enter your player ID" 
                    />
                </div>
                <button 
                    onClick={handleLogin} 
                    className="btn btn-primary w-100">
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
