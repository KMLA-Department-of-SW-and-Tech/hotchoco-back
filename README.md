# HotChoco Backend

## 소개

HotChoco의 백엔드 서버입니다.

- NestJS 기반의 REST API 서버
- Firebase Authentication을 통한 사용자 인증

## 주요 기능

- 사용자 관리
  - 프로필 관리
  - Firebase 기반 인증
- 그룹 관리
  - 그룹 생성 및 관리
  - 멤버 권한 관리
- 게시판 시스템
  - 게시판 생성 및 관리
  - 게시글 및 댓글
  - 게시물 반응

## 시작하기

1. 환경 변수 설정

```bash
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

2. 실행

```bash
npm install
npm run start:dev
```
