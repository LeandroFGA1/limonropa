import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const AccordionCustomAnimation = ({ tabNumber, accordionData }) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {accordionData.map((item, index) => (
        <Accordion key={index} open={open === index + 1} animate={CUSTOM_ANIMATION}>
          <AccordionHeader onClick={() => handleOpen(index + 1)} className=" border-b-[1px] border-main">
            {item.question}
          </AccordionHeader>
          <AccordionBody>
            {item.answer} 
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionCustomAnimation;
