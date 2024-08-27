
import { Link } from "react-router-dom";

import Slider from "../Components/Slider";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";

import { useState } from "react";

interface Character {
    name: "Knight" | "Archer" | "Mage" | "Rogue";
    role: string;
    img: string;
    weapons: string[];
    skills: Record<string, string>;
}

export default function HeroPage({ getCharName }: { getCharName: (name: "Knight" | "Archer" | "Mage" | "Rogue") => void }) {


    const characters: Character[] = [
        {
            name: "Knight",
            role: "Frontline combatant focused on physical strength and defense.",
            img: "https://images.stockcake.com/public/c/8/e/c8eb7c33-2132-4095-a74e-91bb355f430a_large/knight-stars-comet-stockcake.jpg",
            weapons: ["Swords", "Axes", "Hammers", "Shields"],
            skills: {
                "Physical Attacks": "Strong melee attacks and combat prowess.",
                "Durability": "High health and defense to withstand enemy attacks.",
                "Tactics": "Basic combat strategies and formations to control the battlefield."
            }
        },
        {
            name: "Archer",
            role: "Long-range combatant specializing in precision and agility.",
            img: "https://images.stockcake.com/public/d/0/6/d06fe31e-5309-4659-9be1-f625799d5107_large/mystical-archer-aiming-stockcake.jpg",
            weapons: ["Bows", "Crossbows", "Throwing weapons"],
            skills: {
                "Ranged Attacks": "Skilled in attacking from a distance with high accuracy.",
                "Stealth": "Ability to remain hidden and strike unexpectedly.",
                "Nature Connection": "Use of traps and familiarity with natural environments for strategic advantage."
            }
        },
        {
            name: "Mage",
            role: "Spellcaster with a focus on magical attacks and elemental control.",
            img: "https://images.stockcake.com/public/4/5/b/45b9057b-2223-47e1-8573-9a8bc6479af1_large/wizard-summons-storm-stockcake.jpg",
            weapons: ["Staffs", "Wands", "Tomes"],
            skills: {
                "Elemental Spells": "Mastery over fire, ice, lightning, and other elements to attack or defend.",
                "Teleportation": "Ability to move instantly across distances or escape danger.",
                "Arcane Knowledge": "Access to powerful spells and magical lore for a wide range of effects."
            }
        },
        {
            name: "Rogue",
            role: "Stealthy and agile fighter, specializing in quick, lethal attacks.",
            img: "https://images.stockcake.com/public/7/c/7/7c7d7c96-f259-4515-b9b6-1217145a6771_large/moonlit-rogue-figure-stockcake.jpg",
            weapons: ["Daggers", "Swords", "Crossbows"],
            skills: {
                "Stealth": "Expertise in moving unseen and launching surprise attacks.",
                "Agility": "Quick movements and evasion techniques to avoid enemy strikes.",
                "Poison": "Use of toxins to weaken or incapacitate foes over time."
            }
        }
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        if (current === characters.length - 1) {
            setCurrent(0);
        }
        else {
            setCurrent((prev) => prev + 1)
        }
    }

    const prevSlide = () => {
        if (current === 0) {
            setCurrent(characters.length - 1);
        }
        else {
            setCurrent((prev) => prev - 1)
        }
    }

    const selectCharacter = () => {
        const name = characters[current].name;

        // alert("You chose " + characters[current].name)

        getCharName(name);
    }

    return (
        <div className="lg:h-screen">
            <div className="m-10 text-center">
                <Heading text="Choose your Character" />
            </div>



            <div className="relative">

                <div className="w-3/4 md:w-1/2 m-auto flex flex-col">
                    <div>
                        <Slider characters={characters} current={current} />
                    </div>

                    <div className="m-auto">
                        <Link to='/Practice'><Button text="SELECT" handleClick={selectCharacter} /></Link>
                    </div>






                </div>

                <div className="text-blue-500 text-5xl absolute top-0 flex h-3/4 w-full items-center justify-between xs:px-8 md:px-32 lg:px-44">
                    <button className="hover:text-blue-700" onClick={prevSlide}><FaAngleLeft /></button>
                    <button className="hover:text-blue-700" onClick={nextSlide}><FaAngleRight /></button>
                </div>

            </div>







        </div>
    )
}