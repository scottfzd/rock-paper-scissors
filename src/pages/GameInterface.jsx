import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function GameInterface() {

    const [rounds, setRounds] = useState(1);
    const [userChoice, setUserChoice] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [computerChoice, setComputerChoice] = useState(null);
    const [results, setResults] = useState(null);
    const [finalResults, setFinalResults] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);


    const [computerWins, setComputerWins] = useState(0);
    const [userWins, setUserWins] = useState(0);

    const [show, setShow] = useState(false);





    // flow

    // 1 Set user choice and computer choice

    const handleClick = (choice) => {
        setSelectedOption(choice);
        setUserChoice(choice);
        setButtonsDisabled(true);

        const computerChoice = getComputerChoice();
        setComputerChoice(computerChoice);
    }

    const getComputerChoice = () => {
        const array = ["Rock", "Paper", "Scissors"];

        const randomIndex = Math.floor(Math.random() * 3);

        const computerChoice = array[randomIndex];

        return computerChoice;
    }

    // 2 Examine outcomes/ Calculate results and set results and wins for past round

    useEffect(() => {
        if (userChoice != null && computerChoice != null) {
            calculateResults();
        }
    }, [userChoice, computerChoice]);

    const calculateResults = () => {
        let results = "";
        if (computerChoice === userChoice) {
            results = "Tie";
        } else {

            switch (userChoice) {
                case "Rock":
                    results = computerChoice === "Paper" ? "You lose😒" : "You win🎉";
                    break;
                case "Paper":
                    results = computerChoice === "Rock" ? "You win🎉" : "You lose😒";
                    break;
                case "Scissors":
                    results = computerChoice === "Paper" ? "You win🎉" : "You lose😒";
                    break;
            }
        }

        setResults(results);

        if (results === "You win🎉") {
            setUserWins(prevUserWins => prevUserWins + 1);
        } else if (results === "You lose😒") {
            setComputerWins(prevComputerWins => prevComputerWins + 1);
        }   
    }

    // 3 Check if anyone won the game and then either set another round or set final results

    useEffect(() => {
        console.log(`Computer Wins: ${computerWins}`);
        console.log(`User Wins: ${userWins}`);

        if (userWins === 3) {
            setFinalResults("You win🎉");
        } else if (computerWins === 3) {
            setFinalResults("You lose😒");
        } else {
            if (results) {
                setTimeout(() => {
                    console.log("Delayed for 1 second.");
                    // Reset for next round
                    setComputerChoice(null);
                    setUserChoice(null);
                    setRounds(prevRounds => prevRounds + 1);
                    setResults(null);
                    setButtonsDisabled(false);
                    setSelectedOption(null);
                }, 2500);
            }
        }

    }, [userWins, computerWins, results]);

    // 4 If someone won, display score/modal

    useEffect(() => {
        if (finalResults != null) {
            handleShow();
        }
    }, [finalResults]);

    const handleShow = () => setShow(true);

    // 5 Play again

    const handleClose = () => {
        setShow(false);
        setRounds(prevState => 1);
        setComputerChoice(null);
        setUserChoice(null);
        setResults(null);
        setComputerWins(0);
        setUserWins(0);
        setButtonsDisabled(false);
        setSelectedOption(null);
        setFinalResults(null);
    }

    


    return (
        <>

        <div className="uhghu">
            <h3>ROCK <br />PAPER <br />SCISSORS</h3>
        </div>

        <div className="top-board">
            {results && <h4>{results}</h4>}
            <h2>ROUND {rounds}</h2>
        </div>

        <div className="gameBoard">

            <div className="userSide">
                <div className="wins"><h1>{userWins}</h1></div>
                <div className="options">
                    <button className={`option ${selectedOption != "Rock" ? "" : "selected"} ${buttonsDisabled && selectedOption != "Rock" ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Rock')}>
                        Rock
                    </button>
                    <button className={`option ${selectedOption != "Paper" ? "" : "selected"} ${buttonsDisabled && selectedOption != "Paper" ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Paper')}>
                        Paper
                    </button>
                    <button className={`option ${selectedOption != "Scissors" ? "" : "selected"} ${buttonsDisabled && selectedOption != "Scissors" ? "disabled" : ""}`} onClick={() => !buttonsDisabled && handleClick('Scissors')}>
                        Scissors
                    </button>
                </div>
            </div>
            

            <h1 className="versus">versus</h1>

            <div className="computerSide">
                <div className="wins"><h1>{computerWins}</h1></div>
                <div className="computerChoice">
                    {computerChoice && <h2>{computerChoice}</h2>}
                </div>
            </div>
        </div>




        <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Body className="modal-content">
                <h1>{finalResults}</h1>
                <h3>{userWins} : {computerWins}</h3>
                <Button className="custom-modal-button" onClick={handleClose}>PLAY AGAIN</Button>
            </Modal.Body>
            
        </Modal>
        </>
    );
}

export default GameInterface;