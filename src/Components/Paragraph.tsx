import axios from 'axios';
import { useState, useEffect, useRef, useReducer } from 'react';
import { useAppSelector } from '../app/hooks';

const defaultPara = "...please wait";

interface ParagraphProps {
    userInput: string | null;
    restart: boolean;
    updateSpeed: (wpm: string | null, accuracy: string | null) => void;
    updateCharState: (num: number) => void;
}


export default function Paragraph({ userInput, restart, updateSpeed, updateCharState }: ParagraphProps) {
    const current = useAppSelector((state) => state.current);

    const [paragraph, setParagraph] = useState(defaultPara);
    const [charStatus, setCharStatus] = useState<number[]>([]);
    const [errors, setErrors] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [successfulHits, SetSuccessfulHits] = useState<number>(0);




    const [count, setCount] = useState<number>(0);


    const intervalID = useRef<any>()





    useEffect(() => {
        async function getPara() {
            const response = await axios.get('/api/proxy');
            setParagraph(response.data);
            setCharStatus(new Array(response.data.length).fill(0));
            reset();
        }

        getPara();
    }, [current, restart]);

    useEffect(() => {
        if (userInput) {


            setCharStatus(prevStatus => {
                return prevStatus.map((status, index) => {

                    if (status == 0 && userInput.charAt(index) === paragraph.charAt(index)) {
                        SetSuccessfulHits(successfulHits + 1);
                        if (successfulHits > 20) {
                            updateCharState(4);
                        }
                        else {
                            updateCharState(3);
                        }
                    }

                    if (status === 0 && userInput.charAt(index) && userInput.charAt(index) !== paragraph.charAt(index)) {
                        setErrors(errors + 1);
                        updateCharState(2);  //take hit 
                        SetSuccessfulHits(0);
                        return 1; // Set red bg state (1 = mistake made)


                    }
                    else if (status === 1 && userInput.charAt(index) === paragraph.charAt(index)) {
                        setErrors(errors - 1);
                        updateCharState(3); //normal attack

                        return 0;
                    }

                    if (index === paragraph.length - 1 && userInput.charAt(index) === paragraph.charAt(paragraph.length - 1)) {

                        gameOver();

                    }
                    return status;

                });
            });
        }


        else {
            updateCharState(1);
        }
    }, [userInput, paragraph]);



    useEffect(() => {
        if (userInput?.charAt(0) && !isRunning) {
            start();
        }
    }, [userInput]);


    const start = () => {

        if (!isRunning) {
            intervalID.current = setInterval(() => {
                setCount((prevTime) => {
                    return prevTime + 1;
                })
            }, 1000)
        }

        setIsRunning(true);
    }

    const reset = () => {
        clearInterval(intervalID.current);
        setCount(0);
        setIsRunning(false);
        updateSpeed(null, null);


    }

    const gameOver = () => {
        clearInterval(intervalID.current);
        let timeTaken = count / 60; //in minutes
        let wpm = ((charStatus.length / 5) / timeTaken).toFixed(0);
        let accuracy = (((charStatus.length - errors) / charStatus.length) * 100).toFixed(0);
        updateSpeed(wpm, accuracy);
        updateCharState(1);

        // alert(`Game over! Errors: ${errors} with WPM: ${typingSpeed}`);
    };

    return (
        <>
            <div className='opacity-90'>
                {Array.from(paragraph).map((char, index) => (
                    <span
                        key={index}
                        className={
                            !userInput?.charAt(index)
                                ? '' // No input, leave it unchanged
                                : charStatus[index] === 1
                                    ? 'text-red-500' // Mistake detected, red background
                                    : 'text-blue-500' // Initially correct, blue text
                        }
                    >
                        {char}
                    </span>
                ))}
            </div>




        </>
    );
}
