import { CircleUserIcon, EllipsisVerticalIcon, Heart } from "lucide-react";

export default function ReviewCard() {
  return (
    <article className=" p-5 border rounded-[10px] max-w-70 bg-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 ">
          <CircleUserIcon className="w-5 h-5" />
          <div className="font-semibold text-[16px]">nickname</div>
        </div>
        <EllipsisVerticalIcon className="w-4 h-4 cursor-pointer" />
      </div>

      <div className="ml-7">
        <div>★★★★★</div>

        <div className="my-2 text-sm">
          올해의 명작올해의 명작올해의 명작올해의 명작올해의 명작올해의
          명작올해의 명작올해의 명작
        </div>

        <div className="flex justify-between items-end gap-1  cursor-pointer">
          <div className="text-[10px] text-gray-600 mb-">2025.10.04</div>
          <div className="flex gap-1">
            <span className="flex items-center">2</span>
            <span className="flex items-center">
              <Heart className=" w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
