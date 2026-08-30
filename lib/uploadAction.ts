import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

/**
 * Cloudflare R2 버킷('artist')으로 MP3 파일을 직접 업로드하는 함수
 * 엔드포인트: https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com
 * 퍼블릭 URL: https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/${folder}/${fileName}
 */
const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '73ade721f09959ee6a1733a968b0b6d3',
    secretAccessKey: '668bb089c76adb4ef1124c79f8a5bed0437476ab237937f26589776ca2e3ac83',
  },
});

export async function uploadMp3ToR2(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'artist';

  if (!file) {
    return { success: false, error: '파일이 없습니다.' };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: 'MP3 파일 크기는 최대 10MB 이하여야 합니다.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const cleanName = (file.name || 'track.mp3').replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${Date.now()}_${cleanName}`;
    const key = `${folder}/${fileName}`;

    // Cloudflare R2 storage의 'artist' 버킷으로 직접 PutObject 업로드
    await s3.send(
      new PutObjectCommand({
        Bucket: 'artist',
        Key: key,
        Body: new Uint8Array(arrayBuffer),
        ContentType: file.type || 'audio/mpeg',
      })
    );

    // R2 Public URL 조합
    const publicUrl = `https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/${key}`;

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error('R2 업로드 실패:', error);
    return { 
      success: false, 
      error: error?.message || 'Cloudflare R2 버킷 업로드 중 오류가 발생했습니다.' 
    };
  }
}
