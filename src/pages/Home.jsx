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
            alert(`Error al obtener las regiones, consultar con soporte`);
        }
        };

        fetchAllRegions();  
    }, [dispatch]);

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
