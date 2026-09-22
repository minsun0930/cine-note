import { cn } from "@/lib/utils";
import { useRef, useState, type ChangeEvent, type ComponentProps } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps extends ComponentProps<"input"> {
  variant?: "hero" | "header";
  onSearch?: (query: string) => void;
  defaultValue?: string
}

const variantStyles: Record<
  NonNullable<SearchInputProps["variant"]>,
  { form: string; input: string; search: string }
> = {
  hero: {
    form: "max-w-[64cqw] py-[1.5cqw] px-[3cqw] rounded-[80px] ",
    input: "text-[1.5cqw]",
    search: "min-w-6 min-h-6"
  },
  //나중에 수정
  header: {
    form: "w-[280px] h-[32px] rounded-[10px] pr-2",
    input: "py-1 px-2 text-[12px]",
    search: "h-4 w-4",
  },
};

const SearchInput = ({
  variant = "hero",
  onSearch,
  className,
  defaultValue="",
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentStyles = variantStyles[variant];

  const [searchValue, setSearchValue] = useState(defaultValue);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex  justify-between items-center w-full bg-white border-2 border-gray-400 focus-within:border-main transition-colors gap-4",
        currentStyles.form,
      )}
    >
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "flex w-full flex-1 outline-none",
          currentStyles.input,
          className,
        )}
        onChange={handleInputChange}
        value={searchValue}
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
          className={cn(
            currentStyles.search,
            " text-gray-400 hover:text-main",
          )}
        />
      </button>
    </form>
  );
};
export default SearchInput;
