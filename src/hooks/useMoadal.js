import { useState } from "react";

const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const onOpenChange = ()=>{
    setIsOpen(false)
  }
  return [isOpen , onOpen , onOpenChange]
};


export default useModal