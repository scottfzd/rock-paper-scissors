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


    const [computerScore, setComputerScore] = useState(0);
    const [userScore, setUserScore] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const buttonCount = 3;
    const intervalTime = 700; 
    useEffect(() => {

        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % buttonCount);
        }, intervalTime);

        return () => clearInterval(interval); 
    }, [buttonCount, intervalTime]);



    // flow

    useEffect(() => {
        if (!computerChoice) {
            const choices = ["Rock", "Paper", "Scissors"];
            const randomIndex = Math.floor(Math.random() * 3);

            const delays = [2500, 3000, 3500];
            const delay = delays[randomIndex];

            const timer = setTimeout(() => {
                setComputerChoice(choices[randomIndex]);
            }, delay);
    
            return () => clearTimeout(timer);
        }
    }, [computerChoice]);

    // 1 Set user choice

    const handleClick = (choice) => {
        setSelectedOption(choice);
        setUserChoice(choice);
        setButtonsDisabled(true);
    }

    // 2 Examine outcomes/ set results and scores for current round

    useEffect(() => {
        if (userChoice && computerChoice) calculateResults();
    }, [userChoice, computerChoice]);

    const calculateResults = () => {
        let userWins;
        if (computerChoice === userChoice) {
            setResults("Tie");
            return;
        }

        switch (userChoice) {
            case "Rock":
                userWins = computerChoice === "Scissors";
                break;
            case "Paper":
                userWins = computerChoice === "Rock";
                break;
            case "Scissors":
                userWins = computerChoice === "Paper";
                break;
        }

        if (userWins) {
            setResults("You win🎉");
            setUserScore(prevUserScore => prevUserScore + 1);
        } else {
            setResults("You lose😒");
            setComputerScore(prevComputerScore => prevComputerScore + 1);
        } 
    }

    // 3 Check if final winner and either set another round or set final results

    useEffect(() => {

        if (userScore === 3 || computerScore === 3) {
            userScore === 3 ? setFinalResults("You win🎉") : setFinalResults("You lose😒");
        } else if (results) {
            setTimeout(() => {
                // Reset for next round
                setComputerChoice(null);
                setUserChoice(null);
                setRounds(prevRounds => prevRounds + 1);
                setResults(null);
                setButtonsDisabled(false);
                setSelectedOption(null);
            }, 2500);
        }

    }, [userScore, computerScore, results]);

    // 4 If final winner, display final results/modal

    useEffect(() => {
        if (finalResults) setShowModal(true);
    }, [finalResults]);

    // 5 Play again

    const handleClose = () => {
        setShowModal(false);
        setRounds(1);
        setComputerChoice(null);
        setUserChoice(null);
        setResults(null);
        setComputerScore(0);
        setUserScore(0);
        setButtonsDisabled(false);
        setSelectedOption(null);
        setFinalResults(null);
    }

    


    return (
        <>
        <div className="top-board">
            {results && <h4>{results}</h4>}
            <h2>ROUND {rounds}</h2>
        </div>

        <div className="gameBoard">

            <div className="userSide">
                <div className="wins"><h1>{userScore}</h1></div>
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
                <div className="wins"><h1>{computerScore}</h1></div>
                <div className="computerChoice">

                    {(!userChoice && computerChoice) && <h2>Opponent made a pick</h2>}

                    {(userChoice && computerChoice) && computerChoice && <h2>{computerChoice}</h2>}

                    {!computerChoice &&
                        <div className="container">
                            <div className={`button ${activeIndex === 0 ? "active" : ""}`}></div>
                            <div className={`button ${activeIndex === 1 ? "active" : ""}`}></div>
                            <div className={`button ${activeIndex === 2 ? "active" : ""}`}></div>
                        </div>
                    }

                </div>
            </div>
        </div>




        <Modal show={showModal} onHide={handleClose} centered>
            
            <Modal.Body className="modal-content">
                <h1>{finalResults}</h1>
                <h3>{userScore} : {computerScore}</h3>
                <Button className="custom-modal-button" onClick={handleClose}>PLAY AGAIN</Button>
            </Modal.Body>
            
        </Modal>
        </>
    );
}

export default GameInterface;