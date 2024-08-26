'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper/modules';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function Header(){

    
      return (
        <Swiper modules={[Navigation, Pagination,EffectFade]}  navigation pagination={{ clickable: true }} spaceBetween={0} slidesPerView={1} loop={true} effect="fade"  className='h-64 md:h-screen'>
          <SwiperSlide>
            <div className="relative" >
              <Image src='/bannerTelemedicina.jpg' alt="Banner de médico utilizando a telemedicina"  width={1920} height={1080} className="w-full h-64 md:h-screen object-cover"/>
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <h2 className="text-white text-4xl md:text-8xl font-bold">Telemedicina</h2>
                <p className='lg:text-3xl my-2 text-white'>24 horas por dia, 7 dias por semana</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <Image src='/bannerAssistenciaPet.jpg' alt="Banner de uma mulher com um cachorro" width={1920} height={1080} className="w-full h-64 md:h-screen object-cover"/>
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-wrap">
                <h2 className="text-white text-4xl md:text-8xl font-bold">Assistência Pet</h2>
                <p className='lg:text-3xl my-2 text-white px-5'>Telemedicina, Consultas Presenciais e tudo que você precisa para seu filho de 4 patas</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <Image src='/bannerClubeDescontos.jpg' alt="Banner de uma mulher com um cachorro" width={1920} height={1080} className="w-full h-64 md:h-screen object-cover"/>
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <h2 className="text-white text-4xl md:text-8xl font-bold">Clube de Descontos</h2>
                <p className='lg:text-3xl my-2 text-white'>Mais de 30.000 parceiros em todo o Brasil</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <Image src='/fotoFuneral.jpg' alt="Banner de um Velório" width={1920} height={1080} className="w-full h-64 md:h-screen object-cover"/>
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <h2 className="text-white text-4xl md:text-8xl font-bold">Assistência Funeral</h2>
                <p className='lg:text-3xl my-2 text-white'>Amparo e conforto nos momentos mais delicados</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      );



}