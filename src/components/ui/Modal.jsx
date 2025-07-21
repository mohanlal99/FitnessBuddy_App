import React, { useEffect } from "react";
import Box from "./Box";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({
  children,
  isOpen = false,
  onOpenChange,
  className = "",
  title = "",
  onSubmit,
  formRef,
  size='full',
  center = true,
}) => {

  const setSize = size==='xl'?'max-w-xl':size === "md" ? "max-w-md" :size == 'sm' ? 'max-w-sm max-h-sm': 'w-full'


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed z-20 top-0 left-0 w-full h-full p-3 py-12 md:p-12 bg-black/70 mx-auto overflow-hidden 
        transition-opacity duration-500 ease-in-out ${
          isOpen ? "flex opacity-100" : "flex opacity-0 pointer-events-none"
        } ${className}`}>
      <Box
        className={`${
          center ? "" : "flex-start"
        } mx-auto w-full ${setSize} relative bg-white min-h-full transition-transform overflow-hidden duration-500 ease-in-out transform ${
          isOpen ? "translate-y-0" : "translate-y-10"
        }`}>
        <h2 className="text-2xl text-center  font-semibold">{title}</h2>
        <span
          onClick={onOpenChange}
          className="absolute right-0 top-0 bg-black/10 p-2 rounded-full m-1 cursor-pointer hover:bg-black/20 hover:text-rose-500">
          <X />
        </span>
        <div className="overflow-auto h-full w-full px-5  pb-20 bg-white">
          {children}
        </div>

        <div className="absolute bottom-0 left-0 w-full grid grid-cols-2 gap-2 p-2">
          <Button onClick={onOpenChange} color="red" className={`w-full1 ${!onSubmit && !formRef && 'col-span-2'}`}>
            Cancel
          </Button>
          {onSubmit&&<Button onClick={onSubmit} size="md" className="w-full">
            Submit
          </Button>}
          {formRef&&
          <Button onClick={()=>formRef.current.submit()} size="md" className="w-full">
            Submit
          </Button>
          }
        </div>
      </Box>
    </div>
  );
};

export default Modal;
