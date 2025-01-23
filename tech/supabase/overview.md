

### 20250123
## supabase 개론

***Firebase***(2011)
출시 이후, BaaS (Backend as a Serivce) : 서버 없이도 앱을 출시할 수 있게 나온 백엔드 플랫폼
가입 인증이나 실시간 데이터베이스, 클라우드 등을 제공하여 개발 편의를 제공한다
- 다양한 서비스와 폭넓은 연동 지원
- 문서화가 잘 되어 있고 커뮤니티가 성숙
- ***NoSQL*** 기반 ~ 단순하게 사용할 수 있으나 복잡한 Query는 어렵다.
- 오픈소스가 아니며, 유저가 많아지면 비용이 많이 든다
- 앱 개발 친화적이나 웹 개발에는 적절하지 않음


***Supabase***(2020)
- ***PostgreSQL*** 기반으로 관계형 DB의 장점을 가지고 있다.
- 다양한 인증을 제공하며 파일 업로드 다양하게 구현 가능, 실시간성 필요 기능 제공
- ***오픈소스***라 자체 서버 구축이 가능하며, Firebase 대비 요금이 저렴하다 (보안상의 이유로 서버 구축을 직접할 떄 Vendor Lock in 이슈가 생기지 않는다)
- 아직 성숙하지 않은 커뮤니티며, 문서화가 부족하다.
- 비교적 적은 기능이지만, 개인 또는 소규모 팀이 풀스택 작업을 하는데 최적의 결정이 될 수 있음

- - -

## 대표적인 4가지 기능

<https://supabase.com/docs/guides/getting-started>

### Database

데이터베이스에 있는 데이터들을 살펴볼 수 있으며 insert, update, delete 등도 당연히 가능
이 중 'Database' 부분은 DB 관련한 모든 설정을 담당하는 곳이다
    table을 넣거나 수정, RLS 수정, 복제
    특정 시간마다 백업이나 특정 시점 원복
    migration이나 DB 관계 확인, SQL eidtor 사용 및 자주 쓰이는 query도 확인할 수 있음
    CSV나 엑셀 형태의 데이터를 import 하는 것도 가능하다.


### Authentication


### Storage

### Realtime


- - -


<pre>
<code>
    test
</code>
</pre>