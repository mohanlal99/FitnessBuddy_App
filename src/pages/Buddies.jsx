import React, { useState } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import { UsersIcon, MessageSquare, User, UserPlus, Sunset, Users, MapPinCheckInsideIcon, Search } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import Box from "../components/ui/Box";
import MaintenanceNotice from "../components/MaintenanceNotice";

const Buddies = () => {
  const [search, setSearch] = useState("");

  const allBuddies = [
    {
      name: "Alex Johnson",
      location: "San Francisco, CA",
      goal: "Weight Loss",
      focus: "Cardio",
      match: 95,
      lastWorkout: "2 hours ago",
      isSuggested: false,
    },
    {
      name: "Maria Rodriguez",
      location: "San Francisco, CA",
      goal: "Strength Training",
      focus: "Muscle Gain",
      match: 88,
      lastWorkout: "1 day ago",
      isSuggested: false,
    },
    {
      name: "David Chen",
      location: "San Francisco, CA",
      goal: "Running",
      focus: "Endurance",
      match: 92,
      lastWorkout: "30 minutes ago",
      isSuggested: false,
    },
    {
      name: "Emma Wilson",
      location: "San Francisco, CA",
      goal: "Yoga",
      focus: "Flexibility",
      match: 85,
      lastWorkout: "4 hours ago",
      isSuggested: false,
    },
    {
      name: "Michael Brown",
      location: "San Francisco, CA",
      goal: "Weight Loss",
      focus: "Cardio",
      match: 91,
      lastWorkout: "2 days ago",
      isSuggested: true,
      mutual: "2 mutual buddies",
    },
    {
      name: "Sophie Davis",
      location: "San Francisco, CA",
      goal: "CrossFit",
      focus: "Strength",
      match: 87,
      lastWorkout: "3 days ago",
      isSuggested: true,
    },
  ];

  const buddies = allBuddies.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SectionHeader
        title={"Fitness Buddies"}
        subTitle={"Connect with like-minded fitness enthusiasts"}
        image={"/images/buddies.jpeg"}
        icon={UsersIcon}
      />

      <MaintenanceNotice />

      <div className="px-5">
        {/* Search */}
        <Box className="mb-4 flex items-center">
          <Search color="gray"/>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search buddies..."
            className="w-full px-1 py-2 rounded-lg outline-none"
          />
        </Box>

        {/* Your Buddies */}
        <div className="space-y-4 mb-5">
        <SectionTitle icon={Users} title={`Your Buddies (${buddies.filter(b => !b.isSuggested).length})`} />
          {buddies
            .filter((b) => !b.isSuggested)
            .map((buddy, i) => (
              <Box  key={i} className="flex items-center justify-between ">
                {/* Left: Icon + Info */}
                <div className="flex items-center justify-center ">
                   <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  {/* Placeholder for user icon */}
                  <span>{buddy.name[0]}</span>
                </div>
                  <div>
                    <h3 className="text-lg font-semibold">{buddy.name}</h3>
                    <p className="text-[12px] flex gap-1 items-center  text-gray-500"><MapPinCheckInsideIcon size={15}/> {buddy.location}</p>
                    <p className="text-sm">
                      <span className="font-medium">{buddy.goal}</span> •{" "}
                      <span className="text-gray-600">{buddy.focus}</span>
                    </p>
                    <p className="text-sm text-green-600 font-medium">{buddy.match}% match</p>
                  </div>
                </div>

                {/* Right: Message + Time */}
                <div className="flex flex-col items-end gap-1 text-right">
                  <MessageSquare className="text-gray-400 hover:text-blue-500 cursor-pointer" />
                  <p className="text-xs text-gray-400">{buddy.lastWorkout}</p>
                </div>
              </Box>
            ))}
        </div>

        {/* Suggested Buddies */}
        <div className="space-y-4">
        <SectionTitle icon={Sunset} title={"Suggested Buddies"} className="mt-10" />
          {buddies
            .filter((b) => b.isSuggested)
            .map((buddy, i) => (
              <Box key={i} className="flex items-center justify-between p-4">
                {/* Left: Icon + Info */}
                <div className="flex items-center justify-center ">
                   <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  {/* Placeholder for user icon */}
                  <span>{buddy.name[0]}</span>
                </div>
                  <div>
                    <h3 className="text-lg font-semibold">{buddy.name}</h3>
                    <p className="text-sm text-gray-500">{buddy.location}</p>
                    <p className="text-sm">
                      <span className="font-medium">{buddy.goal}</span> •{" "}
                      <span className="text-gray-600">{buddy.focus}</span>
                    </p>
                    <p className="text-sm text-green-600 font-medium">{buddy.match}% match</p>
                    {buddy.mutual && (
                      <p className="text-xs text-gray-500">{buddy.mutual}</p>
                    )}
                  </div>
                </div>

                {/* Right: Add Buddy */}
                <div className="flex flex-col items-end gap-1 text-right">
                  <UserPlus className="text-blue-500 hover:scale-110 cursor-pointer" />
                  <p className="text-xs text-gray-400">{buddy.lastWorkout}</p>
                </div>
              </Box>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Buddies;
