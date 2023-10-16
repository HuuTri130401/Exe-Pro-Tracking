import { useEffect, useRef, useState } from "react";

export default function useHandleLazy(isLazy) {
  const clear = useRef(null);
  const [isLazyout, setisLazyout] = useState(false);
  useEffect(() => {
    if (isLazy) {
      setisLazyout(true);
      clearTimeout(clear.current);
    } else {
      clear.current = setTimeout(() => {
        setisLazyout(false);
      }, 500);
    }
  }, [isLazy]);
  return isLazyout;
}