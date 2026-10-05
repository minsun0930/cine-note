import { useAuthStore } from "@/hooks/auth/useAuthStore";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import Skeleton from "../skeleton/Skeleton";
import { useUserReviews } from "@/hooks/useReviewQeury";

export default function MovieCalendar() {
  const { user } = useAuthStore();
  const { data: reviews, isLoading } = useUserReviews(user?.id);

  if (isLoading) return <Skeleton className="w-full" />;

  const addContentToTile = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && reviews) {
      // 달력의 현재 칸 날짜를 'YYYY-MM-DD' 형식으로 변환
      const calendarDateStr = dayjs(date).format("YYYY-MM-DD");

      // 해당 날짜(created_at)에 작성된 리뷰가 있는지 찾기
      const matchedReviews = reviews.filter((review) =>
        review.created_at.startsWith(calendarDateStr),
      );

      if (matchedReviews.length === 0) return null;

      if (matchedReviews.length === 1) {
        return (
          <div className="absolute inset-1 overflow-hidden rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/w200${matchedReviews[0].poster_path}`}
              alt="포스터"
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
      return (
        <div className="absolute inset-1 overflow-hidden rounded-md">
          {/* 첫 번째 포스터 배경 */}
          <img
            src={`https://image.tmdb.org/t/p/w200${matchedReviews[0].poster_path}`}
            alt="포스터"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 두 번째 포스터는 살짝 겹쳐서 보이게 연출 */}
          <img
            src={`https://image.tmdb.org/t/p/w200${matchedReviews[1].poster_path}`}
            alt="포스터 2"
            className="absolute inset-x-1 top-1 bottom-0 object-cover rounded-md opacity-90 transform translate-x-1 translate-y-1 shadow-sm"
          />
          {/* 우측 하단에 총 몇 개인가요? 뱃지 표시 (+N) */}
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded-full z-10 font-bold">
            +{matchedReviews.length}
          </span>
        </div>
      );

   
      
    }
    return null;
  };

  return (
    <div className="flex-2 md:aspect-23/36 p-6 bg-white rounded-[10px] border shadow-sm">
      <h2 className="md:text-[18px] lg:text-xl font-bold mb-4">내 영화 기록</h2>
      <Calendar
        tileContent={addContentToTile}
        formatDay={(_, date) => date.getDate().toString()}
        className="w-full  border-none rounded-xl"
      />
    </div>
  );
}
