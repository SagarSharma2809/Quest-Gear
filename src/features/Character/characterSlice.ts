import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a TS type for the data we'll be using
interface character {
    name: "Knight" | "Archer" | "Mage" | "Rogue";
    role: string;
    img: string;
    weapons: string[];
    skills: Record<string, string>;
    emoji: string;
    hearts: string;
    idle: string;
    takeHit: string;
    attack1: string;
    specialAttack: string;
    widthIdle: string;
    widthTakeHit: string;
    widthAttack1: string;
    widthSpecialAttack: string;
    bgImg: string;
}

// Create an initial state value for the reducer, with that type
const initialState: character[] = [
    {
        name: "Knight",
        role: "Frontline combatant focused on physical strength and defense.",
        img: "https://images.stockcake.com/public/c/8/e/c8eb7c33-2132-4095-a74e-91bb355f430a_large/knight-stars-comet-stockcake.jpg",
        weapons: ["Swords", "Axes", "Hammers", "Shields"],
        skills: {
            "Physical Attacks": "Strong melee attacks and combat prowess.",
            "Durability": "High health and defense to withstand enemy attacks.",
            "Tactics": "Basic combat strategies and formations to control the battlefield."
        },
        emoji: "⚔️",
        hearts: "❤️❤️❤️❤️❤️",
        idle: '/Img/Knight Idle.gif',
        takeHit: '/Img/Knight take hit.gif',
        attack1: '/Img/Knight attack 1.gif',
        specialAttack: '/Img/Knight special attack.gif',
        widthIdle: 'w-52',
        widthTakeHit: 'w-64',
        widthAttack1: 'w-96',
        widthSpecialAttack: 'w-[34em]',
        bgImg: "/Img/Knight bg.avif",
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
        },
        emoji: "🏹",
        hearts: "❤️❤️❤️",
        idle: '/Img/Archer Idle.gif',
        takeHit: '/Img/Archer take hit.gif',
        attack1: '/Img/Archer Attack 1.gif',
        specialAttack: '/Img/Archer Special Attack.gif',
        widthIdle: 'w-44',
        widthTakeHit: 'w-72',
        widthAttack1: 'w-72',
        widthSpecialAttack: 'w-[50em]',
        bgImg: "/Img/Archer bg.avif"

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
        },
        emoji: "📖",
        hearts: "❤️❤️",
        idle: '/Img/Mage Idle.gif',
        takeHit: '/Img/Mage take hit.gif',
        attack1: '/Img/Mage attack 1.gif',
        specialAttack: '/Img/Mage Special Attack.gif',
        widthIdle: 'w-40',
        widthTakeHit: 'w-72',
        widthAttack1: 'w-[38em]',
        widthSpecialAttack: 'w-[46em]',
        bgImg: "/Img/Mage bg.avif"
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
        },
        emoji: "🔪",
        hearts: "❤️❤️❤️❤️",
        idle: '/Img/Rogue Idle.gif',
        takeHit: '/Img/Rogue take hit.gif',
        attack1: '/Img/Rogue attack 1.gif',
        specialAttack: '/Img/Rogue Special Attack.gif',
        widthIdle: 'w-40',
        widthTakeHit: 'w-60',
        widthAttack1: 'w-80',
        widthSpecialAttack: 'w-[48em]',
        bgImg: "/Img/Rogue bg.avif"
    }
];

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {

    }


})

// Export the generated reducer function
export default characterSlice.reducer