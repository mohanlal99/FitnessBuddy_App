import { useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import useForm from "../hooks/useForm";

const CreateChallengesForm = ({ onSubmit, formRef }) => {
  const dispatch = useDispatch();

  const [formData, handleChange, , reset] = useForm({
    title: "",
    description: "",
    difficulty: "Easy",
    participants: 0,
    duration: 0,
    points: 0,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]:
  //       name === "participants" || name === "points" ? Number(value) : value,
  //   }));
  // };

  useImperativeHandle(formRef, () => ({
    submit() {
      handleSubmit();
    },
  }));

  const handleSubmit = () => {
    onSubmit(formData);
    reset()
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-2 border rounded h-24 resize-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="p-2 border rounded">
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="duration">
          Duration
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="points">
          Points
        </label>
        <input
          type="number"
          id="points"
          name="points"
          value={formData.points}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>
    </form>
  );
};

export default CreateChallengesForm;
