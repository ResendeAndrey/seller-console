/*
  This component handle the tabs and show component according to currentTab.

*/

import { useState } from "react";
import type { tabItems } from "./types";
import clsx from "clsx";
import Button from "../button";

type TabProps = {
  tabItems: tabItems[];
};
const Tab = ({ tabItems }: TabProps) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].name);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex border-b border-gray-300 dark:border-gray-700 mb-4 ">
        {tabItems.map((tab) => (
          <Button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={clsx(
              `px-4 py-2  ${
                activeTab === tab.name
                  ? "border-b-2 border-primary text-primary hover:text-text hover:border-text"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              }`
            )}
          >
            {tab.name}
          </Button>
        ))}
      </div>
      <div className="p-6">
        {tabItems.find((tab) => tab.name === activeTab)?.component}
      </div>
    </div>
  );
};

export default Tab;
