import { useEffect, useState } from "react";

export const useIsMount = () => {
  const [isFirstRenderOver, setIsFirstRenderOver] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFirstRenderOver(true);
  }, []);
  return isFirstRenderOver;
};
