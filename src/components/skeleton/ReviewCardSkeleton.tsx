import { CircleUserIcon, EllipsisVerticalIcon } from "lucide-react";
import Skeleton from "./Skeleton";

export default function ReviewCardSkeleton() {
  return (
    <article className=" p-5 border rounded-[10px] max-w-70 bg-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 ">
          <CircleUserIcon className="w-5 h-5" />
          <Skeleton className="w-40 h-5" />
        </div>
        <EllipsisVerticalIcon className="w-4 h-4 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-2 ml-7 mt-1">
        <Skeleton className="w-40 h-5" />

        <Skeleton className="max-w-3xs h-16" />

        <div className="flex justify-between items-end gap-1  cursor-pointer">
          <Skeleton className="w-60 h-5" />
        </div>
      </div>
    </article>
  );
}
