import { API_URL } from "../../utils";

export type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function Img(props : React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    const src = `${API_URL}/${props.src || ''.startsWith('/') ? props.src || ''.slice(0) : props.src}`;

    return <img {...props} src={src} alt={props.alt} />
}