import { Heart } from "lucide-react";
import Button from "../common/Button";
import MovieSection from "./MovieSection";

export default function MovieDetail() {
  return (
    <div>
      <article className=" w-full bg-main/10 mb-10">
        <div className="max-w-325 w-full mx-auto py-12 flex justify-between px-4">
          <div className="max-w-150">
            <h1 className="font-bold text-3xl">오디세이</h1>
            <p className="text-sm text-gray-500 mb-10">영화 · The Odyssey · 2026</p>
            <p className="mb-9">
              10년간 이어진 트로이 전쟁을 승리로 이끈 영웅 '오디세우스'(맷
              데이먼)는 왕의 부재를 틈타 침탈과 권력 다툼이 벌어진 <br />
              왕국에서 그를 기다리고 있는 아내 '페넬로페'(앤 해서웨이)와 아들
              '텔레마코스'(톰 홀랜드)에게 돌아가기 위한 여정에 나선다. <br />
              그러나 신들의 분노를 산 그의 귀환 앞에는 거대한 폭풍과 괴물들,
              그리고 거스를 수 없는 운명의 시련이 기다리고 있는데… <br />
              "누구도 나의 귀향을 막을 수 없어. 신들조차도"
            </p>
            <div className="flex gap-2 mb-8">
              <Button className=" flex items-center gap-1">
                찜하기 <Heart className="inline-block w-4 h-4" />
              </Button>
              <Button variant="secondary">리뷰 남기기</Button>
            </div>
            
            <p className="mb-1"><span className="text-gray-400">감독</span> 크리스토퍼 놀란</p>
            <p><span className="text-gray-400">출연</span> 맷 데이먼</p>

          </div>
          <div
            className="w-65 aspect-2/3 object-cover bg-main"
            // src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            // alt={`${movie.title}`}
            // draggable={false}
          />
        </div>
      </article>

      <div className="max-w-325 w-full mx-auto px-4">
        <MovieSection
        title="이 작품과 유사한 영화"
        type="category"
        value="popular"
      />
      </div>
      
    </div>
  );
}
