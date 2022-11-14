import { SelectStyled } from "./SelectStyles";

interface Props {
    id?: string;
    name?: string;
    options?: string[];
    selectedOption?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ id, name, options, selectedOption, onChange = () => {} }: Props) {
    return (
        <SelectStyled id={id} name={name} onChange={(event) => onChange(event)} value={selectedOption}>
            {options?.map((option, index) => {
                return <option key={index} value={option}>{option}</option>;
            })}
        </SelectStyled>
    );
}