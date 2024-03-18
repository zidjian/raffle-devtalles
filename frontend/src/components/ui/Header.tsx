"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth/logout";

interface Navigation {
    text: string;
    path: string;
}

const navigation: Navigation[] = [
    { text: "Inicio", path: "/" },
    { text: "Sorteos", path: "/sorteos" },
    { text: "Ganadores", path: "/ganadores" },
    { text: "Administrador", path: "/administrador" },
];

export function Header() {
    const { data: session } = useSession();

    return (
        <div className="py-4 px-2 lg:px-0 bg-[#0F0A1E]">
            <div className="w-full mx-auto md:max-w-7xl flex justify-between items-center">
                <Link href={"/"}>
                    <Image
                        width={200}
                        height={80}
                        src={
                            "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/LOGOBLANCO.png"
                        }
                        alt={"Nombre de Devtalles"}
                    />
                </Link>
                <nav className="gap-4 hidden md:flex">
                    {navigation.map(({ text, path }: Navigation) => (
                        <Link
                            className="font-bold text-lg hover:underline hover:underline-offset-4"
                            key={text}
                            href={path}
                        >
                            {text}
                        </Link>
                    ))}
                </nav>
                {!session?.user ? (
                    <Link
                        className="py-2 px-8 rounded-lg bg-[#261a4b] hover:bg-[#20163d] font-bold hidden md:flex"
                        href={"/iniciar-sesion"}
                    >
                        Iniciar sesión
                    </Link>
                ) : (
                    <a
                        className="py-2 px-8 rounded-lg bg-[#261a4b] hover:bg-[#20163d] font-bold hidden md:flex cursor-pointer"
                        onClick={() => logout()}
                    >
                        Cerrar sesión
                    </a>
                )}
            </div>
        </div>
    );
}
