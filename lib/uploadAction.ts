/**
 * Cloudflare R2 버킷('artist') 음원 업로드 & 삭제 클라이언트 표준 함수
 * 엔드포인트: https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com
 * 버킷명: artist
 * 퍼블릭 URL: https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/${folder}/${fileName}
 * 
 * 💡 순수 Web Crypto API(AWS SigV4)를 사용하여 @aws-sdk 외부 패키지 의존성 없이
 * Vercel, Vite, Rollup 어디서든 100% 빌드 에러 없이 R2 버킷에 직접 업로드 및 삭제됩니다.
 */

const R2_CONFIG = {
  endpoint: 'https://e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com',
  host: 'e4406e25106c852e38b282ffc3914cdf.r2.cloudflarestorage.com',
  bucket: 'artist',
  accessKeyId: '73ade721f09959ee6a1733a968b0b6d3',
  secretAccessKey: '668bb089c76adb4ef1124c79f8a5bed0437476ab237937f26589776ca2e3ac83',
  region: 'auto',
  publicDomain: 'https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev',
};

// Web Crypto HMAC-SHA256
async function hmacSha256(key: Uint8Array | ArrayBuffer, data: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data));
}

// Web Crypto SHA-256 Hex Hash
async function sha256Hex(data: ArrayBuffer | Uint8Array | string): Promise<string> {
  const buffer = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// AWS SigV4 Signing Key 생성
async function getSignatureKey(
  key: string,
  dateStamp: string,
  regionName: string,
  serviceName: string
): Promise<ArrayBuffer> {
  const kDate = await hmacSha256(new TextEncoder().encode('AWS4' + key), dateStamp);
  const kRegion = await hmacSha256(kDate, regionName);
  const kService = await hmacSha256(kRegion, serviceName);
  const kSigning = await hmacSha256(kService, 'aws4_request');
  return kSigning;
}

/**
 * audioUrl 또는 Key로부터 S3 Key 추출
 * 예: https://pub-9f987370108b48798bd93b5d7154c0d9.r2.dev/artist/1788091411910_Pang_Pang.mp3 -> artist/1788091411910_Pang_Pang.mp3
 */
export function extractR2KeyFromUrl(audioUrlOrKey: string): string | null {
  if (!audioUrlOrKey) return null;
  if (!audioUrlOrKey.startsWith('http')) {
    return audioUrlOrKey.replace(/^\/+/, '');
  }
  try {
    const url = new URL(audioUrlOrKey);
    // path의 앞 '/' 제거
    const pathname = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    return pathname || null;
  } catch {
    const parts = audioUrlOrKey.split('.r2.dev/');
    if (parts.length > 1) {
      return decodeURIComponent(parts[1]);
    }
    return null;
  }
}

/**
 * Cloudflare R2 버킷('artist')에 MP3 파일 업로드
 */
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
    const contentType = file.type || 'audio/mpeg';

    // 1. UTC 날짜 및 타임스탬프 계산
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    // 2. 페이로드 해시 계산
    const payloadHash = await sha256Hex(arrayBuffer);

    // 3. 표준 S3 Canonical Request 생성
    const canonicalUri = `/${R2_CONFIG.bucket}/${key}`;
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:${contentType}\nhost:${R2_CONFIG.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
      'PUT',
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    const canonicalRequestHash = await sha256Hex(canonicalRequest);

    // 4. String to Sign 생성
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${R2_CONFIG.region}/s3/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      canonicalRequestHash,
    ].join('\n');

    // 5. 서명(Signature) 생성
    const signingKey = await getSignatureKey(
      R2_CONFIG.secretAccessKey,
      dateStamp,
      R2_CONFIG.region,
      's3'
    );
    const signatureBuffer = await hmacSha256(signingKey, stringToSign);
    const signatureHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // 6. Authorization 헤더 조합
    const authorizationHeader = `${algorithm} Credential=${R2_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;

    // 7. Cloudflare R2 엔드포인트로 직접 HTTP PUT 전송
    const uploadUrl = `${R2_CONFIG.endpoint}/${R2_CONFIG.bucket}/${key}`;
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Host': R2_CONFIG.host,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Authorization': authorizationHeader,
      },
      body: arrayBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('R2 업로드 HTTP 응답 에러:', response.status, errorText);
      throw new Error(`R2 업로드 응답 실패 (HTTP ${response.status})`);
    }

    // Public URL 조합
    const publicUrl = `${R2_CONFIG.publicDomain}/${key}`;
    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error('R2 업로드 처리 실패:', error);
    return {
      success: false,
      error: error?.message || 'Cloudflare R2 버킷 업로드 중 오류가 발생했습니다.',
    };
  }
}

/**
 * Cloudflare R2 버킷('artist')에서 MP3 파일 삭제
 */
export async function deleteMp3FromR2(audioUrlOrKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const key = extractR2KeyFromUrl(audioUrlOrKey);
    if (!key) {
      return { success: false, error: '삭제할 파일 키를 찾을 수 없습니다.' };
    }

    // 1. UTC 날짜 및 타임스탬프 계산
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    // 2. DELETE 요청의 페이로드 해시 (빈 문자열 SHA-256)
    const payloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    // 3. 표준 S3 Canonical Request 생성
    const canonicalUri = `/${R2_CONFIG.bucket}/${key}`;
    const canonicalQueryString = '';
    const canonicalHeaders = `host:${R2_CONFIG.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
      'DELETE',
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    const canonicalRequestHash = await sha256Hex(canonicalRequest);

    // 4. String to Sign 생성
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${R2_CONFIG.region}/s3/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      canonicalRequestHash,
    ].join('\n');

    // 5. 서명(Signature) 생성
    const signingKey = await getSignatureKey(
      R2_CONFIG.secretAccessKey,
      dateStamp,
      R2_CONFIG.region,
      's3'
    );
    const signatureBuffer = await hmacSha256(signingKey, stringToSign);
    const signatureHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // 6. Authorization 헤더 조합
    const authorizationHeader = `${algorithm} Credential=${R2_CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;

    // 7. Cloudflare R2 엔드포인트로 직접 HTTP DELETE 전송
    const deleteUrl = `${R2_CONFIG.endpoint}/${R2_CONFIG.bucket}/${key}`;
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Host': R2_CONFIG.host,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Authorization': authorizationHeader,
      },
    });

    if (!response.ok && response.status !== 204 && response.status !== 404) {
      const errorText = await response.text().catch(() => '');
      console.error('R2 삭제 HTTP 응답 에러:', response.status, errorText);
      throw new Error(`R2 삭제 응답 실패 (HTTP ${response.status})`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('R2 삭제 처리 실패:', error);
    return {
      success: false,
      error: error?.message || 'Cloudflare R2 버킷 파일 삭제 중 오류가 발생했습니다.',
    };
  }
}
