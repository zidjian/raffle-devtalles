"use client";

import * as yup from "yup";
import { useFormik } from "formik";
import { Button, InputText } from "../formElement";
import { UploadFiles } from "../formElement/UploadFile";
import { useState } from "react";
import { set } from "zod";
import { setImage } from "@/utils";

interface Props {
    button: string;
    id: string;
}

export function RaffleForm({ button, id }: Props) {
    const [file, setFile]: any = useState();

    let schema = yup.object({
        title: yup.string().email().required("Campo obligatorio"),
        description: yup.string().required("Campo obligatorio"),
        date: yup.string().required("Campo obligatorio"),
        bgOg: yup.mixed().required("Campo obligatorio"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: "",
            image: "",
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log("guardar aqui");
        },
    });

    function onLoadFileBgOg() {
        console.log("dsf");
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
            <div className="col-span-1">
                <UploadFiles
                    text={"Subir imagen"}
                    label={"Foto de articulo"}
                    value={file ? file : formik.values.date}
                    change={onLoadFileBgOg}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helpertext={formik.touched.date && formik.errors.date}
                />
            </div>
            <div className="col-span-full flex justify-center">
                <Button text={button} type="submit" />
            </div>
        </form>
    );
}
