import axios from 'axios';
import { useState, useEffect } from 'react';

const defaultPara = "Some coaly judges are thought of simply as breads. The matin shear reveals itself as a tameless verse to those who look. The literature would have us believe that an eastbound ball is not but a musician. The first clonic plough is, in its own way, a hovercraft.The literature would have us believe that a lubric game is not but a flavor. Unfortunately, that is wrong; on the contrary, authors often misinterpret the vessel as a slier kitchen, when in actuality it feels more like a choking doubt. It's an undeniable fact, really; the unblessed multimedia comes from a recurved cast. A fitful astronomy without baskets is truly a chauffeur of sleekit patricias";

export default function Paragraph({ charName }) {

    const [paragraph, setParagraph] = useState(defaultPara);

    useEffect(() => {
        async function getPara() {
            const response = await axios.get("http://metaphorpsum.com/paragraphs/1/6");

            setParagraph(response.data);
        }

        getPara();
    }, [charName])

    return (
        <>
            {paragraph}
        </>


    )
}