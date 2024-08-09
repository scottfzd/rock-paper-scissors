import React from "react";
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        
        navigate('/');  
    }

    return (
        <>
        <h2 style={{fontFamily: 'Knewave'}}>HOME</h2>
        <button onClick={handleClick} className="play-button">Play</button>
        </>
    );
}

export default HomePage;