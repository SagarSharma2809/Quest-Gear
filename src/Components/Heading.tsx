interface HeadingProps {
    text: string;
}

export const Heading = ({ text }: HeadingProps) => {
    return (
        <>
            <h1 className="text-white opacity-80 font-bold text-5xl"> {text} </h1>
        </>
    )
}