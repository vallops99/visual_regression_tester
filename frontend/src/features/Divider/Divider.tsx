import { Hr } from "./DivederStyles";

interface DividerProps {
    orientation?: "vertical" | "horizontal";
    className?: string;
};

export function Divider({ orientation = "vertical", className }: DividerProps) {
    return <Hr orientation={orientation} className={className} />;
}