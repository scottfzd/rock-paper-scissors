import React from "react";
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        
        navigate('/');  
    }

    return (
        <>
        <h1 style={{fontFamily: 'Prociono'}}>HOME</h1>
        <button onClick={handleClick} className="play-button">Play</button>
        </>
    );
}

export default HomePage;