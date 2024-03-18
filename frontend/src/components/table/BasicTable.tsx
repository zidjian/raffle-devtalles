"use client";

import { FaEdit, FaMedal, FaPlusCircle } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong, FaTrash } from "react-icons/fa6";

import styles from "./BasicTable.module.css";
import Link from "next/link";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ButtonLink } from "../formElement";
import { useEffect, useState } from "react";

const MySwal = withReactContent(Swal);

export function BasicTable() {
    const [winner, setWinner]: any = useState("00");
    const [state, setState]: any = useState("Sorteo");
    const [raffles, setRaffles]: any = useState([]);

    const toast = MySwal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 30000,
        customClass: {
            container: "bg-lightChange",
            popup: "bg-lightChange",
            title: "text-darkChange",
        },
    });

    useEffect(() => {
        fetch("http://localhost:3001/api/raffle")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setRaffles(res);
            });
    }, []);

    function onDeleteItem() {
        Swal.fire({
            title: "Deseas eliminar el elemento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            customClass: {
                popup: "bg-lightChange",
                title: "text-darkChange",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Elemento eliminado correctamente.",
                    timer: 30000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: "bottom-end",
                    customClass: {
                        popup: "bg-lightChange flex p-4 items-center max-w-sm",
                        title: "text-darkChange text-base text-left p-0",
                    },
                });
            }
        });
    }

    function generateRandom(maxLimit = 100) {
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand);
        return rand;
    }

    function getWinner() {
        setState("Sorteando...");
        const interval = setInterval(function () {
            setWinner(generateRandom());
        }, 100);
        setTimeout(function () {
            clearInterval(interval);
            setWinner(generateRandom());
            setState("Ganador");
        }, 3000);
    }

    useEffect(() => {
        getWinner();
    }, []);

    return (
        <>
            <div className={styles.content}>
                <div className={styles.toolbar}>
                    <div></div>

                    <div className={styles.tools}>
                        <ButtonLink
                            text={"Añadir"}
                            href={"/administrador/nuevo"}
                            icon={<FaPlusCircle />}
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.containerStatic}>
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className={styles.containerFlow}>
                                <table className={styles.table}>
                                    <thead className={styles.thead}>
                                        <tr className={styles.theadRow}>
                                            <th
                                                scope="col"
                                                className={styles.theadItem}
                                            >
                                                Sorteo
                                            </th>
                                            <th
                                                scope="col"
                                                className={styles.theadItem}
                                            >
                                                Fecha
                                            </th>
                                            <th
                                                scope="col"
                                                className={styles.theadItem}
                                            >
                                                Ganador
                                            </th>
                                            <th
                                                scope="col"
                                                className={styles.theadItem}
                                            >
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.tbody}>
                                        {raffles.map((raffle: any) => (
                                            <tr
                                                key={raffle.id}
                                                className={styles.tbodyRow}
                                            >
                                                <td
                                                    className={styles.tbodyItem}
                                                >
                                                    {raffle.title}
                                                </td>
                                                <td
                                                    className={styles.tbodyItem}
                                                >
                                                    {raffle.deadLine}
                                                </td>
                                                <td
                                                    className={styles.tbodyItem}
                                                >
                                                    {raffle?.winner?.email ||
                                                        "-"}
                                                </td>
                                                <td
                                                    className={styles.tbodyItem}
                                                >
                                                    <div className="flex gap-4">
                                                        {raffle.status !=
                                                            "finalizado" && (
                                                            <>
                                                                <Link
                                                                    href={`/administrador/${raffle.id}`}
                                                                    className={
                                                                        styles.actions
                                                                    }
                                                                >
                                                                    Editar{" "}
                                                                    <FaEdit
                                                                        className={
                                                                            styles.actionsIcon
                                                                        }
                                                                    />
                                                                </Link>
                                                                <div
                                                                    onClick={() =>
                                                                        onDeleteItem()
                                                                    }
                                                                    className={
                                                                        styles.actions
                                                                    }
                                                                >
                                                                    Eliminar{" "}
                                                                    <FaTrash
                                                                        className={
                                                                            styles.actionsIcon
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        onDeleteItem()
                                                                    }
                                                                    className={
                                                                        styles.actions
                                                                    }
                                                                >
                                                                    Escoger
                                                                    ganador{" "}
                                                                    <FaMedal
                                                                        className={
                                                                            styles.actionsIcon
                                                                        }
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={styles.footer}>
                    <div className={styles.status}>
                        Page{" "}
                        <span className={styles.statusPosition}>1 of 10</span>
                    </div>

                    <div className={styles.pagination}>
                        <ButtonLink
                            text={"Anterior"}
                            href={"#"}
                            icon={<FaArrowLeftLong />}
                        />
                        <ButtonLink
                            text={"Siguiente"}
                            href={"#"}
                            icon={<FaArrowRightLong />}
                            iconPosition="right"
                        />
                    </div>
                </div> */}
            </div>
            {/* <div className="fixed top-0 left-0 w-screen h-screen bg-[#1d1238c2] flex justify-center items-center">
                <div className="flex p-16 bg-[#0F0A1E] rounded-xl flex-col">
                    <div className="font-black text-7xl text-center">{winner}</div>
                    <div className="uppercase text-2xl w-full text-center">
                        {state}
                    </div>
                </div>
            </div> */}
        </>
    );
}
