interface Props {
    name: string;
    placeholder?: string;
    label: string;
    type?: string;
    value: string;
    change: React.ChangeEventHandler;
    blur: React.FocusEventHandler;
    error: boolean | undefined;
    helpertext: any;
}

export function InputText({
    name,
    placeholder,
    label,
    type = "text",
    value,
    change,
    blur,
    error,
    helpertext,
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={change}
                onBlur={blur}
                className={`rounded-lg px-4 py-2 bg-[#0F0A1E] placeholder:text-gray-600 outline-none border-2 border-[#2C1D57] focus:border-white ${error ? "border-red-600" : ""}`}
            />
            {error && <p className="text-red-600">{helpertext}</p>}
        </div>
    );
}
