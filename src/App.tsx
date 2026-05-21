import { useRef, useState } from 'react'
import { categories, feelings, moneyOptions, purposes } from './data/options'
import { getDummyResult } from './data/dummyResults'
import { generateMessageDrafts } from './lib/ai'
import type { Result, Review } from './types/message'

function App() {
  // 입력값 상태
  const [message, setMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState('')
  const [selectedFeeling, setSelectedFeeling] = useState('')
  const [selectedMoneyType, setSelectedMoneyType] = useState('')

  // 생성 결과 및 로딩 상태
  const [result, setResult] = useState<Result | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // AI 안내/에러 메시지
  const [errorMessage, setErrorMessage] = useState('')

  // 결과 영역으로 스크롤하기 위한 ref
  const resultRef = useRef<HTMLDivElement | null>(null)

  const isMoneyCategory = selectedCategory === '💸 돈/정산'

  // 필수 입력값이 모두 채워졌는지 확인
  const isFormValid =
    message.trim() !== '' &&
    selectedCategory !== '' &&
    selectedPurpose !== '' &&
    selectedFeeling !== '' &&
    (!isMoneyCategory || selectedMoneyType !== '')

  // 생성 버튼 클릭 시 AI 결과 요청, 실패하면 더미 결과 표시
  const handleGenerate = async () => {
    // 로딩 시작
    setIsLoading(true)

    // 기존 결과 초기화
    setResult(null)

    // 기존 안내 메시지 초기화
    setErrorMessage('')

    try {
      const aiResult = await generateMessageDrafts({
        message,
        category: selectedCategory,
        purpose: selectedPurpose,
        feeling: selectedFeeling,
        moneyType: selectedMoneyType,
      })

      setResult(aiResult)
    } catch (error) {
      console.error(error)

      const fallbackResult = getDummyResult({
        category: selectedCategory,
        moneyType: selectedMoneyType,
        feeling: selectedFeeling,
      })

      setResult(fallbackResult)

      // 화면용 안내 메시지 설정
      setErrorMessage(
        'AI 응답이 불안정해서 예시 결과를 보여드렸어요.',
      )
    } finally {
      setIsLoading(false)

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F7FF] px-4 py-10 text-[#2D2520]">
      <div className="mx-auto max-w-[920px]">
        {/* 상단 소개 영역 */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-bold text-[#5865F2]">
            한줄검수 · Message Guard
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            보내기 전,
            <br />
            말투부터 확인해보세요.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6B6F82]">
            어색한 답장, 미안한 거절, 조심스러운 부탁까지.
            AI가 자연스럽고 덜 부담스러운 문장으로 다듬어줘요.
          </p>
        </div>

        {/* 말풍선 미리보기 카드 */}
        <div className="mb-8 rounded-[32px] border border-[#DFE4FF] bg-white/85 p-5 shadow-[0_16px_50px_rgba(88,101,242,0.12)] backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF8A7A]" />
            <span className="h-3 w-3 rounded-full bg-[#FFD166]" />
            <span className="h-3 w-3 rounded-full bg-[#8BD8BD]" />
            <p className="ml-2 text-xs font-semibold text-[#8A90A8]">
              미리보기
            </p>
          </div>

          <div className="space-y-4">
            <div className="max-w-[78%] rounded-3xl rounded-bl-md bg-[#EEF1FF] px-5 py-4 text-sm leading-6 text-[#34384A]">
              나 오늘 약속 못 갈 것 같아 ㅠㅠ
            </div>

            <div className="ml-auto max-w-[82%] rounded-3xl rounded-br-md bg-[#5865F2] px-5 py-4 text-sm leading-6 text-white shadow-[0_8px_20px_rgba(88,101,242,0.22)]">
              오늘 갑자기 일정이 생겨서 약속을 미뤄야 할 것 같아. 너무
              미안해. 대신 괜찮은 날 다시 맞춰볼 수 있을까?
            </div>

            <div className="max-w-[80%] rounded-3xl rounded-bl-md border border-[#DFE4FF] bg-white px-5 py-4 text-sm leading-6 text-[#5E647A]">
              검수 결과: 미안함은 잘 전달돼요. 다만 대안 날짜를 함께 제안하면
              더 자연스럽고 책임감 있어 보여요.
            </div>
          </div>
        </div>

        {/* 입력 폼 카드 */}
        <div className="rounded-[32px] border border-[#DFE4FF] bg-white p-6 shadow-[0_16px_50px_rgba(88,101,242,0.12)] sm:p-8">
          <label className="mb-3 block text-sm font-bold">
            어떤 메시지를 보내야 하나요?
          </label>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-36 w-full resize-none rounded-[24px] border border-[#DFE4FF] bg-[#FBFCFF] p-4 text-sm leading-6 outline-none transition-all duration-200 placeholder:text-[#A8AEC7] focus:border-[#5865F2] focus:bg-white"
            placeholder="예: 친구가 정산금을 아직 안 보냈는데 너무 정색하진 않게 말하고 싶어요."
          />

          <OptionGroup
            title="어떤 상황인가요?"
            items={categories}
            selectedItem={selectedCategory}
            onSelect={(item) => {
              setSelectedCategory(item)

              // 돈/정산이 아닌 카테고리로 바꾸면 세부 선택 초기화
              if (item !== '💸 돈/정산') {
                setSelectedMoneyType('')
              }
            }}
          />

          {selectedCategory === '💸 돈/정산' && (
            <OptionGroup
              title="어떤 상황에 가까운가요?"
              items={moneyOptions}
              selectedItem={selectedMoneyType}
              onSelect={setSelectedMoneyType}
            />
          )}

          <OptionGroup
            title="원하는 결과는?"
            items={purposes}
            selectedItem={selectedPurpose}
            onSelect={setSelectedPurpose}
          />

          <OptionGroup
            title="지금 내 기분은?"
            items={feelings}
            selectedItem={selectedFeeling}
            onSelect={setSelectedFeeling}
          />

          <button
            type="button"
            disabled={!isFormValid || isLoading}
            onClick={handleGenerate}
            className="mt-8 w-full rounded-[24px] bg-[#5865F2] px-5 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4452E5] hover:shadow-[0_10px_24px_rgba(88,101,242,0.28)] disabled:cursor-not-allowed disabled:bg-[#C7CCF8] disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? '말투 다듬는 중...' : '한줄검수 시작하기'}
          </button>
        </div>

        {/* 로딩 중 표시 영역 */}
        {isLoading && <LoadingCard />}

        {/* AI 안내 메시지 */}
        {errorMessage && (
          <section className="mt-6 rounded-[24px] border border-[#DFE4FF] bg-[#F8FAFF] px-5 py-4 shadow-[0_8px_24px_rgba(88,101,242,0.08)]">
            <p className="text-sm font-medium text-[#5865F2]">
              💡 {errorMessage}
            </p>
          </section>
        )}

        {/* 생성 결과 영역 */}
        {result && (
          <section ref={resultRef} className="mt-8 scroll-mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {result.drafts.map((draft, index) => (
                <DraftCard
                  key={`${draft.title}-${index}`}
                  title={draft.title}
                  message={draft.message}
                />
              ))}
            </div>

            <ReviewCard review={result.review} />

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="rounded-full border border-[#5865F2] bg-white px-5 py-3 text-sm font-bold text-[#5865F2] transition-all duration-200 hover:bg-[#EEF1FF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                다른 말투로 다시 받아보기
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

type OptionGroupProps = {
  title: string
  items: string[]
  selectedItem: string
  onSelect: (item: string) => void
}

function OptionGroup({ title, items, selectedItem, onSelect }: OptionGroupProps) {
  return (
    <div className="mt-8">
      <p className="mb-3 text-sm font-bold">{title}</p>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isSelected = selectedItem === item

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${isSelected
                  ? 'border-[#5865F2] bg-[#5865F2] text-white shadow-[0_8px_18px_rgba(88,101,242,0.22)]'
                  : 'border-[#DFE4FF] bg-white text-[#4B5068] hover:border-[#5865F2] hover:bg-[#EEF1FF] hover:text-[#5865F2]'
                }`}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type DraftCardProps = {
  title: string
  message: string
}

function DraftCard({ title, message }: DraftCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <article className="rounded-[28px] border border-[#DFE4FF] bg-white p-5 shadow-[0_12px_32px_rgba(88,101,242,0.1)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#5865F2]">{title}</p>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-[#EEF1FF] px-3 py-1.5 text-xs font-bold text-[#5865F2] hover:bg-[#DFE4FF]"
        >
          {copied ? '복사 완료' : '복사하기'}
        </button>
      </div>

      <div className="rounded-3xl rounded-bl-md bg-[#F5F7FF] px-4 py-4">
        <p className="text-sm leading-7 text-[#34384A]">{message}</p>
      </div>
    </article>
  )
}

type ReviewCardProps = {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-[28px] border border-[#DFE4FF] bg-[#F8FAFF] p-6 shadow-[0_12px_32px_rgba(88,101,242,0.1)]">
      <div className="mb-5">
        <p className="text-xs font-bold text-[#5865F2]">AI REVIEW</p>
        <h2 className="mt-1 text-xl font-extrabold text-[#2D3045]">
          한줄검수 결과
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewItem title="오해 가능성" content={review.misunderstanding} />
        <ReviewItem title="말투 온도" content={review.tone} />
        <ReviewItem title="조심하면 좋은 표현" content={review.caution} />
        <ReviewItem
          title="추천 한 줄"
          content={review.recommendation}
          highlight
        />
      </div>
    </article>
  )
}

function LoadingCard() {
  return (
    <section className="mt-8 rounded-[28px] border border-[#DFE4FF] bg-white p-6 shadow-[0_12px_32px_rgba(88,101,242,0.1)]">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 animate-pulse rounded-full bg-[#5865F2]" />
        <p className="text-sm font-bold text-[#5865F2]">
          AI가 말투를 다듬는 중이에요...
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-[#EEF1FF]" />
        <div className="h-4 w-full animate-pulse rounded-full bg-[#EEF1FF]" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#EEF1FF]" />
      </div>
    </section>
  )
}

type ReviewItemProps = {
  title: string
  content: string
  highlight?: boolean
}

function ReviewItem({ title, content, highlight = false }: ReviewItemProps) {
  return (
    <div
      className={`rounded-2xl border p-4 ${highlight
          ? 'border-[#5865F2] bg-white'
          : 'border-[#DFE4FF] bg-white/70'
        }`}
    >
      <p className="mb-2 text-xs font-bold text-[#5865F2]">{title}</p>
      <p className="text-sm leading-6 text-[#34384A]">{content}</p>
    </div>
  )
}

export default App