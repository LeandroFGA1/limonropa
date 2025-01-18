import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

const VideoPrueba = () => {
    return (
        <div className="flex items-center justify-center flex-wrap px-10 h-fit">
            <div className="w-[90vw] h-screen">
                <Card className="w-full h-fit  flex-col justify-between lg:flex-row min-w-[230px]">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full max-h-full lg:w-2/5 shrink-0 rounded-r-none flex items-center justify-center"
                    >
                        {/* Usar iframe para incrustar video de YouTube */}
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/6mlrOKeahFk" 
                            title="Video de prueba"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen 
                            className=" h-[60vh] rounded md:h-[300px] lg:h-[85%] min-h-[200px] object-cover min-w-[300px] "
                        ></iframe>
                    </CardHeader>
                    <CardBody className='flex flex-col justify-center '>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase sm:text-2xl lg:text-2xl">
                            Lorem
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2 sm:text-2xl lg:text-3xl">
                            Lorem ipsum dolor sit amet consect
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal sm:text-xl lg:text-2xl">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum ducimus animi quia distinctio magnam inventore ea, dolorem nobis explicabo alias soluta est enim facilis commodi temporibus eligendi sint suscipit veniam.
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2 sm:text-lg ">
                                Lorem ipsum dolo
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VideoPrueba;
