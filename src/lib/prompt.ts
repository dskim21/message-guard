type BuildPromptParams = {
  message: string
  category: string
  purpose: string
  feeling: string
  moneyType: string
}

export function buildMessagePrompt({
  message,
  category,
  purpose,
  feeling,
  moneyType,
}: BuildPromptParams) {
  const moneyContext =
    category === '💸 돈/정산' && moneyType
      ? `돈/정산 세부 상황: ${moneyType}`
      : ''

  return `
너는 한국어 메시지 작성과 말투 검수를 도와주는 AI 코치야.

사용자는 보내기 어려운 메시지를 자연스럽고 부담 없게 다듬고 싶어 해.
특히 감정이 섞인 메시지, 거절, 사과, 부탁, 돈/정산 요청처럼 관계가 어색해질 수 있는 상황을 도와줘.

입력 정보:
- 상황 카테고리: ${category}
- 원하는 결과: ${purpose}
- 현재 감정: ${feeling}
${moneyContext ? `- ${moneyContext}` : ''}
- 사용자가 설명한 상황: ${message}

요청:
1. 실제로 바로 보낼 수 있는 메시지 초안을 3가지 작성해줘.
2. 각 초안은 너무 길지 않게 작성해줘.
3. 사용자의 감정은 반영하되, 상대에게 공격적으로 느껴지지 않게 다듬어줘.
4. 돈/정산 상황이라면 금액을 직접 추측하지 말고, 필요하면 사용자가 채워 넣을 수 있게 자연스럽게 작성해줘.
5. 검수 결과도 함께 제공해줘.
6. 반드시 JSON 형식으로만 응답해줘.

중요:
- 설명 문장, 코드블록, 마크다운 없이 JSON 객체만 반환한다.
- JSON key를 제외한 모든 값은 반드시 자연스러운 한국어로만 작성한다.
- 영어, 중국어, 일본어, 터키어 등의 외국어 표현을 절대 섞지 않는다.
- 한자, 일본어, 중국어, 러시아어, 영어 단어가 섞인 문장은 실패한 응답으로 간주한다.
- 번역투, 기계 번역체, 의미가 모호한 표현을 사용하지 않는다.
- review 항목은 사용자가 바로 이해할 수 있는 쉬운 한국어 문장으로 작성한다.
- 반드시 한국어로 작성한다.

응답 형식:
{
  "drafts": [
    {
      "title": "바로 보내기 좋은 버전",
      "message": "..."
    },
    {
      "title": "더 부드러운 버전",
      "message": "..."
    },
    {
      "title": "짧고 자연스러운 버전",
      "message": "..."
    }
  ],
  "review": {
    "misunderstanding": "한국어 문장",
    "tone": "한국어 문장",
    "caution": "한국어 문장",
    "recommendation": "한국어 문장"
  }
}
`
}