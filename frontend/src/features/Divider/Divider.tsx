import { Hr } from "./DivederStyles";

export interface DividerProps {
    orientation?: String;
};

export function Divider({ orientation }: DividerProps) {
    return <Hr orientation={orientation} />;
}