import { doc, getDoc } from 'firebase/firestore';
import {
  Activity,
  Clock,
  Flame,
  Plus,
  Target
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../config/firebase';
import { addWorkout } from '../services/updateSlice';

export default function WorkoutPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [userWorkouts, setUserWorkouts] = useState([]);
  const dispatch = useDispatch()  
  const user = useSelector((state) => state.auth.user); 

  const workoutTypes = [
    'Running', 'Weight Training', 'Yoga', 'Cycling',
    'Swimming', 'CrossFit', 'Pilates', 'Boxing', 'Dancing', 'Hiking'
  ];

  const caloriesPerMinute = {
    Running: 10, 'Weight Training': 6, Yoga: 4, Cycling: 8,
    Swimming: 12, CrossFit: 15, Pilates: 5, Boxing: 13, Dancing: 7, Hiking: 9
  };

  useEffect(() => {
    if (user?.uid) {
      fetchUserWorkouts(user.uid);
    }
  }, [user]);

  const fetchUserWorkouts = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserWorkouts(data.workouts || []);
      }
    } catch (err) {
      console.error('Error fetching user workouts:', err);
    }
  };

  const weeklyStats = userWorkouts.reduce(
    (acc, workout) => {
      acc.totalWorkouts++;
      acc.totalCalories += workout.calories;
      acc.totalDuration += workout.duration;
      return acc;
    },
    { totalWorkouts: 0, totalCalories: 0, totalDuration: 0 }
  );

  const handleAddWorkout = () => {
    if (selectedWorkout && duration && intensity) {
      const calories = (caloriesPerMinute[selectedWorkout] || 7) * parseInt(duration);
      const newWorkout = {
        type: selectedWorkout,
        duration: parseInt(duration),
        calories,
        intensity,
        date: new Date().toISOString().split('T')[0]
      };
      dispatch(addWorkout(newWorkout));
      setUserWorkouts([...userWorkouts, newWorkout]);
      setShowAddModal(false);
      setSelectedWorkout('');
      setDuration('');
      setIntensity('');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="px-6 mt-6 space-y-6">
        {/* Weekly Stats */}
        <div className="flex justify-between space-x-4">
          <div className="bg-white rounded-xl shadow flex-1 p-4 text-center">
            <Activity size={24} className="mx-auto text-blue-600" />
            <p className="mt-2 text-xl font-bold text-gray-800">{weeklyStats.totalWorkouts}</p>
            <p className="text-sm text-gray-500">Workouts</p>
          </div>
          <div className="bg-white rounded-xl shadow flex-1 p-4 text-center">
            <Flame size={24} className="mx-auto text-red-600" />
            <p className="mt-2 text-xl font-bold text-gray-800">{weeklyStats.totalCalories}</p>
            <p className="text-sm text-gray-500">Calories</p>
          </div>
          <div className="bg-white rounded-xl shadow flex-1 p-4 text-center">
            <Clock size={24} className="mx-auto text-yellow-500" />
            <p className="mt-2 text-xl font-bold text-gray-800">{weeklyStats.totalDuration}m</p>
            <p className="text-sm text-gray-500">Duration</p>
          </div>
        </div>

        {/* Add Workout Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-blue-600 text-white rounded-xl py-3 flex justify-center items-center space-x-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span className="font-medium">Log New Workout</span>
        </button>

        {/* Workout History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout History</h2>
          <div className="space-y-4">
            {userWorkouts.map((w, index) => (
              <div key={index} className="bg-white rounded-xl shadow flex items-center p-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{w.type}</p>
                  <div className="flex items-center flex-wrap text-sm text-gray-500 mt-1 space-x-4">
                    <Clock size={12} className="inline" /> <span>{w.duration} min</span>
                    <Flame size={12} className="inline" /> <span>{w.calories} cal</span>
                    <Target size={12} className="inline" /> <span>{w.intensity}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{w.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md mx-auto overflow-y-auto max-h-96">
            <h3 className="text-2xl font-bold text-center mb-4">Log New Workout</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Workout Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {workoutTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedWorkout(type)}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      selectedWorkout === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 45"
                className="w-full bg-gray-100 rounded-md p-2 text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Intensity</label>
              <div className="flex space-x-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm border ${
                      intensity === level ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 rounded-md py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWorkout}
                className="flex-1 bg-blue-600 text-white rounded-md py-2"
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}