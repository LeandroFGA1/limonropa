import React, { useEffect, useState } from 'react';
import ReCaptchaForm from '../components/ReCaptchaForm';
import axios from 'axios';
import { BASE_URL } from '../App';

const Access = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        let allRegions = [];
        let nextPage = `${BASE_URL}/api/RegionYComunaCL/region/`;
        while (nextPage) {
          const response = await axios.get(nextPage);
          allRegions = [...allRegions, ...response.data.results];
          nextPage = response.data.next;
        }

        setRegions(allRegions);
      } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
      }
    };

    fetchAllRegions();
  }, []);

  return (
    <>
      <ReCaptchaForm regions={regions} />
    </>
  );
};

export default Access;
