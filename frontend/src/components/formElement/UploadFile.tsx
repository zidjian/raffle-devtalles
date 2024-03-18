"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Image from "next/image";
import { Button } from "./Button";

const MySwal = withReactContent(Swal);

interface Props {
    text: string;
    label: string;
    value: string;
    change: () => void;
    error: boolean | undefined;
    helpertext: any;
}

export function UploadFiles({
    text,
    label,
    value,
    change,
    error,
    helpertext,
}: Props) {
    function onShowImage() {
        Swal.fire({
            imageUrl: value,
            showCancelButton: false,
            showConfirmButton: false,
        });
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-start">
                {label && <label className="text-sm font-bold">{label}</label>}
                <Button text={text} type="button" change={change} />
                {error && <p className="text-red-600">{helpertext}</p>}
            </div>
            {value && (
                <Image
                    // onClick={() => onShowImage()}
                    src={value}
                    width={62}
                    height={62}
                    alt={"Foto del usuario"}
                    className={`cursor-pointer`}
                />
            )}
        </div>
    );
}
