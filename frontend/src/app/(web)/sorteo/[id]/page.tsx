'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Props {
  params: {
    id: string;
  };
}

export default function SorteoPage({ params }: Props) {
  let today: string | Date = new Date();
  today = today.toISOString().substring(0, 10);
  const [raffle, setRaffle]: any = useState([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    fetch('http://localhost:3001/api/raffle/' + params.id)
      .then((res) => res.json())
      .then((res) => {
        setRaffle(res);
      });
  }, []);

  function verified() {
    if (session.user) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + session.user.user.token.trim()
      );

      fetch('http://localhost:3001/api/raffle/participate/' + params.id, {
        method: 'POST',
        headers: myHeaders,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode == 400) {
            Swal.fire({
              icon: 'error',
              title: 'Alerta',
              text: res.message,
              timer: 30000,
              showCancelButton: false,
              showConfirmButton: true,
            });
            // goTo.push("/administrador");
          } else if (res.ok == true) {
            Swal.fire({
              icon: 'success',
              title: 'Gracias por participar',
              text: res.message,
              timer: 30000,
              showCancelButton: false,
              showConfirmButton: true,
            });
          }
        });
    }
  }

  return (
    <>
      <div className='py-4 px-4 lg:px-0'>
        <div className='w-full mx-auto md:max-w-7xl flex flex-col'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='md:p-20 lg:p-32'>
                <figure className='relative h-full min-h-64'>
                  <Image
                    fill
                    src={
                      'https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/wink.png?updatedAt=1710554265802'
                    }
                    alt={'Imagen del sorteo uno'}
                  />
                </figure>
              </div>
              <div className='flex flex-col justify-center items-start gap-4 md:py-24 lg:py-48'>
                <h1 className='font-black text-5xl'>{raffle?.title}</h1>
                <div
                  className={`font-black text-xl ${
                    raffle?.deadLine >= today && raffle?.status === 'activo'
                      ? 'text-[#46ca58]'
                      : 'text-[#e03939]'
                  }`}
                >
                  {raffle?.deadLine}
                </div>
                <div
                  className={`font-black text-xl ${
                    raffle?.deadLine >= today && raffle?.status === 'activo'
                      ? 'text-[#46ca58]'
                      : 'text-[#e03939]'
                  }`}
                >
                  {raffle?.status}
                </div>

                <p>{raffle?.description}</p>

                <div
                  onClick={() => verified()}
                  className='py-2 px-4 font-bold rounded-lg bg-[#E8D2FF] text-[#0F0A1E] hover:bg-white cursor-pointer'
                >
                  Participar
                </div>
              </div>
            </div>
            {/* <div className="py-12">
                            <h2 className="font-black text-4xl text-center mb-12">
                                Premios
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                <div className="flex flex-col">
                                    <figure className="relative min-h-80">
                                        <Image
                                            fill
                                            src={
                                                "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/404.png?updatedAt=1710554263957"
                                            }
                                            alt={""}
                                        />
                                    </figure>
                                    <h3 className="text-center text-2xl font-black">Premio uno</h3>
                                </div>
                                <div className="flex flex-col">
                                    <figure className="relative min-h-80">
                                        <Image
                                            fill
                                            src={
                                                "https://ik.imagekit.io/noj6wnuqy/devtalles-raffle/404.png?updatedAt=1710554263957"
                                            }
                                            alt={""}
                                        />
                                    </figure>
                                    <h3 className="text-center text-2xl font-black">Premio uno</h3>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
