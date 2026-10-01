import { useContext } from "react";
import { SliderContext } from "./SliderContext";

//정의한 Context 객체 사용
export const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("MovieSlider 하위 컴포넌트에서만 사용할 수 있습니다.");
  }
  return context;
};
