import { useState, useEffect } from "react";
import '../App.css';

function GameInterface() {

    const [rounds, setRounds] = useState(1);
    const [userChoice, setUserChoice] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [computerChoice, setComputerChoice] = useState(null);
    const [results, setResults] = useState(null);


    const handleClick = (choice) => {
        setUserChoice(choice);
        setButtonsDisabled(true);

        const computerChoice = getComputerChoice();
        setComputerChoice(computerChoice);
    }

    useEffect(() => {
        if (userChoice != null && computerChoice != null) {
            calculateResults();
        }
    }, [userChoice, computerChoice]);


    useEffect(() => {
        console.log(results);

        if (results) {
            setTimeout(() => {
                console.log("Delayed for 1 second.");
                setComputerChoice(null);
                setUserChoice(null);
                setRounds(prevRounds => prevRounds + 1);
                setResults(null);
                setButtonsDisabled(false);
            }, 3000);
        }
          
    }, [results]);

    const getComputerChoice = () => {
        const array = ["Rock", "Paper", "Scissors"];

        const randomIndex = Math.floor(Math.random() * 3);

        const computerChoice = array[randomIndex];

        return computerChoice;
    }

    const calculateResults = () => {
        let results = "";
        if (computerChoice === userChoice) {
            results = "Tie";
        } else {

            switch (userChoice) {
                case "Rock":
                    results = computerChoice === "Paper" ? "You lose" : "You win🎉";
                    break;
                case "Paper":
                    results = computerChoice === "Rock" ? "You win🎉" : "You lose";
                    break;
                case "Scissors":
                    results = computerChoice === "Paper" ? "You win🎉" : "You lose";
                    break;
            }
        }

        setResults(results);
        
    }

    return (
        <>

        {results && <h1>{results}</h1>}
        <h1>Round {rounds}</h1>


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

        <h1>VS</h1>

        <div className="computerChoice">
            {computerChoice && <h1>{computerChoice}</h1>}
        </div>
        </>
    );
}

export default GameInterface;