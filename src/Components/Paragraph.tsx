import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../app/hooks';

const defaultPara = "...please wait";

interface ParagraphProps {
    userInput: string | null;
    restart: boolean;
    updateSpeed: any;
}

export default function Paragraph({ userInput, restart, updateSpeed }: ParagraphProps) {
    const current = useAppSelector((state) => state.current);

    const [paragraph, setParagraph] = useState(defaultPara);
    const [charStatus, setCharStatus] = useState<number[]>([]);
    const [errors, setErrors] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);


    const [count, setCount] = useState<number>(0);

    const intervalID = useRef<any>()



    useEffect(() => {
        async function getPara() {
            const response = await axios.get("http://metaphorpsum.com/paragraphs/1/6");
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

                    if (status === 0 && userInput.charAt(index) && userInput.charAt(index) !== paragraph.charAt(index)) {
                        setErrors(errors + 1);
                        return 1; // Set red bg state (1 = mistake made)
                    }
                    else if (status === 1 && userInput.charAt(index) === paragraph.charAt(index)) {
                        setErrors(errors - 1);
                        return 0;
                    }
                    if (index === paragraph.length - 1 && userInput.charAt(index) === paragraph.charAt(paragraph.length - 1)) {
                        gameOver();
                    }
                    return status;
                });
            });
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

    }

    const gameOver = () => {
        clearInterval(intervalID.current);
        let timeTaken = count / 60; //in minutes
        let wpm = ((charStatus.length / 5) / timeTaken).toFixed(0);
        let accuracy = (((charStatus.length - errors) / charStatus.length) * 100).toFixed(0);
        updateSpeed(wpm, accuracy);
        console.log(errors);

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
