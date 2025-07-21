import { Dumbbell } from "lucide-react";
import React from "react";
import SectionHeader from "../components/ui/SectionHeader";
import GymFinder from "../components/GymFinder";
import WorkoutPage from "../components/WorkoutPage";

const Workouts = () => {
  return (
    <div>
      <SectionHeader
        title={"Workout Tracker"}
        subTitle={"Track your fitness journey"}
        image={"/images/workout.jpg"}
        icon={Dumbbell}
      />

      <WorkoutPage/>

      <GymFinder/>
    </div>
  );
};

export default Workouts;
