import Tab from "@/components/tab";
import WithHeader from "@/hoc/withHeader";
import { Tabs } from "@/utils/Tabs";

const Dashboard = () => {
  return <Tab tabItems={Tabs} />;
};
const DashboardWithHeader = WithHeader(Dashboard);
export default DashboardWithHeader;
