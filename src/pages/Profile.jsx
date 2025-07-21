import {
  Goal,
  GoalIcon,
  LayoutDashboardIcon,
  MessageCircleMoreIcon,
  Moon,
  Settings,
  ShieldCloseIcon,
  Sun,
  Target,
  User,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProfileSection from "../components/ProfileSection";
import Box from "../components/ui/Box";
import SectionTitle from "../components/ui/SectionTitle";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/userAuthSlice";
import Modal from "../components/ui/Modal";
import useModal from "../hooks/useMoadal";
import EditProfileForm from "../components/EditProfileForm";
import { updateProfile } from "../services/updateSlice";
import { calculateBMI } from "../config/site";

const Profile = React.memo(() => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [theam, setTheam] = useState(user.theam || false);
  const [notification, setNotification] = useState(user.notification || false);
  const { success, error } = useSelector((state) => state.update);
  const [isOpen, onOpen, onOpenChange] = useModal(false);
  const goals = ["Weight", "Loss Cardio", "Strength"];
  const date = new Date(user?.createdAt || "2025-07-19T10:54:24.984Z")
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (theam) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theam]);

  const profileInfo = [
    {
      key: "Age",
      value: `${user.age || 0} Years`,
    },
    {
      key: "Gender",
      value: user.gender || "No",
    },
    {
      key: "Member Since",
      value: date,
    },
  ];
  const settingItems = [
    {
      key: "Notification",
      isActive: !notification || false,
      icon: MessageCircleMoreIcon,
    },
    {
      key: "Dark Mode",
      isActive: !theam || false,
      icon: Moon,
    },
  ];
  console.log(user);

   const weeklyStats = user?.workouts.reduce(
    (acc, workout) => {
      acc.totalWorkouts++;
      acc.totalCalories += workout.calories;
      acc.totalDuration += workout.duration;
      return acc;
    },
    { totalWorkouts: 0, totalCalories: 0, totalDuration: 0 }
  );
  function getDaysSinceCreated(createdAt) {
  const createdDate = new Date(createdAt);
  const today = new Date();

  // Set both dates to midnight to ensure full day difference
  createdDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = today - createdDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
  const formRef = useRef(null);

  const handleEdit = useCallback((updateData) => {
    dispatch(
      updateProfile({
        uid: user.uid,
        data: updateData,
      })
    );
    onOpenChange();
  }, []);

  const handleToggle = (key) => {
    // console.log(key)
    if (key === "Dark Mode") {
      const newTheme = !theam;
      setTheam(newTheme);
      dispatch(updateProfile({ uid: user.uid, data: { theam: newTheme } }));
    } else {
      const newNotification = !notification;
      setNotification(newNotification);
      dispatch(
        updateProfile({
          uid: user.uid,
          data: { notification: newNotification },
        })
      );
    }
  };
  return (
    <>
      <Modal
        title="Edit Profile"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        formRef={formRef}>
        <EditProfileForm user={user} onSubmit={handleEdit} formRef={formRef} />
      </Modal>
      <ProfileSection user={user} onOpen={onOpen} />
      <div className="grid grid-cols-1 px-5 md:grid-cols-3 gap-2 items-center justify-between ">
        <Box className="text-center  w-full font-medium ">
          <div className="scale-90">
            <div className="font-bold text-2xl">{weeklyStats.totalWorkouts}</div>
            <p className="text-black/40 text-sm">Total Workouts</p>
          </div>
        </Box>
        <Box className="text-center w-full font-medium ">
          <div className="font-bold text-2xl">{weeklyStats.totalCalories}</div>
          <p className="text-black/40 text-sm">Calories Burned</p>
        </Box>
        <Box className="text-center w-full font-medium ">
          <div className="font-bold text-2xl">{getDaysSinceCreated(user?.createdAt ||"2025-07-20T08:02:35.699Z")}</div>
          <p className="text-black/40 text-sm">Active Days</p>
        </Box>
      </div>
      {/* Second section BMI & Health Stats */}
      <div className="px-5 gap-2 items-center justify-between ">
        <Box>
          <SectionTitle
            title={"BMI & Health Stats"}
            icon={Target}
            iconSize={30}
            iconColor="#323899"
          />
          <div className="grid grid-cols-2 text-center w-full  gap-4 my-3">
            <div>
              <h2 className="text-black/40 text-sm">Current BMI</h2>
              <div className="font-bold text-2xl">
                {calculateBMI((user.weight || 0), (user.height || 0))}
              </div>
              <p>
                {" "}
                <span className="px-2 bg-green-500 text-white  rounded-md p-[2px] font-medium">
                  Normal
                </span>
              </p>
            </div>
            <div>
              <h2 className="text-black/40 text-sm">Target BMI</h2>
              <div>
                <div className="font-bold text-2xl">{user.targetBmi}</div>
                <p className="text-sm text-orange-400 ">{"15 days ago"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center text-center justify-between w-full pt-2 ">
            <div>
              <h2 className="text-black/40 text-sm">Current Weight</h2>
              <p className="font-bold ">{user?.weight || 0} KG</p>
            </div>
            <div>
              <h2 className="text-black/40 text-sm">Target Weight</h2>
              <p className="font-bold ">{user?.targetWeight || 0} KG</p>
            </div>
            <div>
              <h2 className="text-black/40 text-sm">Height</h2>
              <p className="font-bold ">{user?.height || 0}</p>
            </div>
          </div>
        </Box>
      </div>
      <div className="px-5">
        <Box>
          <SectionTitle
            title={"Fitness Goals"}
            icon={GoalIcon}
            iconSize={30}
            iconColor="#342232"
          />
          <div className="flex gap-4 items-center py-3 px-5 ">
            {goals.map((item) => (
              <div
                key={item}
                className="bg-green-500/10 rounded-md p-1 px-3 text-blue-500 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </Box>
      </div>
      <div className="px-5">
        <Box>
          <SectionTitle
            title={"Profile Details"}
            icon={User}
            iconSize={30}
            iconColor="#555544"
          />
          <div>
            {profileInfo.map(({ key, value }) => (
              <div
                key={key}
                className="flex justify-between items-center py-3 border-b border-b-black/5">
                <div className="text-gray-500">{key}</div>
                <div className="font-medium">{value}</div>
              </div>
            ))}
          </div>
        </Box>
      </div>
      <div className="px-5">
        <Box>
          <div className="flex items-center justify-between">
            <SectionTitle
              title={"Settings"}
              icon={Settings}
              iconSize={30}
              iconColor="#784343"
            />
            <div className="text-right">
              <Button
                size="sm"
                color="red"
                onClick={() =>
                  confirm("Are you sure!") ? dispatch(logout()) : ""
                }
                className="flex gap-2 ">
                <ShieldCloseIcon /> Sign Out
              </Button>
            </div>
          </div>
          <div>
            {settingItems.map(({ key, icon: Icon, isActive }) => (
              <div
                key={key}
                className="flex justify-between items-center py-5 border-b border-b-black/5">
                <div className="flex gap-2 items-center ">
                  <span>{<Icon size={20} />}</span>
                  <div className="text-gray-500 text-md">{key}</div>
                </div>
                {
                  <Toggle
                    active={isActive}
                    onToggle={() => handleToggle(key)}
                  />
                }
              </div>
            ))}
          </div>
        </Box>
      </div>
    </>
  );
});

export default Profile;
