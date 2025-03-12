# Contributing

## 개발 환경 설정

### 필수 요구사항

- Node.js (v18 이상)
- npm (v11 이상)

### 기술 스택

- NestJS v11
- Firebase Admin SDK
- Class Validator & Transformer
- Swagger API 문서화
- Jest 테스트 프레임워크

### 개발 도구

- ESLint & Prettier를 통한 코드 스타일 관리
- Husky & lint-staged를 통한 커밋 전 코드 검사
- Jest를 통한 테스트 자동화

## 개발 명령어

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run start:dev     # 개발 서버 실행 (--watch 모드)
npm run start:debug   # 디버그 모드로 실행
```

### 린트 및 포맷팅

```bash
npm run lint        # ESLint 실행
npm run format      # Prettier 실행
```

### 테스트

```bash
npm run test        # 테스트 실행
npm run test:watch  # 테스트 감시 모드
npm run test:cov    # 테스트 커버리지 확인
npm run test:e2e    # E2E 테스트 실행
```

## Git 훅

- commit 전에 자동으로 lint 및 format 검사
- 테스트가 실패하면 push 불가
