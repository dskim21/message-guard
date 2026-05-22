# 💬 Message Guard

보내기 어려운 메시지를 더 자연스럽게 다듬어주는 AI 메시지 코치 웹앱

돈·정산, 부탁, 거절, 사과처럼  
관계에 영향을 줄 수 있는 민감한 메시지를 단순 생성이 아니라  
**상황과 감정을 고려한 표현으로 보조하기 위해 만든 프로젝트입니다.**

사용자가 입력한 상황과 감정을 기반으로 메시지 초안을 생성하고,  
말투 검수·오해 가능성·추천 표현을 함께 제공할 수 있습니다.

🔗 **Live Demo**  
https://message-guard-phi.vercel.app/

---

## 📌 프로젝트 개요

### Why?

메시지 하나 보내는 것도 생각보다 어렵다고 느꼈습니다.

특히:

- 돈/정산 요청
- 부탁하기
- 거절하기
- 사과하기

같은 상황에서는

> “너무 세게 들리는 건 아닐까?”
> “상대가 부담스럽게 느끼진 않을까?”

를 고민하게 됩니다.

기존 AI 채팅은 매번 상황을 처음부터 설명해야 했고,  
특정 상황(정산, 부탁, 거절)에 맞는 말투 조절은 번거롭다고 느꼈습니다.

### Solution

Message Guard는 민감한 메시지 상황에서:

```txt
상황 입력
→ 감정 선택
→ 메시지 초안 생성
→ 말투 검수
→ 오해 가능성 체크
```

로 이어지는 **메시지 코칭 경험 루프**를 설계했습니다.

단순 문장 생성이 아니라,

> “이 정도 말투면 보내도 되겠다”

라는 심리적 확신을 제공하는 것이 목표였습니다.

---

## ✨ 핵심 기능

### 💬 AI Message Draft

입력한 상황과 목적에 맞는 메시지 초안을 제공합니다.

예:

- 부드러운 버전
- 단호한 버전
- 짧고 자연스러운 버전

단순 문장 변환이 아니라  
상황과 감정에 따른 말투 차이를 반영하도록 설계했습니다.

---

### 🙂 Emotion-based Tone

같은 상황이라도 감정에 따라 표현 방식이 달라집니다.

예:

- 😥 미안함
- 😤 답답함
- 😐 어색함
- 🙂 편안함

예시:

```txt
정산 요청 + 미안함
→ 조심스럽고 완곡한 표현

정산 요청 + 답답함
→ 부드럽지만 분명한 표현
```

사용자의 감정을 기반으로 표현 강도를 조절합니다.

---

### 💰 Money / Settlement Support

돈 이야기는 관계를 어색하게 만들 가능성이 높다고 판단해  
별도 카테고리로 강화했습니다.

지원 상황:

- 돈 보내달라고 하기
- 정산 리마인드
- 소액이라 말하기 애매함
- 계속 미루는 사람
- 모임/여행 정산
- 회사/팀 비용 정산
- 빌려준 돈 돌려받기

---

### 🧠 Tone Review

생성된 메시지에 대해:

- 오해 가능성
- 말투 온도
- 조심하면 좋은 표현
- 추천 한 줄

구조의 검수 결과를 제공합니다.

단순 “문장 추천”이 아니라,

> 왜 이런 표현이 더 적절한지

이해할 수 있도록 설계했습니다.

---

### 🛡 Fallback UX

무료 AI 모델 특성상 응답 실패 가능성을 고려했습니다.

AI 응답 실패 또는 품질 저하 시:

> 예시 결과(fallback)를 자동 제공

하도록 설계했습니다.

사용자가:

> “버튼 눌렀는데 아무 반응 없음”

을 경험하지 않도록 처리했습니다.

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### AI

- Groq API
- Llama 3.3 70B

### Prompt Engineering

- Structured JSON Response
- Emotion-based Prompt Design
- Tone Review Logic

### Deployment

- Vercel
- GitHub

### UI

- lucide-react

---

## 🏗 Architecture

```txt
User Input
    ↓
Emotion / Situation Selection
    ↓
Prompt Generation
    ↓
Groq API
    ↓
JSON Response
    ↓
Response Validation
    ↓
UI Rendering
```

Fallback 흐름:

```txt
AI Response Failure
    ↓
Fallback Result
    ↓
Service Continue
```

---

## 🚀 MVP 특징

- 무료 AI 환경 기반 MVP 설계
- 감정 기반 말투 조절
- 돈/정산 상황 특화
- 무료 모델 실패 대응 fallback UX
- Vercel 무료 배포
- 1~2주 MVP 범위 설계
- 추후 AI 모델 교체 가능한 구조 설계

---

## 🧠 Technical Decisions

### 왜 Groq API를 사용했는가?

초기에는 OpenRouter 무료 모델을 사용했습니다.

하지만:

- 404 (지원 종료 모델)
- 429 (Rate Limit)
- 외국어 혼합 응답
- 품질 편차

문제가 발생했습니다.

무료 환경을 유지하면서도  
더 안정적인 한국어 응답 품질을 제공하기 위해:

> Groq 기반 모델

로 전환했습니다.

---

### 왜 fallback UX를 구현했는가?

무료 AI 모델은:

- 응답 실패
- Rate Limit
- 품질 저하

문제가 자주 발생했습니다.

서비스가 멈추는 경험을 방지하기 위해:

```txt
AI 실패
→ 예시 결과 제공
```

구조를 설계했습니다.

---

### 왜 구조화된 JSON 응답을 사용했는가?

LLM 응답은 항상 일정한 형식을 보장하지 않습니다.

UI를 안정적으로 렌더링하기 위해:

- JSON 파싱
- 응답 구조 검증
- 예외 처리

구조를 적용했습니다.

추후 모델 변경 시에도:

> UI 수정 없이 재사용 가능

하도록 설계했습니다.

---

## 🔥 Troubleshooting

### 1. 무료 AI 모델 품질 불안정 문제

#### 문제

무료 모델 사용 시:

- 429 Rate Limit
- 외국어 혼합 응답
- 한국어 품질 저하

문제가 발생했습니다.

#### 원인

무료 모델 특성상  
가용성과 품질 안정성이 낮았습니다.

#### 해결

OpenRouter → Groq API 전환

fallback 결과 구조 추가

#### 배운 점

AI API는 항상 성공한다고 가정하면 안 되며,

실패 상황까지 포함해 UX를 설계해야 한다는 점을 경험했습니다.

---

### 2. JSON 응답 파싱 실패 문제

#### 문제

AI 응답이 Markdown 또는 설명 텍스트를 포함해 JSON 파싱 오류 발생

#### 원인

LLM 응답 형식이 항상 일정하지 않았습니다.

#### 해결

응답에서 JSON 부분만 안전하게 추출하는 로직 구현

#### 배운 점

AI 응답은 항상 예외 상황을 고려한 파싱 구조가 필요함을 이해했습니다.

---

### 3. Vercel 환경변수 설정 문제

#### 문제

로컬에서는 동작하지만 배포 후 AI 기능 미동작

#### 원인

Vercel은 로컬 `.env` 파일을 자동 배포 환경변수에 등록하지 않습니다.

#### 해결

Environment Variables에:

```txt
VITE_GROQ_API_KEY
```

등록

#### 배운 점

Frontend 배포 시 환경변수 관리가 서비스 동작에 직접적인 영향을 준다는 점을 경험했습니다.

---

## 📦 Project Setup

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## 🌱 Future Improvements

- 최근 검수 내역 저장
- 메시지 히스토리
- 상대 관계 기반 말투 추천
- 메시지 길이 옵션
- AI 품질 개선
- 모바일 UX 최적화

---

## 👩‍💻 Author

**Dasom Kim**

GitHub: https://github.com/dskim21

## 배포 링크

https://message-guard-phi.vercel.app/
