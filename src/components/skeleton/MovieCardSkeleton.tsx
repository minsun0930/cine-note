import Skeleton from "./Skeleton";

interface MovieCardSkeletonProps {
  isGrid?: boolean;
}

export default function MovieCardSkeleton({ isGrid = false }: MovieCardSkeletonProps) {
  return (
    <article className={`relative flex flex-col  ${
        isGrid ? 'w-full' : 'shrink-0 w-45'
      }`}>
      <Skeleton className="w-full aspect-2/3 rounded-xl"/>
    </article>
  );
}