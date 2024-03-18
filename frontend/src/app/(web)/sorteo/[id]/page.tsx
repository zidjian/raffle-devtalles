"use client";

import Image from "next/image";

export default function SorteoPage() {
    function verified() {}

    return (
        <>
            <div className="py-4 px-4 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl flex flex-col">
                    <div className="flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:p-20 lg:p-32">
                                <figure className="relative h-full min-h-64">
                                    <Image
                                        fill
                                        src={
                                            "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/wink.png?updatedAt=1710554265802"
                                        }
                                        alt={"Imagen del sorteo uno"}
                                    />
                                </figure>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-4 md:py-24 lg:py-48">
                                <h1 className="font-black text-5xl">
                                    Sorteo uno
                                </h1>
                                <div className="font-black text-xl">
                                    15/03/2024
                                </div>
                                <p>
                                    It uses a dictionary of over 200 Latin
                                    words, combined with a handful of model
                                    sentence structures, to generate Lorem Ipsum
                                    which looks reasonable. The generated Lorem
                                    Ipsum is therefore always free from
                                    repetition, injected humour, or
                                    non-characteristic words etc.
                                </p>

                                <div
                                    onClick={() => verified()}
                                    className="py-2 px-4 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white cursor-pointer"
                                >
                                    Participar
                                </div>
                            </div>
                        </div>
                        <div className="py-12">
                            <h2 className="font-black text-4xl text-center mb-12">
                                Premios
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                <div className="flex flex-col">
                                    <figure className="relative min-h-80">
                                        <Image
                                            fill
                                            src={
                                                "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/404.png?updatedAt=1710554263957"
                                            }
                                            alt={""}
                                        />
                                    </figure>
                                    <h3 className="text-center text-2xl font-black">Premio uno</h3>
                                </div>
                                <div className="flex flex-col">
                                    <figure className="relative min-h-80">
                                        <Image
                                            fill
                                            src={
                                                "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/404.png?updatedAt=1710554263957"
                                            }
                                            alt={""}
                                        />
                                    </figure>
                                    <h3 className="text-center text-2xl font-black">Premio uno</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}