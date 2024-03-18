import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider/Provider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
    title: "DevTalles",
    description: "Aplicación web de sorteos",
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="es">
            <body className={roboto.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
