'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com', // 따옴표 추가
  credentials: {
    accessKeyId: '73ade721f09959ee6a1733a968b0b6d3', // 시작 따옴표 추가
    secretAccessKey: '668bb089c76adb4ef1124c79f8a5bed0437476ab237937f26589776ca2e3ac83', // 양옆 따옴표 추가
  },
});

export async function uploadMp3ToR2(formData: FormData) {
  const file = formData.get('file') as File;
  const folder = formData.get('folder') as string || 'artist'; // 저장할 하위 폴더 이름
  
  if (!file) {
    return { success: false, error: '파일이 없습니다.' };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`; // 파일명 중복 방지를 위한 타임스탬프 추가
  const key = `${folder}/${fileName}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: 'artist', // 문자열 따옴표 추가 (따옴표가 없으면 변수로 인식되어 에러가 납니다)
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Public Development URL 조합 (r2.dev 도메인 사용 시)
    const publicUrl = `https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/${key}`;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('R2 업로드 실패:', error);
    return { success: false, error: '업로드 중 오류가 발생했습니다.' };
  }
}