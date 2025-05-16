"use client"

import React from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react"
import AccordionCustomAnimation from "./AccordionCustomAnimation"
import textGeneral from "../text/textGeneral"

const UnderlineTabs = () => {
  const [activeTab, setActiveTab] = React.useState(textGeneral.underlineTabs.tabs[0].value)

  return (
    <div className="w-full px-4 sm:px-8 py-12 animate-fadeInUp">
      <Typography
        variant="h2"
        color="blue-gray"
        className="text-center text-main3 font-extrabold mb-8"
      >
        {textGeneral.underlineTabs.title}
      </Typography>

      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-xl shadow-md bg-main2/80 backdrop-blur-md border border-main p-2"
          indicatorProps={{
            className: "bg-main3 text-white shadow-none rounded-md",
          }}
        >
          {textGeneral.underlineTabs.tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`transition-all duration-300 px-4 py-2 rounded-md font-bold ${
                activeTab === tab.value
                  ? "text-white bg-main3 scale-105"
                  : "text-main3 hover:text-white hover:bg-main3/60"
              }`}
            >
              <Typography variant="h6">{tab.label}</Typography>
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody className="mt-6 bg-main/30 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          {textGeneral.underlineTabs.tabs.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              <Typography
                className="text-lg font-medium text-main3 mb-4 animate-fadeInUp"
              >
                {tab.desc}
              </Typography>
              <AccordionCustomAnimation
                tabNumber={tab.value}
                accordionData={tab.accordionData}
              />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default UnderlineTabs
