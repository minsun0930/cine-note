import { Heart } from "lucide-react";
import Button from "../common/Button";
import Skeleton from "../common/Skeleton";

export default function MovieDetailSkeleton() {


  return (
    <div>
      <article className=" w-full  mb-10 border-t border-b border-main">
        <div className="max-w-325 w-full mx-auto py-12 flex justify-between px-4">
          <div className="max-w-150">
            <Skeleton className="w-156 h-30 mb-12"/>
            <Skeleton className="w-156 h-37"/>
            
            <div className="flex gap-2 my-8">
              <Button className=" flex items-center gap-1">
                찜하기 <Heart className="inline-block w-4 h-4" />
              </Button>
              <Button variant="secondary">리뷰 남기기</Button>
            </div>

            <div className="mb-1">
              <span className="text-gray-400">감독</span> 
              <Skeleton className="h-6 w-156 mt-" />
            </div>
            <div>
              <span className="text-gray-400 ">출연</span>
              <Skeleton className="h-6 w-156 mt-2" />
            </div>

            <div>
            <Skeleton className="h-8 w-156 mt-8" />
            </div>
          </div>
          <Skeleton className="w-80 h-120 rounded-[10px]"/>
        </div>
      </article>

    </div>
  );
}
