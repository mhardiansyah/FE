/* eslint-disable prefer-const */
import { useState } from "react";

const useDislosure = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };


  return {isOpen, onOpen, onClose}
};


export default useDislosure