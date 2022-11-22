import { InputStyled } from "./InputStyles";

interface Props {
    id?: string;
    name?: string;
    required?: boolean;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    value?: string | number | readonly string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    dataTestId?: string;
}

export function Input({ id, name, placeholder, value, required = false, type = "text", onChange = () => {}, dataTestId }: Props) {
    return <InputStyled
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
        required={required}

        data-testid={dataTestId}
    />
}