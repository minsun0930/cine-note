import MovieCalendar from "../MovieCalendar";
import Profile from "../Profile";

export default function MyPageSidebar() {
  

  return (
    <div className="md:max-w-70 w-full flex flex-col gap-6">
      <Profile />
      <MovieCalendar/>
    </div>
  );
}
