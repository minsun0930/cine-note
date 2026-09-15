import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "w-full border-t border-gray-200 bg-gray-50 py-8 text-gray-600 flex justify-center items-center",
        className,
      )}
    >
      <div className="max-w-325 w-full flex items-center justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-16 font-bold text-gray-900 mb-4">
            cien-note | 영화 기록 사이트
          </span>
          <p className="mb-4">
            조민선 <br/> 
            Frontend Developer <br/> 
            사용자 경험을 고민하고, 좋은 인터페이스를 만드는 개발자입니다.
          </p>
          <p className="text-12 text-gray-500">
            © {new Date().getFullYear()} cien-note. Built with React & Tailwind
            CSS.
          </p>
        </div>

        
        <nav
          aria-label="개발자 채널 링크"
          className="flex items-center gap-5 text-14"
        >
          <a
            href="mailto:cminsun0930@gmail.com"
            className="transition-colors hover:text-gray-900"
          >
            Email
          </a>
          <a
            href="https://github.com/minsun0930/cine-note"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-900"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
