"use client";

import { logout } from "@/actions/auth/logout";
import { BasicTable } from "@/components/table/BasicTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdministratorPage() {
    const { data: session }: any = useSession();

    if (!session?.user?.user?.roles || !(session?.user?.user?.roles).includes("admin")) {
        logout();
    }

    if (!session?.user) {
        redirect("/iniciar-sesion");
    }

    return (
        <>
            <div className="py-4 px-2 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl p-8 md:p-12 lg:p-24 flex flex-col">
                    <h1 className="font-black text-3xl text-center mb-12">
                        Sorteos
                    </h1>
                    <div className="w-full">
                        <BasicTable />
                    </div>
                </div>
            </div>
        </>
    );
}
