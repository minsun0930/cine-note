import { useUserReviews } from "@/hooks/useMovieQuery";
import Calendar from "react-calendar";

export default function MovieCalendar() {
  const {data: reviews, isLoading, isError} = useUserReviews(user?.id)

  return(
    <div>
      <h2>나만의 영화 기록 캘린더</h2>
      <Calendar 
        tileContent = {addContentToTitle}
        className="w-full border-none"
      />
    </div>
  )
}