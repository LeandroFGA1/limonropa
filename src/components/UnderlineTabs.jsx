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
import textGeneral from "../text/textGeneral";

const UnderlineTabs = () => {
  const [activeTab, setActiveTab] = React.useState(textGeneral.underlineTabs.tabs[0].value);

  return (
    <>
      <Typography variant="h2" color="blue-gray" className="mb-4 pl-10">
        {textGeneral.underlineTabs.title}
      </Typography>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-main2 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-4 border-main shadow-none rounded-none",
          }}
        >
          {textGeneral.underlineTabs.tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`${
                activeTab === tab.value ? "text-gray-900" : ""
              } font-semibold`}
            >
              <Typography variant="h6">{tab.label}</Typography>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {textGeneral.underlineTabs.tabs.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              <Typography>{tab.desc}</Typography>
              <AccordionCustomAnimation
                tabNumber={tab.value}
                accordionData={tab.accordionData}
              />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default UnderlineTabs;
