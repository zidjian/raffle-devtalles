export async function base64(image: File) {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    return base64Image;
}


export function setImage(formik: any, setValue: any, location: string) {
    const input: any = document.createElement("INPUT");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png,image/jpeg,image/webp");
    input.click();

    input.onchange = async () => {
        let file = input && input.files ? input.files[0] : undefined;
        formik.setFieldValue(location, await base64(file));
        setValue(URL.createObjectURL(file));
    };
}
