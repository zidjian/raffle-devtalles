interface Props {
    text: string;
    type?: "button" | "submit" | "reset";
    change?: () => void;
}

export function Button({ text, type = "button", change }: Props) {
    return (
        <button
            type={type}
            className="py-2 px-8 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white"
            onClick={change}
        >
            {text}
        </button>
    );
}
