import Link from "next/link";
import styles from "./ButtonLink.module.css";

interface Props {
    text: string;
    href: any;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    // TODO completar estilos para el boton
    color?: string;
    style?: "outline" | "fill";
}

export function ButtonLink({ text, href, icon, iconPosition = "left" }: Props) {
    return (
        <Link href={href} className={`${styles.button}`}>
            {icon && iconPosition === "left" && icon}
            <span>{text}</span>
            {icon && iconPosition === "right" && icon}
        </Link>
    );
}
