import Skeleton from "../common/Skeleton";

interface MovieCardSkeletonProps {
  isGrid?: boolean;
}

export default function MovieCardSkeleton({ isGrid = false }: MovieCardSkeletonProps) {
  return (
    <article className={`relative flex flex-col  ${
        isGrid ? 'w-full' : 'shrink-0 w-45'
      }`}>
      <Skeleton className="w-full aspect-180/336 rounded-xl"/>
    </article>
  );
}