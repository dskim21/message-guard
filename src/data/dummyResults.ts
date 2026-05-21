import type { Result } from '../types/message'

type GetDummyResultParams = {
  category: string
  moneyType: string
  feeling: string
}

export function getDummyResult({
  category,
  moneyType,
  feeling,
}: GetDummyResultParams): Result {
  if (category === '💸 돈/정산') {
    switch (moneyType) {
      case '😅 소액이라 말하기 애매함':
  return {
    drafts: [
      {
        title: '🙂 부담 없는 버전',
        message:
          '별건 아닌데 지난번 정산 아직 안 된 것 같아서! 시간 될 때 부탁 😊',
      },
      {
        title: '💛 민망함 줄인 버전',
        message:
          '소액이라 말하기 좀 애매했는데 혹시 지난번 정산 가능할까?',
      },
      {
        title: '⚡ 짧은 버전',
        message:
          '지난번 정산만 살짝 부탁할게 🙏',
      },
    ],
    review: {
      misunderstanding:
        '너무 조심스럽게 말하면 오히려 의도가 흐려질 수 있어요.',
      tone:
        '부담은 적지만 요청 의도는 유지되고 있어요.',
      caution:
        '“얼마 안 되지만” 같은 표현은 오히려 상대를 부담스럽게 할 수 있어요.',
      recommendation:
        '가볍게 말하되 정산 자체는 명확하게 언급하세요.',
    },
  }

  case '😤 계속 미루는 사람':
  return {
    drafts: [
      {
        title: '😐 예의 있는 단호함',
        message:
          '지난번 정산이 아직 안 된 것 같아서 다시 연락해! 확인 부탁할게 😊',
      },
      {
        title: '💼 선 긋는 버전',
        message:
          '몇 번 놓친 것 같아서 다시 남겨. 지난번 정산 부탁할게!',
      },
      {
        title: '⚡ 짧고 명확한 버전',
        message:
          '지난번 정산 아직 안 된 것 같아. 확인 부탁!',
      },
    ],
    review: {
      misunderstanding:
        '감정 표현이 강하면 공격적으로 받아들일 수 있어요.',
      tone:
        '단호하지만 관계를 깨지 않는 선을 유지해요.',
      caution:
        '비꼬는 표현은 갈등을 키울 수 있어요.',
      recommendation:
        '사실 중심 표현이 가장 안전해요.',
    },
  }

  case '👥 모임/여행 정산':
  return {
    drafts: [
      {
        title: '🙂 친근한 버전',
        message:
          '다들 바쁠까 봐 한 번 더 남겨! 여행 정산 부탁 😊',
      },
      {
        title: '💛 부드러운 버전',
        message:
          '지난번 모임 정산만 시간 될 때 부탁할게 🙏',
      },
      {
        title: '⚡ 짧은 버전',
        message:
          '모임 정산 부탁할게!',
      },
    ],
    review: {
      misunderstanding:
        '단체 정산은 누가 대상인지 헷갈릴 수 있어요.',
      tone:
        '가볍고 친근한 느낌이에요.',
      caution:
        '너무 두루뭉술하면 지나칠 수 있어요.',
      recommendation:
        '금액이나 계좌를 같이 보내면 좋아요.',
    },
  }

      default:
        return {
          drafts: [
            {
              title: '🙂 가장 자연스러운 버전',
              message: '혹시 지난번 정산 관련해서 확인 부탁할게 😊',
            },
            {
              title: '💛 부드러운 버전',
              message: '혹시 바쁘지 않을 때 지난번 정산 확인 부탁해도 될까?',
            },
            {
              title: '⚡ 짧은 버전',
              message: '지난번 정산 확인 부탁 🙏',
            },
          ],
          review: {
            misunderstanding: '맥락이 부족하면 상대가 무슨 정산인지 헷갈릴 수 있어요.',
            tone: '전체적으로 부담 없이 전달되는 편이에요.',
            caution: '너무 짧으면 재촉처럼 보일 수 있어요.',
            recommendation: '상황 설명 한 줄을 덧붙이면 더 좋아져요.',
          },
        }
    }
  }

  switch (feeling) {
    case '😥 미안함':
      return {
        drafts: [
          {
            title: '🙏 가장 자연스러운 버전',
            message:
              '정말 미안한데 오늘 약속을 지키기 어려울 것 같아. 갑자기 일정이 생겨서 부득이하게 미뤄야 할 것 같아.',
          },
          {
            title: '💛 더 조심스러운 버전',
            message:
              '너무 미안한데 오늘 약속을 못 갈 것 같아. 괜찮다면 내가 다음 일정 맞춰볼게.',
          },
          {
            title: '⚡ 짧은 버전',
            message:
              '정말 미안해 😥 오늘 갑자기 일정이 생겨서 약속을 미뤄야 할 것 같아.',
          },
        ],
        review: {
          misunderstanding: '미안함은 충분히 전달되지만 이유가 너무 짧으면 성의 없어 보일 수 있어요.',
          tone: '조심스럽고 배려 있는 톤이에요.',
          caution: '과하게 미안하다고 반복하면 오히려 부담을 줄 수 있어요.',
          recommendation: '대안 날짜를 함께 제안하면 훨씬 좋아져요.',
        },
      }

    case '😤 답답함':
      return {
        drafts: [
          {
            title: '😐 차분한 버전',
            message:
              '조금 답답한 상황이라 솔직하게 말할게. 이 부분은 한 번 확인해줬으면 좋겠어.',
          },
          {
            title: '💼 예의 있는 단호함',
            message:
              '불편함이 있어서 조심스럽게 말해. 이 부분은 꼭 확인 부탁할게.',
          },
          {
            title: '⚡ 짧은 버전',
            message:
              '이 부분은 한 번 확인 부탁할게. 조금 답답해서 솔직히 말해봤어.',
          },
        ],
        review: {
          misunderstanding: '감정이 직접적으로 드러나면 공격적으로 느껴질 수 있어요.',
          tone: '단호하지만 아직 예의를 유지하고 있어요.',
          caution: '“왜 안 했어?” 같은 표현은 방어적으로 만들 수 있어요.',
          recommendation: '감정보다 상황 중심 표현이 좋아요.',
        },
      }

    case '😐 어색함':
      return {
        drafts: [
          {
            title: '🙂 부담 없는 버전',
            message: '혹시 괜찮다면 한 번 이야기해보고 싶어 😊',
          },
          {
            title: '💛 조심스러운 버전',
            message: '조금 조심스럽긴 한데 편하게 이야기해도 괜찮을까?',
          },
          {
            title: '⚡ 짧은 버전',
            message: '혹시 시간 괜찮을 때 이야기 가능할까?',
          },
        ],
        review: {
          misunderstanding: '너무 돌려 말하면 의도가 흐려질 수 있어요.',
          tone: '부담을 최소화한 조심스러운 톤이에요.',
          caution: '맥락 없이 갑자기 보내면 상대가 긴장할 수 있어요.',
          recommendation: '짧게 이유를 덧붙이면 더 자연스러워져요.',
        },
      }

    default:
      return {
        drafts: [
          {
            title: '✨ 가장 자연스러운 버전',
            message:
              '오늘 갑자기 일정이 생겨서 약속을 미뤄야 할 것 같아. 너무 미안해. 괜찮다면 다른 날 다시 맞춰볼 수 있을까?',
          },
          {
            title: '💛 더 부드러운 버전',
            message:
              '정말 미안한데 오늘 약속을 지키기 어려울 것 같아. 괜찮은 날 알려주면 내가 맞춰볼게.',
          },
          {
            title: '⚡ 짧고 자연스러운 버전',
            message:
              '오늘 갑자기 일이 생겨서 약속을 미뤄야 할 것 같아 😥',
          },
        ],
        review: {
          misunderstanding: '상대가 갑작스럽게 통보받는 느낌을 받을 수 있어요.',
          tone: '전체적으로 미안함은 잘 전달돼요.',
          caution: '너무 짧으면 성의 없어 보일 수 있어요.',
          recommendation: '이유 + 대안을 함께 제안하면 좋아요.',
        },
      }
  }
}