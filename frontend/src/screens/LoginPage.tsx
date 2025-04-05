import { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate instead of useHistory

interface LoginPageProps {
    setPlayerId: (id: string) => void;
}

const LoginPage = ({ setPlayerId }: LoginPageProps) => {
    const [playerIdInput, setPlayerIdInput] = useState("");
    const navigate = useNavigate();  // useNavigate hook

    const handleLogin = () => {
        if (playerIdInput.trim()) {
            setPlayerId(playerIdInput);
            navigate("/guessing");  // Use navigate to go to the guessing page
        } else {
            alert("Please enter a valid player ID.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <label>
                Enter Player ID:
                <input 
                    type="text" 
                    value={playerIdInput} 
                    onChange={(e) => setPlayerIdInput(e.target.value)} 
                    placeholder="Enter your player ID" 
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
