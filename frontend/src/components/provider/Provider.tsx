"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

// Aqui se debe agregar todos los proveedores que se vayan a necesitar a los largo de toda la pagina

export default function Provider({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}
