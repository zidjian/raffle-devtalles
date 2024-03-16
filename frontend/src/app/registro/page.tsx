import Image from "next/image";

import { RegisterForm } from "@/components/form";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="bg-[#25174A] p-8 md:rounded-2xl flex flex-col items-center w-[384px] lg:w-[400px]">
                <Image
                    width={150}
                    height={150}
                    src={
                        "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/guitar.png"
                    }
                    alt={"Devi saludando"}
                />
                <h1 className="font-black my-4 text-2xl text-center">
                    Crea una nueva cuenta
                </h1>
                {/* <p className="my-4">
                    Registrate y participa por grandes premios para la comunidad de DevTalles.
                </p> */}
                <RegisterForm />
            </div>
        </div>
    );
}
