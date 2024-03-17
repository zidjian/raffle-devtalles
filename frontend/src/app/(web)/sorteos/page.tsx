"use client";

import { Button } from "@/components/formElement";
import Image from "next/image";
import Link from "next/link";

export default function RafflePage() {
    function verified() {}

    return (
        <>
            <div className="py-4 px-2 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl p-8 md:p-12 lg:p-24 flex flex-col">
                    <h1 className="font-black text-3xl text-center mb-12">
                        Nuetros sorteos
                    </h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        <Link href={"/sorteo/123"} className="flex flex-col gap-4">
                            <figure className="relative h-80 border-4 border-[#000] rounded-xl">
                                <div className="py-2 px-4 font-bold rounded-lg bg-[#46ca58] text-[#0F0A1E] border-4 border-[#000] absolute -top-6 left-1/2 translate-x-[-50%]">
                                    15/03/2024
                                </div>
                                <Image
                                    fill
                                    src={
                                        "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/wink.png"
                                    }
                                    alt={"Imagen del sorteo"}
                                />
                            </figure>
                            <h2 className="font-bold text-xl text-center">Sorteo uno</h2>
                        </Link>
                        <Link href={"/sorteo/123"} className="flex flex-col gap-4">
                            <figure className="relative h-80 border-4 border-[#000] rounded-xl">
                                <div className="py-2 px-4 font-bold rounded-lg bg-[#e03939] text-[#0F0A1E] border-4 border-[#000] absolute -top-6 left-1/2 translate-x-[-50%]">
                                    15/03/2024
                                </div>
                                <Image
                                    fill
                                    src={
                                        "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/wink.png"
                                    }
                                    alt={"Imagen del sorteo"}
                                />
                            </figure>
                            <h2 className="font-bold text-xl text-center">Sorteo uno</h2>
                            {/* <div className="flex justify-evenly">
                                <div
                                    onClick={() => verified()}
                                    className="py-2 px-4 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white cursor-pointer"
                                >
                                    Participar
                                </div>
                            </div> */}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
