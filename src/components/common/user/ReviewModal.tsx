import { useAuthStore } from "@/store/useAuthStore";
import { CircleUserIcon, X } from "lucide-react";
import Button from "../Button";
import type { Movie } from "@/types/movie";
// import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";

interface ReviewModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  // const [rating, setRating] = useState<number>(0);
  // const [hoverRating, setHoverRating] = useState<number>(0);
  // const [content, setContent] = useState<string>("");
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //왜 const user = useAuthStore() 이렇게 안쓰는 지 이해하기
  const user = useAuthStore((state) => state.user);
  // const queryClient = useQueryClient();

  if (!isOpen) return null;

  //왜 이렇게 가져오는지도 학습하기
  const nickname = 
    user?.user_metadata?.display_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "익명 사용자";

  const handleSubmit = async(e:React.SubmitEvent<HTMLFormElement> ) =>{
    e.preventDefault();

    // if(rating === 0){
    //   alert("별점을 선택해주세요.");
    //   return;
    // }

    // if(!content.trim()){
    //   alert("리뷰 내용을 입력해주세요.");
    //   return;
    // }

    // setIsSubmitting(true);

    // try {
      
    // }

    // if(error) throw error;

    // alert("리뷰가 성공적으로 등록되었습니다!");

    // queryClient.invalidateQueries({})
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed mx-auto inset-0 z-40 max-w-200 flex justify-center items-center rounded-[10px]"
    >
      <div className="w-full p-10 bg-white border border-gray-400 flex flex-col gap-2 rounded-[20px]">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-2">어벤져스</h1>
          <X className="w-6 h-6" onClick={onClose} />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <CircleUserIcon className="w-5 h-5" />
          <div className="font-semibold text-sm">{nickname}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>★ ★ ★ ★ ★</div>
          <div>
            <textarea
              className="min-h-44 w-full"
              placeholder="영화는 어떠셨나요? 솔직한 감상평을 남겨주세요."
            ></textarea>
          </div>
          <div className="flex">
            <Button variant="primary" type="submit">
              리뷰 남기기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
