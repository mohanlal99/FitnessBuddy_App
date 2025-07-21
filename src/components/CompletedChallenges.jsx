import { Activity, Star, Trophy } from "lucide-react";
import React from "react";
import SectionTitle from "./ui/SectionTitle";
import Box from "./ui/Box";

const CompletedChallenges = ({ challenges, title }) => {
  // console.log(challenges)
  return (
    <>
      <div className="grid mb-10">
        <SectionTitle title={title} icon={Activity} />
        {challenges?.map((challenge, index) => (
          <Box
            key={index}
            className="bg-green-50 relative space-y-3 p-2 border border-green-200">
            <div className="flex gap-2 items-center justify-between space-x-2 py-">
              <div className="flex gap-2 items-center justify-between space-x-2 ">
                <span className="bg-blue-500/10 rounded-full p-2  ">
                  <Star color="orange" size={20} />
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-800">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {challenge.description}
                  </p>
                </div>
              </div>
              <span className=" bg-green-400 p-2 text-white rounded-full">
                <Trophy size={20} />
              </span>
            </div>

            <div className="flex items-center justify-between px-1 md:px-3">
              <p className="text-xs font-medium mt-1 text-green-500">
                {challenge.completed}
              </p>
              {challenge.earned && (
                <p className="text-xs text-green-500 mt-1 font-medium">
                  Earned: {challenge.earned} points
                </p>
              )}
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default CompletedChallenges;
