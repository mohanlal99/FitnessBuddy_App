import React from "react";
import MessagesScreen from "../components/MessageScreen";
import { Dumbbell } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import MaintenanceNotice from "../components/MaintenanceNotice";

const Messages = () => {
  return (
    <div>
      <MaintenanceNotice/>
      <SectionHeader
        title={"Messages"}
        subTitle={"Stay connected with your fitness buddies"}
        image={"/images/message.jpg"}
        icon={Dumbbell}
      />
      <MessagesScreen />
    </div>
  );
};

export default Messages;
