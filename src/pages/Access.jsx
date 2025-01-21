import React, { useEffect, useState } from 'react';
import ReCaptchaForm from '../components/ReCaptchaForm';
import axios from 'axios';
import { BASE_URL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setRegions } from '../store/chileSlice';
const Access = () => {
  const dispatch = useDispatch();
  const regions = useSelector((state) => state.chile.regions); 

  useEffect(() => {
    
    if (regions.length === 0) {
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
          // alert('Error al obtener las regiones, consultar con soporte');
        }
      };

      fetchAllRegions();
    }
  }, [dispatch, regions.length]);

  return (
    <>
      <ReCaptchaForm regions={regions} />
    </>
  );
};

export default Access;
