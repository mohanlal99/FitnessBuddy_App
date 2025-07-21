import {
  LayoutDashboardIcon,
  LucideWorkflow,
  Target,
  TimerResetIcon,
  TrendingUp,
  Users
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BMICalculator from "../components/BMICalculater";
import CompletedChallenges from "../components/CompletedChallenges";

import Box from "../components/ui/Box";
import Button from "../components/ui/Button";
import SectionHeader from "../components/ui/SectionHeader";
import SectionTitle from "../components/ui/SectionTitle";
import { calculateBMI } from "../config/site";
import StopWatch from "../components/StopWatch";

const Dashboard = React.memo(() => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  
  const completed = (calculateBMI(user.weight,user.height)-18)/(24-18)*100
  const completedWork = user.completedChallenges?.length || 0
  return (
    <div className="min-h-screen ">
      <SectionHeader
        title={`Welcome back, ${user?.fullName || "User"}!`}
        subTitle="Ready to crush your fitness goals?"
        image="/images/dashboard.jpg"
        icon={LayoutDashboardIcon}
      />

      <div className="px-5 space-y-6">
        <Box>
          <SectionTitle title="BMI Progress" icon={Target} iconSize={30} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Current BMI */}
            <div className="p-4 rounded-xl text-center ">
              <h3 className="text-sm text-gray-600">Current BMI</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">{calculateBMI(user.weight || 58 , user.height || 180)}</p>
              <p className="text-sm text-green-600 font-semibold mt-1">
                Normal
              </p>
            </div>

            {/* Target BMI */}
            <div className="p-4 rounded-xl text-center ">
              <h3 className="text-sm text-gray-600">Target BMI</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">{user.targetBmi||24}</p>
              <p className="text-sm text-gray-500 mt-1">45 days to go</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${completed}%` }}
            />
          </div>
        </Box>
        <Box>
           <SectionTitle
            title="StopWatch"
            icon={TimerResetIcon}
            iconSize={30}
          />
        <StopWatch/>
        </Box>
        <BMICalculator/>

        {/* Workout & Buddies Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Box className="flex flex-col items-center justify-center text-center space-y-2">
            <TrendingUp className="text-blue-500" size={28} />
            <p className="text-2xl font-bold text-gray-800">{user?.activeChallenges?.length || "00"}</p>
            <p className="text-sm text-gray-500">Total Workouts</p>
          </Box>

          <Box className="flex flex-col items-center justify-center text-center space-y-2">
            <Users className="text-green-500" size={28} />
            <p className="text-2xl font-bold text-gray-800">{user?.friends?.length || "00"}</p>
            <p className="text-sm text-gray-500">Active Buddies</p>
          </Box>
        </div>

        {/* Weekly Progress */}
        <Box>
          <SectionTitle
            title="Weekly Progress"
            icon={TrendingUp}
            iconSize={30}
          />
          <p className="text-center text-sm text-gray-500 mt-1">
            {user?.activeChallenges?.length || 0} of weekly goals
          </p>
          <div className="flex items-center justify-center  w-full mt-3 ">
            <div className="h-30 w-30 flex items-center justify-center rounded-full font-medium text-4xl bg-blue-500 text-white scale-90">
              {(completedWork*100)/(user?.activeChallenges?.length || 1)}%
            </div>
          </div>
          
          <p className="text-sm text-center text-gray-600 mt-2">
            You’ve completed{" "}
            <span className="font-semibold text-blue-600">{completedWork || 0}</span> workouts this
            week.
          </p>
        </Box>

        {/* Recent Activity */}
        <CompletedChallenges title={"Recent Activity"} challenges={user?.completedChallenges}/>
        

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <Button
          onClick={()=>navigate('/workouts')}
            size="lg"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white">
            <LucideWorkflow size={18} /> Log Workout
          </Button>
          <Button
            onClick={()=>navigate('/buddies')}
            size="lg"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white">
            <Users size={18} /> Find Buddies
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;


