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
- <mark>비교적 적은 기능이지만, 개인 또는 소규모 팀이 풀스택 작업을 하는데 최적의 결정이 될 수 있음</mark>

- - -

## 대표적인 4가지 기능

<https://supabase.com/docs/guides/getting-started>

### Database

데이터베이스에 있는 데이터들을 살펴볼 수 있으며 insert, update, delete 등도 당연히 가능.
이 중 'Database' 부분은 DB 관련한 모든 설정을 담당하는 곳이다.
    
- table을 넣거나 수정, RLS 수정, 복제
- 특정 시간마다 백업이나 특정 시점 원복
- migration이나 DB 관계 확인, SQL eidtor 사용 및 자주 쓰이는 query도 확인할 수 있다
- CSV나 엑셀 형태의 데이터를 import 하는 것도 가능하다.


### Authentication

매직 링크나 OTP, social login, SSO 등 다양한 형식의 인증 제공
Authentication(JWTs 사용)[누구인지 식별, 로그인]과 Authorization(RLS 사용)[특정 리소스에 대한 사용권한 식별].

회원 가입한 유저들(provider) 확인할 수 있으며, 특정 유저를 삽입할 수도 있다.
이메일 보내는 갯수를 제한하는 Rate Limit이나 Email template를 사용하여 각 상황별로 이메일을 보내도록 설정하는 것도 가능함.


### Storage

다양한 파일 형식을 다룰 수 있다. 
기본적인 업로드 기능을 포함하여 이미지 최적화 등 고급 기능을 가지고 있음.
버킷은 파일들을 관리하는 하나의 통이라고 생각하면 편한데, 여기에 파일들을 넣어줄 수 있음

### Realtime

메세지를 보내거나 받는 등의 실시간 데이터 변화를 추적 가능
- boradcast : 공지사항 등
- presence : 유저 접속 여부
- Postgres change : 데이터 변화 감지


- - -


## supabase 기본 문법

supabase 패키지 설치
<pre>
<code>
    npm install @supabase/supabase-js
</code>
</pre>

supabase 클라이언트 생성
<pre>
<code>
    import { createClient } from '@supabase/supabase-js'

    // Create a single supabase client for interacting with your database
    const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
</code>
</pre>


각 섹션의 상단은 javascript 내에서 쓰는 코드
하단에는 SQL Editor에서 쓰는 형식을 가져옴.

### select 쿼리 정리

기본 select 쿼리
<pre>
<code>
    const { data, error } = await supabase
    .from('testing')
    .select('*')
</code>
</pre>
<pre>
<code>
    select * from testing
</code>
</pre>


특정 필드만 쿼리
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .select('name')
</code>
</pre>

다른 테이블 join
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .select(`
        name,
        cities (
        name
        )
    `)
</code>
</pre>

결과 갯수 카운트 처리
<pre>
<code>
    const { count, error } = await supabase
    .from('countries')
    .select('*', { count: 'exact', head: true })
</code>
</pre>

JSON 필드 쿼리
<pre>
<code>
    const { data, error } = await supabase
    .from('users')
    .select(`
        id, name,
        address->city
    `)
</code>
</pre>

복잡한 검색 기능 구현
<pre>
<code>
    const { data, error } = await supabase
    .from('quotes')
    .select('catchphrase')
    .textSearch('catchphrase', `'fat or cat'`, {
        type: 'websearch',
        config: 'english'
    })
</code>
</pre>

### insert 쿼리 정리

데이터 삽입
<pre>
<code>
    const { error } = await supabase
    .from('testing')
    .insert({ id: 1, name: 'HyoJoo', age: 24 })
</code>
</pre>
<pre>
<code>
    INSERT INTO testing (id, name, age)
    VALUES (1, 'HyoJoo', 24);
</code>
</pre>

데이터 삽입 후 결과 반환
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .insert({ id: 1, name: 'Denmark' })
    .select()
</code>
</pre>

한 번에 여러 row 삽입
<pre>
<code>
    const { error } = await supabase
    .from('testing')
    .insert([
        { id: 2, name: 'MoJoo', age: 22 },
        { id: 3, name: 'BaJoo', age: 27 },
        { id: 4, name: 'MyungJoo', age: 30 },
    ])
</code>
</pre>
<pre>
<code>
    INSERT INTO testing (id, name, age)
    VALUES (2, 'MoJoo', 22), (3, 'BaJoo', 27), (4, 'MyungJoo', 30);
</code>
</pre>

### update 쿼리 정리

Row 업데이트
<pre>
<code>
    const { error } = await supabase
    .from('testing')
    .update({ name: 'Dayoon' })
    .eq('id', 3)
</code>
</pre>
<pre>
<code>
    UPDATE testing
    SET name = 'Dayoon'
    WHERE id = 3;
</code>
</pre>

업데이트 후 결과 반환
<pre>
<code>
    const { data, error } = await supabase
    .from('testing')
    .update({ name: 'Dayun' })
    .eq('id', 3)
    .select()
</code>
</pre>
<pre>
<code>
    UPDATE testing
    SET name = 'Dayun'
    WHERE id = 3
    RETURNING *;
</code>
</pre>

JSON 데이터 업데이트
<pre>
<code>
    const { data, error } = await supabase
    .from('users')
    .update({
        address: {
        street: 'Melrose Place',
        postcode: 90210
        }
    })
    .eq('address->postcode', 90210)
    .select()
</code>
</pre>

### upsert 쿼리 정리
upsert : 있으면 update, 없으면 insert하는 것을 말함.


한 row upsert 쿼리
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .upsert({ id: 1, name: 'Albania' })
    .select()
</code>
</pre>

한 번에 여러 row upsert 쿼리
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .upsert([
        { id: 1, name: 'Albania' },
        { id: 2, name: 'Algeria' },
    ])
    .select()
</code>
</pre>

id가 아닌 다른 필드로 Upsert
<pre>
<code>
    const { data, error } = await supabase
    .from('users')
    .upsert({ id: 42, handle: 'saoirse', display_name: 'Saoirse' }, { onConflict: 'handle' })
    .select()
</code>
</pre>

### Delete 쿼리 정리

한 row delete
<pre>
<code>
    const response = await supabase
    .from('countries')
    .delete()
    .eq('id', 1)
</code>
</pre>

delete 후 결과 반환
<pre>
<code>
    const { data, error } = await supabase
    .from('countries')
    .delete()
    .eq('id', 1)
    .select()
</code>
</pre>

여러 row 제거
<pre>
<code>
    const response = await supabase
    .from('countries')
    .delete()
    .in('id', [1, 2, 3])
</code>
</pre>



- - -


<pre>
<code>
    test
</code>
</pre>