import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const defaultPara = "Some coaly judges are thought of simply as breads..."; // Default paragraph

interface ParagraphProps {
    userInput: string | null;
    restart: boolean
}

export default function Paragraph({ userInput, restart }: ParagraphProps) {
    const current = useAppSelector((state) => state.current);

    const [paragraph, setParagraph] = useState(defaultPara);
    const [charStatus, setCharStatus] = useState<number[]>([]);

    useEffect(() => {
        async function getPara() {
            const response = await axios.get("http://metaphorpsum.com/paragraphs/1/6");
            setParagraph(response.data);
            setCharStatus(new Array(response.data.length).fill(0));
        }

        getPara();
    }, [current, restart]);

    useEffect(() => {
        if (userInput) {
            setCharStatus(prevStatus => {
                return prevStatus.map((status, index) => {
                    if (status === 0 && userInput.charAt(index) && userInput.charAt(index) !== paragraph.charAt(index)) {
                        return 1; // Set red bg state (1 = mistake made)
                    } else if (status === 1 && userInput.charAt(index) === paragraph.charAt(index)) {
                        return 2; // Set green bg state (2 = corrected)
                    }
                    return status;
                });
            });
        }
    }, [userInput, paragraph]);

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
                                    ? 'bg-red-400' // Mistake detected, red background
                                    : charStatus[index] === 2
                                        ? 'text-lime-500' // Corrected, green background
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