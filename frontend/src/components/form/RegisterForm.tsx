"use client";

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";

import { Button, InputText } from "../formElement";

export function RegisterForm() {
    let schema = yup.object({
        email: yup.string().email().required("Campo obligatorio"),
        firstname: yup.string().required("Campo obligatorio"),
        lastname: yup.string().required("Campo obligatorio"),
        password: yup.string().required("Campo obligatorio"),
        discordId: yup.string().required("Campo obligatorio"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            discordId: "",
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log("Iniciar sesión");
        },
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full"
        >
            <InputText
                name={"email"}
                label={"Email"}
                placeholder="waldirmaidana@gmail.com"
                value={formik.values.email}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helpertext={formik.touched.email && formik.errors.email}
            />
            <InputText
                name={"firstname"}
                label={"Nombres"}
                placeholder="Waldir"
                value={formik.values.firstname}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helpertext={formik.touched.firstname && formik.errors.firstname}
            />
            <InputText
                name={"lastname"}
                label={"Apellido(s)"}
                placeholder="Maidana"
                value={formik.values.firstname}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helpertext={formik.touched.firstname && formik.errors.firstname}
            />
            <InputText
                name={"password"}
                label={"Contrasseña"}
                placeholder="********"
                value={formik.values.password}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helpertext={formik.touched.password && formik.errors.password}
            />
            <InputText
                name={"discordId"}
                label={"ID de Discord"}
                placeholder="1321564654"
                value={formik.values.discordId}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={
                    formik.touched.discordId && Boolean(formik.errors.discordId)
                }
                helpertext={formik.touched.discordId && formik.errors.discordId}
            />
            <p className="text-sm">
                ¿Ya estas registrado? Ingresa{" "}
                <Link
                    href={"/iniciar-sesion"}
                    className="underline underline-offset-2"
                >
                    aquí
                </Link>
            </p>
            <Button text="Registrarse" type="submit" />
        </form>
    );
}
