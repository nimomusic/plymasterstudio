import { Environment, Paddle } from '@paddle/paddle-node-sdk';
import { headers } from 'next/headers';

// Paddle 백엔드 인스턴스 초기화
const paddle = new Paddle('test_758ef8299ccd2cf6624a24d5654', { // 사용자님의 API Key 직접 입력
  environment: Environment.sandbox,
});

export async function POST(req) {
  const signature = headers().get('paddle-signature') || '';
  const rawRequestBody = await req.text(); // 중요: 반드시 원본 문자열로 받아야 서명 검증이 됨

  try {
    // 1. 보안 검증: Paddle에서 보낸 진짜 신호인지 확인
    // 아래 'whsec_...' 부분에 아까 대시보드에서 받은 웹훅 시크릿을 넣으세요.
    const eventData = paddle.webhooks.unmarshal(
      rawRequestBody,
      'whsec_pdl_ntfset_01kn1g8cfw8e799qsn2arvz3we_cxhgFfBIWfAK4ezZdHiOzb30LUOsz+jP', 
      signature
    );

    console.log('웹훅 이벤트 수신:', eventData.eventType);

    // 2. 이벤트 종류에 따른 로직 처리
    switch (eventData.eventType) {
      case 'transaction.completed':
      case 'subscription.activated':
        // 우리가 프론트엔드에서 보냈던 userId를 추출합니다.
        const userId = eventData.data.customData.userId;
        
        console.log(`[결제 완료] 유저 ID: ${userId} - PRO 플랜 활성화 로직 실행`);
        
        // TODO: 여기서 본인의 DB(Prisma, Supabase 등)를 업데이트하세요.
        // 예: await db.user.update({ where: { id: userId }, data: { isPro: true } });
        
        break;

      case 'subscription.canceled':
        const canceledUserId = eventData.data.customData.userId;
        console.log(`[구독 취소] 유저 ID: ${canceledUserId} - 권한 회수 로직 실행`);
        break;
    }

    return new Response('Webhook processed successfully', { status: 200 });

  } catch (error) {
    console.error('웹훅 검증 실패:', error);
    return new Response('Webhook signature verification failed', { status: 400 });
  }
}