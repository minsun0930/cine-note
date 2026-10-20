# CINENOTE

> 영화 검색 및 기록 사이트 (React)

> [서비스 바로가기](https://cine-note-opal.vercel.app/) | 
> [Figma 디자인 시안](https://www.figma.com/design/Pf2RbLZFqki0fBY2VLGvJ5/%EC%98%81%ED%99%94-%EA%B8%B0%EB%A1%9D-%EC%82%AC%EC%9D%B4%ED%8A%B8?node-id=0-1&t=6bGHhQ4DYJGJj3EV-1)

<img src="/src/assets/FinalDesign.png"/>



## 프로젝트 개요

- TMDB API를 활용하여 다양한 영화 데이터를 검색하고, 사용자가 직접 평점과 리뷰를 남기며 기록할 수 있는 영화 사이트입니다.
- 프론트엔드 기술인 React를 활용해 성능을 최적화하고, 사용자 중심의 매끄러운 검색 및 상태 관리 경험을 제공하는 데 중점을 두었습니다


## 제작 의도 및 설명

단순한 영화 검색 사이트를 넘어, 사용자가 직접 리뷰를 남기고 공유할 수 있는 영화 기록 사이트를 목표로 기획했습니다. 개인화된 리뷰와 평점 시스템을 구축하여 실질적인 사용자 경험을 제공하고자 했습니다.

특히, 마이페이지의 캘린더 기능을 통해 사용자가 남긴 영화 기록들이 날짜별로 시각화되어 채워지는 재미(잔디 굽기/기록형 UI)를 더함으로써, 서비스에 지속적으로 방문하고 몰입하게 만드는 재미 요소를 녹여냈습니다.



## 주요 기능 및 구현 내용

- 영화 데이터 연동 및 검색 [TMDB API 활용]
- 사용자 인증 및 리뷰 시스템 [Supabase 활용]
- 전역 상태 관리 [TanStack(React) Query 사용]
- UI/UX디자인 및 반응형 구현 [Tailwind Css 사용]
- 다크모드 구현


## 기술 스택 (Tech Stack)

- Front-end: React, TypeScript, Tailwind CSS
- State Management: React query(TanStack Query), Zustand
- Build/Deployment: Vite,Vercel
- Backend/DB: Supabase
- 영화 API: TMDB API


## 핵심 성과 및 트러블 슈팅 (Highlight)

- 외부 오픈 API 호출 시 발생할 수 있는 비동기 데이터 처리 지연을 최소화하고,
  컴포넌트 단위로 구조화를 통해 유지보수성과 확장성을 높인 클린 코드를 지향했습니다.
- Vercel을 통한 지속적 통합 및 배포(CI/CD) 파이프라인을 구축하여 실시간 서비스 배포 경험을 쌓았습니다.




## 주요 기술적 고민 및 해결 (Technical Challenges)

### 드래그 앤 드롭 버그 해결 (UX 개선):

- 문제: 마우스로 영화 슬라이더를 드래그하다 뗄 때, 의도치 않게 카드 클릭 이벤트가 발생해 상세페이지로 넘어가는 버그 발생
- 해결: `isDragged` 상태값을 정의하여 일정 픽셀 이상 이동했을 때만 '드래그'로 판정하고, 직후 클릭 이벤트가 발생하지 않도록 차단하여 UX 개선

### 폼 성능 최적화 및 유효성 검증:

- 문제: 로그인/회원가입 등 `input`이 많은 폼에서 입력 시마다 전체
  컴포넌트가 리렌더링되는 성능 저하 발생
- 해결: `React Hook Form`을 도입해 비제어 컴포넌트 방식으로 리렌더링을 최적화하고, `Zod`를 결합해 입력값 검증(Validation) 로직을 안전하게 구축
