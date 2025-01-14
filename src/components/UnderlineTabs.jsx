import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import AccordionCustomAnimation from "./AccordionCustomAnimation";

const UnderlineTabs = () => {
  const [activeTab, setActiveTab] = React.useState("lorem1");
  const data = [
    {
      label: "Lorem 1",
      value: "lorem1",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.`,
      accordionData: [
        { question: "Pregunta 1 de Tab 1", answer: "Respuesta para Tab 1, Pregunta 1" },
        { question: "Pregunta 2 de Tab 1", answer: "Respuesta para Tab 1, Pregunta 2" },
        { question: "Pregunta 3 de Tab 1", answer: "Respuesta para Tab 1, Pregunta 3" },
      ],
    },
    {
      label: "Lorem 2",
      value: "lorem2",
      desc: `Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
      Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue.`,
      accordionData: [
        { question: "Pregunta 1 de Tab 2", answer: "Respuesta para Tab 2, Pregunta 1" },
        { question: "Pregunta 2 de Tab 2", answer: "Respuesta para Tab 2, Pregunta 2" },
        { question: "Pregunta 3 de Tab 2", answer: "Respuesta para Tab 2, Pregunta 3" },
      ],
    },
    {
      label: "Lorem 3",
      value: "lorem3",
      desc: `Mauris massa. Vestibulum lacinia arcu eget nulla. 
      Class aptent taciti sociosqu ad litora torquent per conubia nostra.`,
      accordionData: [
        { question: "Pregunta 1 de Tab 3", answer: "Respuesta para Tab 3, Pregunta 1" },
        { question: "Pregunta 2 de Tab 3", answer: "Respuesta para Tab 3, Pregunta 2" },
        { question: "Pregunta 3 de Tab 3", answer: "Respuesta para Tab 3, Pregunta 3" },
      ],
    },
  ];

  return (
    <>
      <Typography variant="h2" color="blue-gray" className="mb-4 pl-10">
        Preguntas Frecuentes
      </Typography>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-main2 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-4 border-main shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`${
                activeTab === value ? "text-gray-900" : ""
              } font-semibold`}
            >
              <Typography variant="h6" className="" >{label}</Typography>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="">
          {data.map(({ value, desc, accordionData }, index) => (
            <TabPanel key={value} value={value}>
              <Typography>{desc}</Typography>
              
              <AccordionCustomAnimation tabNumber={index + 1} accordionData={accordionData} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default UnderlineTabs;
