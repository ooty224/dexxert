# Dexxert Cloudflare 배포

1. 이 폴더의 파일을 GitHub 저장소에 업로드합니다.
2. Cloudflare `Workers & Pages`에서 `Create application` → `Import a repository`를 선택합니다.
3. 빌드 명령은 `npm run build`, 배포 명령은 `npx wrangler deploy`로 설정합니다.
4. 배포 완료 후 Worker의 `Settings` → `Domains & Routes` → `Add` → `Custom domain`에서 `dexxert.kr`를 연결합니다.

후원 신청은 기존 `dexxert-donation-bot` Worker와 D1을 그대로 사용합니다.
