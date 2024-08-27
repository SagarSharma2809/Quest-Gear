interface HeadingProps {
    text: string;
}

export const Heading = ({ text }: HeadingProps) => {
    return (
        <>
            <h1 className="text-blue-500 text-5xl"> {text} </h1>
        </>
    )
}