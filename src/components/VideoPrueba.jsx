import React from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import textGeneral from '../text/textGeneral';

const VideoPrueba = () => {
    return (
        <div className="flex items-center justify-center flex-wrap px-10 h-fit lg:mb-[200px]">
            <Card className="w-full max-w-7xl h-fit flex flex-col lg:flex-row items-stretch">
                {/* Video */}
                <div className="w-full lg:w-[40%] min-w-[300px] flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/6mlrOKeahFk"
                            title="Video de prueba"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded"
                        ></iframe>
                    </div>
                </div>

                {/* Texto */}
                <CardBody className="w-full lg:w-[60%] p-6 text-center lg:text-left">
                    <Typography variant="h6" color="gray" className="mb-4 uppercase sm:text-2xl lg:text-2xl">
                        {textGeneral.videoPrueba.category}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2 sm:text-2xl lg:text-3xl">
                        {textGeneral.videoPrueba.title}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal sm:text-xl lg:text-2xl">
                        {textGeneral.videoPrueba.description}
                    </Typography>
                    <a href="#" className="inline-block">
                        <Button variant="text" className="flex items-center gap-2 sm:text-lg">
                            {textGeneral.videoPrueba.button}
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
    );
};

export default VideoPrueba;
