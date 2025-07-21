import React, { useImperativeHandle, useState } from "react";

const EditProfileForm = React.memo(({ user, onSubmit, formRef }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName ||"Mohanlal",
    targetBmi: user.targetBmi || "21",
    location: user.location || "Rajasthan",
    height:  user.height || "5.8",
    weight: user.weight || "700",
    targetWeight: user.targetWeight || "180",
    age: user.age || 28,
  });

  useImperativeHandle(formRef, () => ({
    submit() {
      handleSubmit();
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    onSubmit(formData);
  };

  return (
    <form  onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="email">
          Target BMI
        </label>
        <input
          type="text"
          name="targetBmi"
          value={formData.targetBmi}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="height">
          Height
        </label>
        <input
          type="text"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="weight">
          Weight
        </label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="targetWeight">
          Target Weight
        </label>
        <input
          type="text"
          id="targetWeight"
          name="targetWeight"
          value={formData.targetWeight}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>
    </form>
  );
});

export default EditProfileForm;
