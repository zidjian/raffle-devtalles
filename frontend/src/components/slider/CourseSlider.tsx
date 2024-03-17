"use client";

import Image from "next/image";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Courses {
    image: string;
    url: string;
}

const courses: Courses[] = [
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/CD8lZr6MQGK8ALsP0ASI_react-pro.jpg?updatedAt=1710593553446",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/XZ1hK4SPSJGi7qfTO9Nh_REACT-NATIVE-COVER4.png?updatedAt=1710593553310",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/lZxiKjF6QDe8kFP2VCKD_large-PWA.jpeg?updatedAt=1710593552925",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/x5MRUsnWRqmhiWOx6YSN_OPEN-AI-ANGULAR-COVER.jpg?updatedAt=1710593552809",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/8311686782709.original.jpg?updatedAt=1710593552809",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/lcEm5aOSSCDTs75I5Ppg_OPEN-AI-COVER.jpg?updatedAt=1710593552809",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/WCEfxGgbSYir7ZZReORR_Next-JS-refresh.png?updatedAt=1710593552709",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/63BJ0OoTdCl8SPMlIOpA_NODE-JS-COVER-CURSO.jpg?updatedAt=1710593552980",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/pTPZVzSBqCgJoq5xswwo_nest-graphql.jpg?updatedAt=1710593552820",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/8hWi2WTkSXWoSWs3gVvT_nest.jpg?updatedAt=1710593552597",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/3JXyl2kWS4KLfDFMXkYg_flutter-adv.jpg?updatedAt=1710593552173",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/jGZVzskwQOmEghJSSyag_Flutter-intermedio2.jpeg?updatedAt=1710593551984",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/PnokDnVQTje8HabVxknK_ANGULAR-2023v2.jpg?updatedAt=1710593551911",
        url: "#",
    },
    {
        image: "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/courses/kv8w6Ic9RkaPLpLfFRdx_4001926_08c6.jpg?updatedAt=1710593552138",
        url: "#",
    },
];

export function CourseSlider() {
    return (
        <div className="flex gap-4 h-[500px]">
            <Swiper
                direction={"vertical"}
                spaceBetween={16}
                slidesPerView={3}
                modules={[Autoplay]}
                speed={5000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: true,
                }}
                loop={true}
                className="h-full w-full"
            >
                {courses.map(({ image, url }: Courses, i: number) => (
                    <SwiperSlide key={i} className="relative">
                        <a href={url} className="w-full h-full">
                            <Image
                                fill
                                className="w-full"
                                src={image || ""}
                                alt={""}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                direction={"vertical"}
                spaceBetween={16}
                slidesPerView={3}
                modules={[Autoplay]}
                speed={5000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: true,
                    reverseDirection: true,
                }}
                loop={true}
                className="h-full w-full"
            >
                {courses.map(({ image, url }: Courses, i: number) => (
                    <SwiperSlide key={i} className="relative">
                        <a href={url} className="w-full h-full">
                            <Image
                                fill
                                className="w-full"
                                src={image || ""}
                                alt={""}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
