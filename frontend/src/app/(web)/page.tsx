import { Button } from "@/components/formElement";
import { CourseSlider } from "@/components/slider";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <div className="py-4 px-2 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-2 p-8 md:p-12 lg:p-24 gap-8">
                    <div className="flex justify-center">
                        <figure className="relative w-[428px] h-[428px]">
                            <Image
                                fill
                                src={
                                    "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/gift%20devi%203.png"
                                }
                                alt="Devi dentro de una caja de regalo"
                                className=""
                            />
                        </figure>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h2 className="text-5xl font-black text-balance">
                            Quieres partcipar por los premios?
                        </h2>
                        <p className="text-balance">
                            El único requisito es ser parte de la comunidad de
                            Discord de DevTalles para participar.
                        </p>
                        <a
                            href="#"
                            className="py-2 px-8 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white"
                        >
                            Unirse
                        </a>
                    </div>
                </div>
            </div>

            <div className="py-4 px-2 lg:px-0 bg-[#0F0A1E]">
                <div className="w-full mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-2 p-8 md:p-12 lg:p-24 gap-8">
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h2 className="text-5xl font-black text-balance">
                            Conoce nuestros cursos
                        </h2>
                        <p className="text-balance">
                            Uno de los pilares de enseñanza en DevTalles, y su
                            fundador Fernando Herrera, es que nuestras lecciones
                            sean una herramienta para que los estudiantes
                            avancen en su vida profesional y personal, por
                            tanto, hemos desarrollado un serie de cursos en los
                            cuales se realizan proyectos de la vida real.
                        </p>
                        <a
                            href="#"
                            className="py-2 px-8 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white"
                        >
                            Visitar DevTalles
                        </a>
                    </div>
                    <CourseSlider />
                </div>
            </div>

            <div className="py-4 px-2 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-2 p-8 md:p-12 lg:p-24 gap-8">
                    <div className="flex justify-center">
                        <figure className="relative w-[300px] h-[300px]">
                            <Image
                                fill
                                src={
                                    "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/ISO%20DUO.png"
                                }
                                alt="Devi dentro de una caja de regalo"
                                className=""
                            />
                        </figure>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4">
                        <h2 className="text-5xl font-black text-balance">
                            ¿Qué es DevTalles?
                        </h2>
                        <p className="text-balance">
                            DevTalles es una plataforma de enseñanza en línea
                            destinada para la preparación de desarrolladores de
                            frontend y backend. Nuestra visión es brindar a los
                            estudiantes cursos con contenido enriquecedor para
                            impulsar su preparación en este entorno y que les
                            permita incrementar o desarrollar sus habilidades.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
