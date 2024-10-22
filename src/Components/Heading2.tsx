interface heading2Props {
    text: string
}

export default function Heading2({ text }: heading2Props) {
    return (

        <>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">{text}</h2>
        </>
    )
}