import { InputStyled } from "./InputStyles";

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    value?: string | number | readonly string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ id, name, placeholder, type = "text", value, onChange = () => {} }: Props) {
    return <InputStyled
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
    />
}