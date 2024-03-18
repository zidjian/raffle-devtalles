"use client";

import * as yup from "yup";
import { useFormik } from "formik";
import { Button, InputText } from "../formElement";
import { UploadFiles } from "../formElement/UploadFile";
import { useEffect, useState } from "react";
import { set } from "zod";
import { setImage } from "@/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
    button: string;
    id: string;
}

export function RaffleForm({ button, id }: Props) {
    const [file, setFile]: any = useState();
    const goTo = useRouter();
    const { data: session }: any = useSession();
    const [data, setData]: any = useState();

    useEffect(() => {
        fetch(`http://localhost:3001/api/raffle/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);

    let schema = yup.object({
        title: yup.string().required("Campo obligatorio"),
        description: yup.string().required("Campo obligatorio"),
        date: yup.string().required("Campo obligatorio"),
        bgOg: yup.mixed(),
    });

    const formik = useFormik({
        initialValues: {
            title: data ? data.title : "",
            description: data ? data.description : "",
            date: data ? data.deadLine : "",
            image: undefined,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (values) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
                "Authorization",
                "Bearer " + session.user.user.token.trim()
            );

            const { date, ...rest } = values;
            const data = { ...rest, deadLine: values.date };

            if (id === "nuevo") {
                await fetch("http://localhost:3001/api/raffle", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(data),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res) {
                            goTo.push("/administrador");
                        }
                    });
            } else {
                await fetch("http://localhost:3001/api/raffle/" + id, {
                    method: "PATCH",
                    headers: myHeaders,
                    body: JSON.stringify(data),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res) {
                            goTo.push("/administrador");
                        }
                    });
            }
        },
    });

    function onLoadFileBgOg() {
        setImage(formik, setFile, "image");
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <div className="col-span-1">
                <InputText
                    name={"title"}
                    label={"Titulo"}
                    placeholder="Escribir aquí"
                    value={formik.values.title}
                    change={formik.handleChange}
                    blur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helpertext={formik.touched.title && formik.errors.title}
                />
            </div>
            <div className="col-span-1">
                <InputText
                    name={"description"}
                    label={"Descripcion"}
                    placeholder="Escribir aquí"
                    value={formik.values.description}
                    change={formik.handleChange}
                    blur={formik.handleBlur}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helpertext={
                        formik.touched.description && formik.errors.description
                    }
                />
            </div>
            <div className="col-span-1">
                <InputText
                    name={"date"}
                    label={"Fecha"}
                    type="date"
                    value={formik.values.date}
                    change={formik.handleChange}
                    blur={formik.handleBlur}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helpertext={formik.touched.date && formik.errors.date}
                />
            </div>
            {/* <div className="col-span-1">
                <UploadFiles
                    text={"Subir imagen"}
                    label={"Foto de articulo"}
                    value={file ? file : formik.values.image}
                    change={onLoadFileBgOg}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helpertext={formik.touched.image && formik.errors.image}
                />
            </div> */}
            <div className="col-span-full flex justify-center">
                <Button text={button} type="submit" />
            </div>
        </form>
    );
}
