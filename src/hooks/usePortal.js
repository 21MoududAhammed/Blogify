import { createPortal } from "react-dom";

// usePortal is a hook which returns a wrapper component which will show the modal 
const usePortal = () => {
  const Portal = ({ children }) => {
    return createPortal(children, document.body);
  };

  return { Portal };
};

export default usePortal;


