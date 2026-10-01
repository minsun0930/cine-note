//Context 정의
import { createContext, type RefObject } from "react";

interface SliderContextType {
  isDragging: RefObject<boolean>
}

export const SliderContext = createContext<SliderContextType | null>(null);

