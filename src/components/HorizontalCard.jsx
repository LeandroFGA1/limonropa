import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const HorizontalCard = () => {
  return (
    <Card className="w-full h-[90vh] max-w-[50rem] flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        
      </CardHeader>
      <CardBody className='flex flex-col h-full justify-between'>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          Lorem
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atq
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo sint aut repellendus ratione quibusdam illum nulla deserunt. Exercitationem, et neque dolorem aliquid cupiditate quae optio molestiae dolor laudantium dolorum tempora?
        </Typography>
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Lorem ipsum 
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
  );
};

export default HorizontalCard;
