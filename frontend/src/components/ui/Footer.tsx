import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <div className="py-16 px-4 bg-[#0F0A1E]">
            <div className="w-full mx-auto md:max-w-7xl flex flex-col">
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4">
                        <Image
                            width={200}
                            height={80}
                            src={
                                "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/LOGOBLANCO.png"
                            }
                            alt={"Logo claro de DevTalles"}
                        />
                        <p className="text-balance">
                            Un lugar para motivar y premiar mediante el sorteo
                            de articulos a la comunidad de DevTalles.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl mb-4">
                            Acerca de DevTalles
                        </h3>
                        <div className="flex flex-col gap-2 items-start">
                            <Link
                                href={"/terminos-y-condiciones"}
                                className="hover:underline hover:underline-offset-4"
                            >
                                Términos y condiciones
                            </Link>
                            <Link
                                href={"/politicas-de-privacidad"}
                                className="hover:underline hover:underline-offset-4"
                            >
                                Politicas de privacidad
                            </Link>
                            <Link
                                href={"/preguntas-frecuentes"}
                                className="hover:underline hover:underline-offset-4"
                            >
                                Preguntas frecuentes
                            </Link>
                            <Link
                                href={"/reglamento"}
                                className="hover:underline hover:underline-offset-4"
                            >
                                Reglamento
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="font-bold text-xl mb-4">Contactanos</h3>
                        <div className="flex flex-col gap-2 items-start">
                            <Link
                                href={"/contacto"}
                                className="hover:underline hover:underline-offset-4"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>
                    <div className=""></div>
                </div>
                <div className="p-4 bg-[#1D1238] rounded-2xl text-center">
                    &copy; DevTalles 2024. Desarrollado por Waldir Maidana y
                    Camilo Reyes.
                </div>
            </div>
        </div>
    );
}
