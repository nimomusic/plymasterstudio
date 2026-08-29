// app/api/play/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const songId = params.id;
  // 요청 시 .mp3 확장자가 붙어있을 경우를 대비해 순수 클립 ID만 추출
  const cleanId = songId.replace('.mp3', ''); 
  const targetUrl = `https://cdn1.suno.ai/${cleanId}.mp3`;

  try {
    // 수노 서버에 위장 Referer 헤더를 포함하여 오디오 스트림 요청
    const sunoResponse = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://suno.com/',
        'Origin': 'https://suno.com',
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0'
      },
    });

    if (!sunoResponse.ok) {
      return new Response('Audio not found or blocked', { status: sunoResponse.status });
    }

    // 정상 스트림일 경우 클라이언트(브라우저)로 파이핑(전달)
    return new Response(sunoResponse.body, {
      status: sunoResponse.status,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}