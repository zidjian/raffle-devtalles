// import { CategoryForm } from "@/components/dashboard/form";

import { RaffleForm } from "@/components/form";

interface Props {
    params: {
        id: string;
    };
}

export default function CreateOrUpdateSorteoPage({ params }: Props) {
    let title = "Nueva sorteo";
    let button = "Guardar";

    const { id } = params;

    if (id != "nuevo") {
        title = "Editar sorteo";
        button = "Actualizar";
    }

    return (
        <>
            <div className="py-4 px-0 lg:px-0">
                <div className="w-full mx-auto md:max-w-7xl py-8 md:py-12 lg:py-24 flex flex-col">
                    <div className="mb-4">
                        <h2 className="font-bold text-2xl text-darkChange">
                            {title}
                        </h2>
                    </div>
                    <RaffleForm button={button} id={id} />
                </div>
            </div>
        </>
    );
}
