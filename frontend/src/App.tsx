import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import GuessingPage from "./screens/GuessingPage";
import { useState } from "react";

const App = () => {

    const [playerId, setPlayerId] = useState<string | null>(null);

    return (
        <Router>
            <Routes>
            <Route path="/" element={<LoginPage setPlayerId={setPlayerId} />} />
            <Route path="/guessing" element={<GuessingPage playerId={playerId} />} />
            </Routes>
        </Router>
    );
};

export default App;
