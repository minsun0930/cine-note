import { cn } from "@/lib/utils";
import { useRef, useState, type ChangeEvent, type ComponentProps } from "react";
import {Search, X } from "lucide-react";
import { useRecentSearchStore } from "@/hooks/useRecentSearchStore";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchMovies } from "@/hooks/useMovieQuery";

interface SearchInputProps extends ComponentProps<"input"> {
  variant?: "hero" | "header";
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

const variantStyles: Record<
  NonNullable<SearchInputProps["variant"]>,
  { form: string; input: string; search: string; openForm: string }
> = {
  hero: {
    form: "max-w-[90cqw] md:max-w-[500px]  lg:max-w-[64cqw] py-[1cqw] px-[1cqw] rounded-t-[80px] rounded-b-[80px]",
    input: "text-[2cqw] md:text-[1.5cqw]",
    search: "w-[3cqw] h-[3cqw] w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2",
    openForm: "rounded-t-[20px] rounded-b-none border-main shadow-md z-50",
  },
  header: {
    form: "ml-2 max-w-[280px] w-full h-[32px] rounded-t-[10px] rounded-b-[10px] pr-2 mr-0",
    input: "py-1 px-4 text-[12px]",
    search: "h-4 w-4",
    openForm: "  rounded-t-[10px] rounded-b-none border-main shadow-md z-50",
  },
};

const SearchInput = ({
  variant = "hero",
  onSearch,
  className,
  defaultValue = "",
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentStyles = variantStyles[variant];

  const [searchValue, setSearchValue] = useState(defaultValue);
  const debouncedKeyword = useDebounce(searchValue, 300);

  const {
    isOpen: isFocused,
    setIsOpen: setIsFocused,
    ref: formRef,
  } = useOutsideClick<HTMLFormElement>();
  const { recentSearches, addSearch, removeSearch, clearAll } =
    useRecentSearchStore();

  const { movies, isLoading } = useSearchMovies(debouncedKeyword);
  const autocompleteMovies = movies.slice(0, 5);

  const handleExecuteSearch = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    addSearch(trimmed);
    onSearch?.(trimmed);
    setIsFocused(false);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleRemoveOne = (e: React.MouseEvent, target: string) => {
    e.stopPropagation();
    removeSearch(target);
  };

  const isDropdownOpen = isFocused;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        "box-border relative flex justify-between items-center w-full bg-white border border-gray-400 transition-colors gap-4 dark:bg-dark-bg dark:border-main  ",
        currentStyles.form,
        isDropdownOpen && currentStyles.openForm,
      )}
    >
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "flex p-2 w-full  flex-1 outline-none dark:text-gray-300",
          currentStyles.input,
          className,
        )}
        onChange={handleInputChange}
        value={searchValue}
        onFocus={() => setIsFocused(true)}
        placeholder="기록하고 싶은 영화를 검색하세요."
        {...props}
      />
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="입력 내용 지우기"
          className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <button type="submit" aria-label="검색" className="flex cursor-pointer">
        <Search
          className={cn(currentStyles.search, " text-gray-400 hover:text-main")}
        />
      </button>

      {isDropdownOpen && (
        <div className=" absolute -left-px  right-[-0.75px] top-full bg-white border-x border-b border-main rounded-b-2xl shadow-md overflow-hidden z-50 dark:bg-dark-bg ">
          <div className="border-t border-gray-100 mx-3 my-1 dark:border-gray-500" />

          <div className="p-3 text-sm min-h-32.5 max-h-60 overflow-y-auto">
            {!searchValue.trim() ? (
              <>
                <div className="flex justify-between items-center pb-2 px-1 text-xs text-gray-400 font-medium">
                  <span>최근 검색어</span>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="hover:underline text-[11px] text-gray-400 cursor-pointer"
                    >
                      전체 삭제
                    </button>
                  )}
                </div>
                {recentSearches.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs text-gray-400">
                    최근 검색어가 없습니다.
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {recentSearches.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          setSearchValue(item);
                          handleExecuteSearch(item);
                        }}
                        className="flex justify-between items-center py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer text-gray-700 text-xs group"
                      >
                        <span className="truncate">{item}</span>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveOne(e, item)}
                          className="text-gray-300 hover:text-gray-600 px-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <div className="pb-2 px-1 text-xs text-gray-400 font-medium">
                  <span>영화 자동완성</span>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center h-20 text-xs text-gray-400">
                    검색 중...
                  </div>
                ) : autocompleteMovies.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs text-gray-400">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {autocompleteMovies.map((movie) => {
                      // 개봉 연도 추출 (YYYY-MM-DD 형태에서 연도만 추출)
                      const releaseYear = movie.release_date
                        ? ` (${movie.release_date.split("-")[0]})`
                        : "";

                      return (
                        <li
                          key={movie.id}
                          onClick={() => {
                            setSearchValue(movie.title);
                            handleExecuteSearch(movie.title);
                          }}
                          className="flex items-center py-2 px-2 hover:bg-gray-50 rounded cursor-pointer text-gray-800 text-xs gap-2 group"
                        >
                          <span className="truncate flex-1 font-medium">
                            {movie.title}
                            <span className="text-gray-400 font-normal">
                              {releaseYear}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
export default SearchInput;
