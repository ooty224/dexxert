"use client";

import { useMemo, useState } from "react";

const wikiCards = [
  { icon: "📖", title: "명령어 모음", text: "서버에서 자주 사용하는 명령어를 한눈에 확인하세요.", tag: "COMMAND", href: "/commands" },
  { icon: "🧁", title: "초보자 가이드", text: "첫 접속부터 야생 정착까지 필요한 내용을 순서대로 안내합니다.", tag: "START", href: "/guide" },
  { icon: "🍰", title: "티어", text: "Iron부터 Mythic까지 등급별 홈 개수와 혜택을 확인하세요.", tag: "TIER", href: "/tier" },
  { icon: "📜", title: "규칙", text: "모두가 즐겁게 플레이하기 위해 꼭 지켜야 할 서버 규칙입니다.", tag: "RULES", href: "/rules" },
  { icon: "💬", title: "디스코드", text: "공식 디스코드에서 공지와 서버 소식을 가장 빠르게 확인하세요.", tag: "COMMUNITY", href: "https://discord.gg/GacqH48qsa", external: true },
  { icon: "⭐", title: "마인리스트", text: "마인리스트에서 디저트 서버 정보와 추천 페이지를 확인하세요.", tag: "VOTE", href: "https://minelist.kr/servers/17173-mc.dexxert.kr", external: true },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10000);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "giftcard">("bank");
  const [giftcardAmount, setGiftcardAmount] = useState(10000);
  const [giftcardPin, setGiftcardPin] = useState("");
  const [gameName, setGameName] = useState("");
  const [depositorName, setDepositorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cashPolicyAgreed, setCashPolicyAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [refundAgreed, setRefundAgreed] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderId: string; demo: boolean } | null>(null);
  const [formError, setFormError] = useState("");
  const paymentAmount = paymentMethod === "giftcard" ? giftcardAmount : donationAmount;
  const creditedAmount = paymentMethod === "giftcard" ? Math.floor(giftcardAmount * 0.9) : donationAmount;
  const cookieAmount = Math.floor(creditedAmount / 100);
  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return wikiCards;
    return wikiCards.filter((card) => `${card.title} ${card.text} ${card.tag}`.toLowerCase().includes(q));
  }, [query]);

  async function copyAddress() {
    await navigator.clipboard.writeText("mc.dexxert.kr");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function submitDonation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const response = await fetch("https://dexxert-donation-bot.ooty224.workers.dev/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          paymentMethod,
          minecraftName: gameName,
          depositorName,
          giftcardPin,
        }),
      });
      const data = await response.json() as { orderId?: string; demo?: boolean; error?: string };
      if (!response.ok || !data.orderId) throw new Error(data.error || "신청을 전송하지 못했습니다.");
      setOrderResult({ orderId: data.orderId, demo: Boolean(data.demo) });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Dexxert 공식 사이트 홈">
          <span className="brand-gem"><img src="/dexxert-icon.png" alt="" /></span><span>DEXXERT <b>공식 사이트</b></span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#server-info">서버 안내</a><a href="#support">캐쉬 충전</a><a href="/rules">규칙</a>
        </nav>
      </header>

      <div className="page" id="top">
        <section className="hero">
          <div className="spark s1"/><div className="spark s2"/><div className="spark s3"/>
          <img className="official-cupcake" src="/dexxert-icon.png" alt="Dexxert 공식 컵케이크 아이콘" />
          <div className="pixel-island" aria-hidden="true"><span/><span/><span/><span/><span/></div>
          <p className="eyebrow">DEXXERT MINECRAFT SERVER</p>
          <h1><span>디저트 서버에</span><br/>오신 것을 환영합니다</h1>
          <p className="hero-copy">달콤한 분위기 속에서 함께 만들고, 모험하고, 오래 기억될 이야기를 시작해보세요.</p>
          <div className="hero-actions">
            <button className="address" onClick={copyAddress} aria-label="서버 주소 복사">
              <span className="online-dot"/> mc.dexxert.kr <small>{copied ? "복사됨!" : "복사"}</small>
            </button>
            <a className="primary-button" href="#server-info">서버 시작하기 <span>›</span></a>
          </div>
        </section>

        <section className="finder" id="server-info">
          <div><p className="section-kicker">디저트 한눈에 보기</p><h2>서버 안내</h2><p className="section-description">명령어부터 티어, 상점, 토지 보호까지 모두 여기에서 확인할 수 있어요.</p></div>
          <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="가이드 검색하기" /></label>
        </section>

        <section className="card-grid" id="beginner">
          {filteredCards.map((card) => <a className="wiki-card" key={card.title} id={card.title === "명령어 모음" ? "commands" : undefined} href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noreferrer" : undefined}>
            <div className="card-icon pixel-card-icon" aria-hidden="true">{card.icon}</div><div className="card-content"><span className="tag">{card.tag}</span><h3>{card.title}</h3><p>{card.text}</p><span className="card-link">열기 <b>→</b></span></div>
          </a>)}
          {filteredCards.length === 0 && <p className="empty">검색 결과가 없습니다. 다른 단어로 검색해보세요.</p>}
        </section>

        <section className="support-section" id="support">
          <div className="support-heading"><div><p className="section-kicker">DEXXERT CASH SHOP</p><h2>서버 캐쉬 충전</h2><p>충전 금액 100원마다 쿠키 1개를 인게임으로 지급합니다.</p></div><span className="support-note">계좌정보는 다음 단계에서만 표시됩니다</span></div>
          <div className="rate-banner"><span>고정 지급 비율</span><strong>100원 <b>=</b> 1쿠키</strong><p>충전 금액은 직접 정할 수 있으며 100원 단위로 입력됩니다.</p></div>

          <div className="checkout-card">
            <div className="order-summary"><p className="section-kicker">충전 요약</p><h3>{cookieAmount.toLocaleString("ko-KR")} 쿠키</h3><p>{paymentMethod === "giftcard" ? `상품권 ${paymentAmount.toLocaleString("ko-KR")}원권 · 90% 인정` : "100원당 쿠키 1개"}</p><strong>{creditedAmount.toLocaleString("ko-KR")}원 인정</strong><ul><li>입금 또는 PIN 확인 후 인게임 지급</li><li>신청 정보는 관리자 채널로 전송</li><li>문화상품권은 현금화 수수료 10% 차감</li></ul></div>
            {orderResult ? <div className="success-box"><span>✓</span><h3>캐쉬 충전 신청이 접수됐어요</h3><p>주문번호 <b>{orderResult.orderId}</b></p>{paymentMethod === "bank" && <div className="test-account result-account"><span>입금 계좌</span><strong>케이뱅크 888-004-954275</strong><small>예금주 유기태 · 신청한 금액과 입금자명을 정확히 확인해주세요.</small></div>}<p>입금 확인 후 입력한 마인크래프트 계정으로 쿠키가 지급됩니다.</p><button onClick={() => setOrderResult(null)}>새 신청 작성</button></div> :
            <form className="donation-form" onSubmit={submitDonation}>
              <fieldset><legend>결제 방법</legend><div className="payment-tabs"><button type="button" className={paymentMethod === "bank" ? "active" : ""} onClick={() => setPaymentMethod("bank")}>계좌이체</button><button type="button" className={paymentMethod === "giftcard" ? "active" : ""} onClick={() => setPaymentMethod("giftcard")}>문화상품권</button></div></fieldset>
              {paymentMethod === "bank" ? <>
                <label>충전 금액<input required type="number" min="100" max="1000000" step="100" value={donationAmount} onChange={(e) => { setDonationAmount(Number(e.target.value)); setOrderResult(null); }}/><small>100원 단위로 자유롭게 입력해주세요. 지급 예정: {cookieAmount.toLocaleString("ko-KR")}쿠키</small></label>
              </> : <>
                <label>문화상품권(컬쳐랜드) 금액권<select value={giftcardAmount} onChange={(e) => { setGiftcardAmount(Number(e.target.value)); setOrderResult(null); }}><option value="5000">5,000원권 → 45쿠키</option><option value="10000">10,000원권 → 90쿠키</option><option value="30000">30,000원권 → 270쿠키</option><option value="50000">50,000원권 → 450쿠키</option></select><small>현금화 수수료 10%를 제외한 금액만 인정됩니다.</small></label>
                <label>문화상품권(컬쳐랜드) PIN번호<input required minLength={8} maxLength={40} value={giftcardPin} onChange={(e) => setGiftcardPin(e.target.value)} placeholder="실제PIN 번호를 입력해주세요"/><small>올바르게 입력해야 합니다.</small></label>
              </>}
              <label>인게임 이름<input required minLength={3} maxLength={16} pattern="[A-Za-z0-9_]+" value={gameName} onChange={(e) => setGameName(e.target.value)} placeholder="쿠키를 받을 마인크래프트 닉네임"/><small>영문, 숫자, 밑줄만 입력할 수 있어요.</small></label>
              {paymentMethod === "bank" && <label>입금자 이름<input required minLength={2} maxLength={20} value={depositorName} onChange={(e) => setDepositorName(e.target.value)} placeholder="실제 입금할 때 사용하는 이름"/></label>}
              <section className="agreement-box" aria-labelledby="agreement-title">
                <div className="agreement-heading"><span id="agreement-title">충전 전 필수 확인</span><small>아래 항목을 모두 확인해주세요.</small></div>
                <label className="agreement-check"><input required type="checkbox" checked={cashPolicyAgreed} onChange={(e) => setCashPolicyAgreed(e.target.checked)}/><span><b>[필수]</b> 캐쉬 충전 및 쿠키 지급 기준에 동의합니다.</span></label>
                <details><summary>충전·지급 기준 자세히 보기</summary><div><p>100원당 쿠키 1개가 지급되며, 문화상품권은 수수료 10%를 제외한 금액을 인정합니다.</p><p>관리자 확인이 끝난 뒤 입력한 마인크래프트 계정으로 쿠키가 수동 지급됩니다.</p></div></details>
                <label className="agreement-check"><input required type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)}/><span><b>[필수]</b> 개인정보 수집·이용에 동의합니다.</span></label>
                <details><summary>개인정보 안내 자세히 보기</summary><div><p>수집 항목: 마인크래프트 닉네임, 입금자명 또는 상품권 PIN, 충전 금액</p><p>이용 목적: 입금·PIN 확인, 쿠키 지급, 처리 상태 안내</p><p>주문 기록은 처리 및 분쟁 대응을 위해 90일간 보관 후 삭제합니다. 입금자명과 PIN은 처리 완료·거절 후 관리자 메시지에서 삭제합니다.</p><p>동의를 거부할 수 있지만 캐쉬 충전 신청은 진행할 수 없습니다.</p></div></details>
                <label className="agreement-check"><input required type="checkbox" checked={refundAgreed} onChange={(e) => setRefundAgreed(e.target.checked)}/><span><b>[필수]</b> 취소·환불 정책을 확인했습니다.</span></label>
                <details><summary>취소·환불 기준 자세히 보기</summary><div><p>쿠키 지급 전에는 공식 디스코드를 통해 신청 취소를 요청할 수 있습니다.</p><p>쿠키 지급 후에는 사용 여부를 확인한 뒤 처리하며, 이미 사용·이전된 쿠키는 회수가 어려워 환불이 제한될 수 있습니다.</p><p>잘못된 PIN, 이미 사용된 상품권 또는 확인되지 않는 입금은 거절될 수 있습니다.</p></div></details>
                <p className="minor-notice">만 14세 미만 이용자는 법정대리인의 동의를 받은 뒤 신청해야 합니다.</p>
                <div className="policy-links"><a href="/terms" target="_blank">이용정책 전체보기</a><a href="/privacy" target="_blank">개인정보 처리 안내</a></div>
              </section>
              <input className="bot-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
              {formError && <p className="form-error">{formError}</p>}
              {paymentMethod === "giftcard" && <p className="giftcard-notice">PIN은 관리자 에게 전송됩니다.</p>}
              <button className="submit-order" disabled={submitting || cookieAmount < 1 || !cashPolicyAgreed || !privacyAgreed || !refundAgreed}>{submitting ? "전송 중..." : `${paymentAmount.toLocaleString("ko-KR")}원 캐쉬 충전 신청`}</button>
              <p className="form-footnote">신청만으로 결제가 완료되지 않습니다. 다음 단계에서 결제 안내를 확인해주세요.</p>
            </form>}
          </div>
        </section>

      </div>

      <footer><div className="brand"><span className="brand-gem"><img src="/dexxert-icon.png" alt="" /></span><span>DEXXERT <b>공식 사이트</b></span></div><p>디저트 서버의 소식과 안내를 전하는 공식 사이트입니다.</p><span>© 2026 DEXXERT SERVER</span></footer>
    </main>
  );
}
