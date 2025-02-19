
import { Bungee } from "next/font/google";

const bungee = Bungee({
    variable: "--font-bungee",
    subsets: ["latin"],
    weight: "400"
});

interface BungeeTextProps {
    text: string;
    className: string
}

export default function BungeeText({ text, className}: BungeeTextProps) {
    return (
        <p className={`${bungee.variable} ${className}`}>{text}</p>
    )
}
