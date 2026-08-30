/**
 * Cloudflare R2 음원 업로드 함수
 * 버킷: 'artist'
 * 엔드포인트: https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com
 * 퍼블릭 URL: https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/${folder}/${fileName}
 */
export async function uploadMp3ToR2(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'artist';

    if (!file) {
      return { success: false, error: '파일이 없습니다.' };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: 'MP3 파일 크기는 최대 10MB 이하여야 합니다.' };
    }

    // 서버의 Cloudflare R2 업로드 엔드포인트(/api/upload/mp3) 호출
    const response = await fetch('/api/upload/mp3', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok && data.success && data.url) {
      return { success: true, url: data.url };
    } else {
      return {
        success: false,
        error: data.error || 'R2 스토리지 업로드에 실패했습니다.',
      };
    }
  } catch (error: any) {
    console.error('R2 업로드 요청 중 오류 발생:', error);
    return {
      success: false,
      error: error?.message || '업로드 중 오류가 발생했습니다.',
    };
  }
}
