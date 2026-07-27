// 모든 프로젝트 소스코드 및 에셋 파일을 매핑합니다.
import zipSourcesRaw from './zipSources.ts?raw';

export const rootTextFiles = import.meta.glob([
  '../*.{html,json,ts,tsx,md,lock}',
  '../.gitignore',
  '../.env.example'
], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const compTextFiles = import.meta.glob('../components/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const srcTextFiles = import.meta.glob('./*.{css,ts,tsx}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const appTextFiles = import.meta.glob('../app/**/*.{js,ts,tsx,json}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const assetUrls = import.meta.glob([
  '../*.{jpg,png,pdf,svg}',
  '../components/*.{jpg,png,pdf,svg}',
  './*.{jpg,png,pdf,svg}',
  '../assets/**/*.{jpg,png,pdf,svg}'
], { query: '?url', import: 'default', eager: true }) as Record<string, string>;

export const getSrcTextFiles = () => ({
  ...srcTextFiles,
  '../src/zipSources.ts': zipSourcesRaw
});
