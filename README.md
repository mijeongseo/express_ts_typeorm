# Back Server Configuration

다중 데이터베이스와 연결되도록 설정

## 개발 환경

-   Framework : Express.js (+typescript)
-   Orm : Typerom
-   Database : Mysql

## 시작하기

### 환경변수 파일 생성

```
.env.local => 로컬 서버에서 실행 시
.env.development => 개발용 서버에서 실행 시
.env.production => 배포용 서버에서 실행 시
```

```
.env.*

DB_PASSWORD=DB 패스워드
DB_USERNAME=root
DB_HOST=localhost
DB_DATABASE=DB 이름
```

### 서버 실행

```
# 의존성 설치
npm install

# 로컬 서버 실행 (3005 포트)
npm run local

# 개발 서버 실행 (3005 포트)
npm run dev

# 실제 서버 실행 (기본 3000 포트)
npm run build:start

※ 실제 서버(개발용 또는 배포용)에 실행 시, pm2 설치 및 설정 필요

```
