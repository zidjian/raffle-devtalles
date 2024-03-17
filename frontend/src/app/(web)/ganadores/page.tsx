import Image from "next/image";

export default function GanadpresPage() {
    return (
        <>
            <div className="py-4 px-2 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl p-8 md:p-12 lg:p-24 flex flex-col">
                    <h1 className="font-black text-3xl text-center mb-12">
                        Conoce a nuestros ganadores
                    </h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        <div className="flex flex-col gap-4">
                            <figure className="relative h-80 border-4 border-[#000] rounded-xl">
                                <div className="py-2 px-4 rounded-lg bg-[#e2d849] font-black uppercase text-[#0F0A1E] border-4 border-[#000] absolute -top-6 left-1/2 translate-x-[-50%]">
                                    Ganador
                                </div>
                                <Image
                                    fill
                                    src={
                                        "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/wink.png"
                                    }
                                    alt={"Imagen del sorteo"}
                                />
                            </figure>
                            <h2 className="font-bold text-xl text-center">
                                Sorteo uno
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
