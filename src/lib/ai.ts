import type { Result } from '../types/message'
import { buildMessagePrompt } from './prompt'

type GenerateMessageParams = {
  message: string
  category: string
  purpose: string
  feeling: string
  moneyType: string
}

// AI 응답에서 JSON 부분만 안전하게 추출
function extractJson(content: string) {
  const jsonStart = content.indexOf('{')
  const jsonEnd = content.lastIndexOf('}')

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('AI 응답에서 JSON을 찾지 못했어요.')
  }

  return content.slice(jsonStart, jsonEnd + 1)
}

// AI 응답이 화면에서 사용할 수 있는 구조인지 검사
function isValidResult(data: unknown): data is Result {
  if (!data || typeof data !== 'object') return false

  const result = data as Result

  return (
    Array.isArray(result.drafts) &&
    result.drafts.length > 0 &&
    result.drafts.every(
      (draft) =>
        typeof draft.title === 'string' &&
        typeof draft.message === 'string',
    ) &&
    typeof result.review?.misunderstanding === 'string' &&
    typeof result.review?.tone === 'string' &&
    typeof result.review?.caution === 'string' &&
    typeof result.review?.recommendation === 'string'
  )
}

// Groq를 사용해 메시지 초안과 검수 결과를 생성
export async function generateMessageDrafts({
  message,
  category,
  purpose,
  feeling,
  moneyType,
}: GenerateMessageParams): Promise<Result> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  // API key 확인
  if (!apiKey) {
    throw new Error('Groq API key가 설정되지 않았어요.')
  }

  // 프롬프트 생성
  const prompt = buildMessagePrompt({
    message,
    category,
    purpose,
    feeling,
    moneyType,
  })

  // Groq API 요청
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        // model: 'openai/gpt-oss-120b',
        // model: 'llama-3.3-70b-versatile',
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              '너는 한국어 메시지 작성 전문가다. 반드시 한국어만 사용한다. JSON key를 제외한 모든 값에는 영어, 중국어, 일본어, 한자, 러시아어, 특수 외국어를 절대 쓰지 않는다. 자연스럽고 쉬운 한국어 문장만 작성한다. 이를 지키지 못하면 실패한 응답이다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    },
  )

  // API 실패 처리
  if (!response.ok) {
    const errorText = await response.text()

    console.error('Groq API error:', response.status, errorText)

    throw new Error('AI 응답 생성에 실패했어요.')
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  // 응답 내용이 비어 있는 경우
  if (!content) {
    throw new Error('AI 응답이 비어 있어요.')
  }

  // AI 응답에서 JSON 부분만 추출
  const jsonText = extractJson(content)

  // 추출한 JSON 파싱
  const parsed = JSON.parse(jsonText)

  if (!isValidResult(parsed)) {
    throw new Error('AI 응답 형식이 올바르지 않아요.')
  }

  // 정상 응답 반환
  return parsed
}