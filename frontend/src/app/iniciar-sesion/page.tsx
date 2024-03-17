import Image from "next/image";

import { LoginForm } from "@/components/form";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="bg-[#25174A] p-8 md:rounded-2xl flex flex-col items-center w-[384px] lg:w-[400px]">
                <Image
                    width={150}
                    height={150}
                    src={
                        "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/fly.png"
                    }
                    alt={"Devi saludando"}
                />
                <h1 className="font-black my-4 text-2xl text-center">
                    Bienvenido a DevTalles!
                </h1>
                {/* <p className="my-4">
                    Ingreas tus credenciales o usa alguna plataforma para acceder.
                </p> */}
                <LoginForm />
            </div>
        </div>
    );
}
