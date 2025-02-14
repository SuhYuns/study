# NEXT.js 기본 정리

*** 풀스택 개발에 최적화된 웹 프레임워크 ***
- 서버사이드 렌더링(SSR) : 서버 쪽에서 렌더링하여 화면 그대로 보여주는 방식, 즉 서버에서 만들어진 HTML을 받아와 화면을 그린다. 이러한 방식은 검색 엔진 크롤러에 친화적이기 때문에 SEO 최적화가 가능하다.
- React와 비슷한 문법 : Next.js는 React를 기반으로 한 프레임워크이기 때문에, 컴포넌트나 훅, 상태 관리 등 React의 모든 기능을 사용할 수 있다. 다만 브라우저에서 모든 페이지를 렌더링하는 CSR(클라이언트 사이드 렌더링) 방식의 React와 차이점을 보임.
- Next.js 만으로 자체 서버, API를 구축할 수 있다.


*** 프로젝트 생성하기 ***

<pre>
<code>
    npx create-next-app@latest 프로젝트명
</code>
</pre>


*** 프로젝트 구조 ***
next.sjs의 폴더는 route 구조(URL)와 동일하게 동작한다. 
- 일반 Route
- Dynamic Route ([ex] 'board/qna/[id]'와 같은 api로 상세페이지 구축)

*** 루트 내 파일들의 역할 ***
파일명에 따라 역할이 부여된다. 
- page.tsx(js) : Route 생성, 대표 파일이라고 할 수 있음. 
- layout.tsx(js) : 화면 레이아웃 생성, {chlidren} 부분에 하위 Route의 page.tsx 내용이 담김
- route.tsx(js) : HTTP API 구현할 때 사용, 이를 잘 활용하면 서버구축 없이 서버로 이용 가능. 서버에서 돌아가는 코드이기 때문에 route.tsx의 내용은 웹에서 접근이 불가능하다. 보안이 중요한 코드들은 이곳에 넣을 수 있으며, GET, POST, PUT, DELETE와 같은 method들을 정의해 API를 만들 수 있다. 
<pre>
<code>
    export async function GET(request: Request) {}
 
    export async function HEAD(request: Request) {}
    
    export async function POST(request: Request) {}
    
    export async function PUT(request: Request) {}
    
    export async function DELETE(request: Request) {}
    
    export async function PATCH(request: Request) {}
    
    // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
    export async function OPTIONS(request: Request) {}
</code>
</pre>

추가적으로 Next.js에서는 a태그 대신 Link 태그를 사용한다. 클라이언트 사이드 라우팅에 도움이 될 뿐더러 URL 정보도 알려줄 수 있기에 권장됨
<pre>
<code>
    import Link from 'next/link'

    export default function Page() {
        return <Link href="/board">board</Link>
    }
</code>
</pre>