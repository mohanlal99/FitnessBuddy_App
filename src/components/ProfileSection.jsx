import {
  AlarmClockPlus,
  Edit3Icon,
  IdCard,
  LocationEdit,
  LucideFileEdit,
  User,
} from "lucide-react";
import React from "react";
import Button from "./ui/Button";
import { useDispatch } from "react-redux";
import { updateProfile } from "../services/updateSlice";

const ProfileSection = ({ user , onOpen }) => {
  const fullName = user?.fullName || "Guest";
  const email = user?.email || "Not Available";
  const location = user?.location || "Unknown";
  const dispatch = useDispatch();

  

  return (
    <div className="flex flex-col items-center justify-between gap-6 px-4 py-6 md:px-6 md:py-2 bg-gradient-to-br from-rose-800 to-blue-500 text-white rounded-b-2xl shadow-lg">
      <div className="flex justify-center items-center flex-col w-full space-y-2 md:space-y-4 pt-12">
        <div className="bg-white/20 p-3 rounded-full">
          <User className=" md:h-10 md:w-10" />
        </div>

        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-wide text-ellipsis text-nowrap">
          {fullName}
        </h2>

        <p className="text-sm flex gap-2 items-center leading-snug">
          <AlarmClockPlus size={16} /> {email}
        </p>

        <p className="text-sm flex gap-2 items-center  leading-snug">
          <LocationEdit size={16} /> {location}
        </p>

        <Button
          onClick={onOpen}
          size="md"
          color="blue"
          className="w-full gap-3 outline-none border-none focus:outline-none focus:border-none">
          <Edit3Icon size={16} /> Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
