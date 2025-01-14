import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselBanner from '../components/Carousel';
import Info from '../components/Info';
import CardCategoryGenerator from '../components/CardCategoryGenerator';
import UnderlineTabs from '../components/UnderlineTabs';
import OtherBanner from '../components/OtherBanner';
import VideoPrueba from '../components/VideoPrueba';
import ReCaptchaForm from '../components/ReCaptchaForm';
import ContactForm from '../components/ContactForm';


const Home = () => {


    return (
        <>
            <div className='h-[calc(100vh-100px)]'>
                <CarouselBanner />
            </div>

            <div className='h-[75vh] sm:h-[60vh] flex items-center justify-center'>
                <Info />
            </div>
            <div className='flex items-center justify-center flex-col'>
                <h2 className='font-extrabold text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                <CardCategoryGenerator />
            </div>
            <div>
                <UnderlineTabs />
                <OtherBanner />
                <VideoPrueba />
            </div>
        </>
    );
};

export default Home;
