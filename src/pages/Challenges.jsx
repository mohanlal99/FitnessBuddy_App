import {
  CalendarDays,
  DollarSign,
  PlusCircle,
  Star,
  Target,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateChallengesForm from "../components/CreateChallengesForm";
import Box from "../components/ui/Box";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import SectionHeader from "../components/ui/SectionHeader";
import SectionTitle from "../components/ui/SectionTitle";
import useModal from "../hooks/useMoadal";
import { addChallenge, fetchChallenges } from "../services/challengesSlice";
import { completeChallenge, joinChallenge, markTodayChallenge } from "../services/updateSlice";
import CompletedChallenges from "../components/CompletedChallenges";

const Challenges = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { availableChallenges, loading, error } = useSelector(
    (state) => state.challenges
  );
  const [isOpen, onOpen, onOpenChange] = useModal();
  const formRef = useRef(null);
  const [activeChallenges, setActiveChallenges] = useState(
    user?.activeChallenges || []
  );
  const completedChallenges = user?.completedChallenges || [];

  useEffect(() => {
    dispatch(fetchChallenges());
  }, []);

  const createChallenge = (formData) => {
    dispatch(addChallenge(formData));
    onOpenChange();
  };

  const handleJoin = (challenge) => {
    setActiveChallenges([...activeChallenges, challenge]);
    dispatch(joinChallenge(challenge));
  };

  const handleMarkAsChallenge = (challenge) => {
  const today = new Date().toISOString().split("T")[0];

  if ((challenge.markedDates || []).includes(today)) return;

  const updatedChallenges = activeChallenges.map((ch) => {
    if (ch.title === challenge.title) {
      const updatedDaysLeft = ch.daysLeft - 1;
      const updatedProgress = Math.round(
        ((ch.totalDays - updatedDaysLeft) / ch.totalDays) * 100
      );

      return {
        ...ch,
        daysLeft: updatedDaysLeft,
        progress: updatedProgress,
        markedDates: [...(ch.markedDates || []), today],
      };
    }
    return ch;
  });

  // Filter out if completed (daysLeft === 0)
  const stillActive = updatedChallenges.filter((c) => c.daysLeft > 0);

  setActiveChallenges(stillActive);
  dispatch(markTodayChallenge(challenge));
};


  return (
    <div>
      <SectionHeader
        title={"Challenges"}
        subTitle={"Push your limits and earn rewards"}
        image={"https://i.ytimg.com/vi/e2a-n2Cl8H8/maxresdefault.jpg"}
        icon={Trophy}
      />

      <Modal
        size="xl"
        onOpenChange={onOpenChange}
        // onSubmit={createChallenge}
        formRef={formRef}
        isOpen={isOpen}>
        <CreateChallengesForm onSubmit={createChallenge} formRef={formRef} />
      </Modal>

      <div className="px-5 ">
        {/* Top Create Button */}
        <div className=" mb-4 mt-5 w-full ">
          <Button
            onClick={() => onOpen()}
            size="lg"
            className="w-full rounded-2xl items-center gap-2">
            <PlusCircle size={18} />
            Create Challenge
          </Button>
        </div>

        {/* Active Challenges */}
        <SectionTitle title="Active Challenges" />
        <div className="grid gap-4 mb-6">
          {activeChallenges.map((challenge, index) => (
            <Box key={index} className="p-4 relative space-y-3">
              <div className="flex items-center gap-2 ">
                <span className="bg-blue-500/10 rounded-full p-2  ">
                  <Trophy size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {challenge.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    {challenge.points} points • {challenge.participants}{" "}
                    participants
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${challenge.progress}%` }}></div>
              </div>
              <Button
                className="absolute right-3 top-3"
                size="sm"
                color="green"
                disabled={(challenge.markedDates || []).includes(
                  new Date().toISOString().split("T")[0]
                )}
                onClick={() => handleMarkAsChallenge(challenge)}>
                Mark as Today
              </Button>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2 items-center font-medium text-[12px] text-gray-400">
                  <Users size={14} />
                  <p>{challenge.participants || 0} Participate</p>
                </div>
                <p className="text-[12px] text-gray-400 flex gap-2 items-center">
                  <Timer size={14} />
                  {/* {console.log(challenge)} */}
                  {challenge.daysLeft}
                </p>
              </div>
            </Box>
          ))}
          {activeChallenges.length == 0 && <div>No active challenge</div>}
        </div>

        {/* Available Challenges */}
        <SectionTitle title="Available Challenges" />
        <div className="grid gap-4 mb-6">
          {availableChallenges.map((challenge, index) => (
            <Box key={index} className="p-4 relative space-y-3">
              <div className="flex items-center gap-2 ">
                <div className="flex gap-2 items-center">
                  <span className="bg-blue-500/10 rounded-full p-2  ">
                    <Target color="orange" size={20} />
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold   text-[15px] text-gray-800 ">
                    {challenge.title}
                  </h3>
                  <p className="text-[13px] font-medium text-gray-500">
                    {challenge.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <div className="font-semibold text-[12px] flex  items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> participants {challenge.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} /> {challenge.duration}
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <DollarSign size={13} /> {challenge.points}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                color={
                  challenge.difficulty == "Hard"
                    ? "red"
                    : challenge.difficulty === "Easy"
                    ? "green"
                    : "blue"
                }
                className="absolute right-5 top-5  text-sm  mt-1 font-medium">
                {challenge.difficulty}
              </Button>
              <Button onClick={() => handleJoin(challenge)} color="green">
                Join Challenge
              </Button>
            </Box>
          ))}
        </div>

        {/* Completed Challenges */}
        <CompletedChallenges title={'Completed Challenges'} challenges={completedChallenges}/>
       
      </div>
    </div>
  );
};

export default Challenges;
