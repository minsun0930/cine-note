interface MovieCardSkeletonProps {
  isGrid?: boolean;
}

export default function MovieCardSkeleton({ isGrid = false }: MovieCardSkeletonProps) {
  return (
    <article className={`relative flex flex-col animate-pulse ${
        isGrid ? 'w-full' : 'shrink-0 w-44'
      }`}>
      <div className="w-full aspect-2/3 bg-gray-700/50 rounded-xl" />
    </article>
  );
}