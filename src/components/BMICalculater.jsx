import { useState } from 'react';
import { Calculator, Target } from 'lucide-react';

export default function BMICalculator({ onBMICalculated }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;

    if (weightKg && heightM) {
      const calculatedBMI = weightKg / (heightM * heightM);
      const roundedBMI = Math.round(calculatedBMI * 10) / 10;

      setBmi(roundedBMI);

      let bmiCategory = '';
      if (roundedBMI < 18.5) {
        bmiCategory = 'Underweight';
      } else if (roundedBMI < 25) {
        bmiCategory = 'Normal weight';
      } else if (roundedBMI < 30) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }

      setCategory(bmiCategory);
      onBMICalculated?.(roundedBMI, bmiCategory);
    }
  };

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getHealthTips = (category) => {
    switch (category) {
      case 'Underweight':
        return 'Consider increasing calorie intake with nutrient-dense foods and strength training.';
      case 'Normal weight':
        return 'Maintain your current weight with balanced diet and regular exercise.';
      case 'Overweight':
        return 'Focus on portion control, cardio exercises, and strength training.';
      case 'Obese':
        return 'Consult with a healthcare provider for a comprehensive weight management plan.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mb-6">
      <div className="flex items-center mb-6">
        <Calculator size={24} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800 ml-3">BMI Calculator</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            placeholder="e.g., 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-gray-100 rounded-md px-4 py-2 text-gray-800 focus:outline-none"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            placeholder="e.g., 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-gray-100 rounded-md px-4 py-2 text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Your BMI</p>
            <p className={`text-3xl font-bold mb-1 ${getBMIColor(bmi)}`}>{bmi}</p>
            <p className={`text-base font-semibold ${getBMIColor(bmi)}`}>{category}</p>
          </div>

          <div className="mb-6">
            {[
              { label: 'Underweight', range: '<18.5', color: 'bg-blue-500' },
              { label: 'Normal', range: '18.5–24.9', color: 'bg-green-500' },
              { label: 'Overweight', range: '25.0–29.9', color: 'bg-yellow-500' },
              { label: 'Obese', range: '≥30.0', color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center mb-2">
                <span className={`w-4 h-4 rounded-full mr-3 ${item.color}`} />
                <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                <span className="text-xs text-gray-500">{item.range}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center mb-2">
              <Target size={16} className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-700 ml-2">Health Tips</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {getHealthTips(category)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
