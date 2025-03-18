# Firebase 모범 사례 가이드

## 초기화

Firebase 서비스는 반드시 앱이 완전히 초기화된 후에 사용해야 합니다. 초기화는 `AppModule`의 `constructor`에서 수행됩니다:

```typescript
// src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, firebaseConfig],
    }),
    // ...other imports
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    initializeFirebase(this.configService);
  }
}
```

## Firebase 서비스 사용

### 지연 초기화 (Lazy Initialization)

Firebase의 각 서비스(Firestore, Auth, Storage 등)를 사용할 때는 지연 초기화 패턴을 사용해야 합니다. 이는 다음과 같은 이점이 있습니다:

1. 안정성: Firebase 앱이 완전히 초기화된 후에만 서비스가 사용됩니다.
2. 성능: 실제로 필요한 시점에만 서비스 인스턴스가 생성됩니다.

### 예시

```typescript
// ❌ 잘못된 방법: 즉시 초기화
export class SomeService {
  private readonly auth = getAuth();
  private readonly firestore = getFirestore();
  private readonly storage = getStorage();
}

// ✅ 권장하는 방법: 지연 초기화
export class SomeService {
  private get auth() {
    return getAuth();
  }

  private get firestore() {
    return getFirestore();
  }

  private get storage() {
    return getStorage();
  }
}
```

### 설명

지연 초기화를 사용하면:

- Firebase 앱이 완전히 초기화되기 전에 서비스를 사용하려고 시도하는 것을 방지할 수 있습니다.
- 각 서비스는 실제로 필요한 시점에만 초기화되므로 리소스를 효율적으로 사용할 수 있습니다.
- 코드의 안정성과 신뢰성이 향상됩니다.

## 환경 변수 설정

Firebase를 사용하기 위해서는 다음 환경변수들이 반드시 설정되어 있어야 합니다:

```plaintext
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

이 값들은 Firebase Console의 프로젝트 설정 > 서비스 계정에서 확인할 수 있습니다.
