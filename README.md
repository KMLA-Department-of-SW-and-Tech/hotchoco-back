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

## Project Documentation

프로젝트와 관련된 문서들은 `docs` 디렉토리에서 찾을 수 있습니다:

- [Firebase 모범 사례 가이드](docs/firebase-best-practices.md) - Firebase 초기화 및 서비스 사용에 대한 권장 사항