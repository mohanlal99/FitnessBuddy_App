import { useState } from "react";

const useForm = (initialForm = {},onSubmit) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    onSubmit(form)
  }

  const reset = ()=>{
    setForm(initialForm)
  }

  return [form , handleChange , handleSubmit , reset] 
};


export default useForm