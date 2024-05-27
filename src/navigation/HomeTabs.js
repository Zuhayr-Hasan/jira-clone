import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProjectForm from "../components/project/ProjectForm";
import Settings from "../components/settings/Settings";
import EmployeeScreen from "../screens/employee/Employee";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={ProjectForm} />
      <Tab.Screen name="Settings" component={EmployeeScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default HomeTabs;
