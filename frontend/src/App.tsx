import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import GuessingPage from "./screens/GuessingPage";
import { useState } from "react";

/**
 * The root component that sets up routing and manages the shared state for the player ID.
 */
const App = () => {
// Global state to store the current player's ID, shared across pages
    const [playerId, setPlayerId] = useState<string | null>(null);

    return (
        <Router>
            <Routes>
            {/* Route for the login screen */}
            <Route path="/" element={<LoginPage setPlayerId={setPlayerId} />} />
             {/* Route for the guessing game screen; playerId is passed as a prop */}
            <Route path="/guessing" element={<GuessingPage playerId={playerId} />} />
            </Routes>
        </Router>
    );
};

export default App;
