import { Footer, Header } from "@/components/ui";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
