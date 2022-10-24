import { Hr } from "./DivederStyles";

export interface DividerProps {
    orientation?: string;
    classNames?: string;
};

export function Divider({ orientation, classNames }: DividerProps) {
    return <Hr orientation={orientation} classNames={classNames} />;
}