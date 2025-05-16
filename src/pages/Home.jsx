import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselBanner from '../components/Carousel';
import Info from '../components/Info';
import CardCategoryGenerator from '../components/CardCategoryGenerator';
import UnderlineTabs from '../components/UnderlineTabs';
import OtherBanner from '../components/OtherBanner';
import VideoPrueba from '../components/VideoPrueba';
import { useDispatch } from 'react-redux';
import { setRegions } from '../store/chileSlice';
import { BASE_URL } from '../App';
import BannerECO from '../components/banners/BannerECO';
import StoreAddress from '../components/StoreAddress';

const Home = () => {

    const dispatch = useDispatch();  

    useEffect(() => {
        const fetchAllRegions = async () => {
        try {
            let allRegions = []; 
            let nextPage = `${BASE_URL}/api/RegionYComunaCL/region/`; 

            while (nextPage) {
            const response = await axios.get(nextPage);

            allRegions = [...allRegions, ...response.data.results];

            nextPage = response.data.next
                ? response.data.next.replace('http://', 'https://') 
                : null;
            }

            
            dispatch(setRegions(allRegions));

        } catch (error) {
            console.log(`Error al obtener las regiones, consultar con soporte`);
        }
        };

        fetchAllRegions();  
    }, [dispatch]);

    return (
        <div>
            <div className='h-[calc(100vh-100px)]'>
                <CarouselBanner />
            </div>
            <div>
                <BannerECO/>
            </div>
            <div className='h-[75vh] md:h-[60vh] flex items-center justify-center my-12 sm:my-0'>
                <Info />
            </div>

            <div className='flex items-center justify-center flex-col my-12 sm:my-20'>
                <h2 className='font-extrabold text-2xl mb-6 text-center px-4'>
                    Explora nuestras categorías destacadas y encuentra lo que estás buscando
                </h2>
                <CardCategoryGenerator />
            </div>

            <div className='w-full overflow-hidden'>
                <UnderlineTabs />
                <OtherBanner />
                <StoreAddress/>
                <VideoPrueba />
            </div>
        </div>
    );
};

export default Home;
