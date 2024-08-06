import { useState, useEffect } from "react";

function GameInterface() {

    const [userChoice, setUserChoice] = useState("");

    const [buttonsDisabled, setButtonsDisabled] = useState(false);


    const handleClick = (choice) => {
        setUserChoice(choice);
        setButtonsDisabled(true);

    }


    useEffect(() => {
        console.log(userChoice);
    }, [userChoice]);

    return (
        <>
        <h1>Hello World</h1>

        <div className="options">
            <div className={`option ${buttonsDisabled ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Rock')}>
                <p>Rock</p>
            </div>
            <div className={`option ${buttonsDisabled ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Paper')}>
                <p>Paper</p>
            </div>
            <div className={`option ${buttonsDisabled ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Scissors')}>
                <p>Scissors</p>
            </div>
        </div>
        </>
    );
}

export default GameInterface;