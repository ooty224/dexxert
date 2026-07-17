import type { ReactNode } from "react";
import Link from "next/link";

export default function InfoPage({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Dexxert 공식 사이트 홈">
          <span className="brand-gem">D</span><span>DEXXERT <b>공식 사이트</b></span>
        </Link>
        <nav aria-label="상세 페이지 메뉴">
          <Link href="/guide">가이드</Link><Link href="/commands">명령어</Link><Link href="/tier">티어</Link><Link href="/rules">규칙</Link>
        </nav>
      </header>
      <div className="subpage">
        <Link className="back-link" href="/">← 메인으로 돌아가기</Link>
        <section className="subpage-hero">
          <p className="section-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
        <section className="subpage-content">{children}</section>
      </div>
      <footer><div className="brand"><span className="brand-gem">D</span><span>DEXXERT <b>공식 사이트</b></span></div><p>mc.dexxert.kr</p><span>© 2026 DEXXERT SERVER</span></footer>
    </main>
  );
}
