import InfoPage from "../components/InfoPage";

export default function PrivacyPage() {
  return <InfoPage kicker="PRIVACY" title="개인정보 처리 안내" description="캐쉬 충전 확인에 필요한 최소한의 정보만 처리합니다.">
    <div className="legal-document">
      <section><h2>1. 수집 항목</h2><p>마인크래프트 닉네임, 충전 금액, 결제 방식, 입금자명 또는 문화상품권 PIN을 수집합니다.</p></section>
      <section><h2>2. 이용 목적</h2><p>입금 및 상품권 확인, 인게임 쿠키 지급, 신청 처리 상태 안내와 분쟁 대응에 이용합니다.</p></section>
      <section><h2>3. 보관 기간</h2><p>주문번호, 마인크래프트 닉네임, 금액과 처리 상태는 처리 완료일로부터 90일간 보관 후 삭제합니다. 입금자명과 PIN은 처리 완료 또는 거절 후 관리자 메시지에서 삭제합니다.</p></section>
      <section><h2>4. 처리 위치</h2><p>신청 정보는 관리자 전용 Discord 채널로 전송되며, 일반 이용자가 보는 공개 채널에는 PIN과 입금자명이 표시되지 않습니다.</p></section>
      <section><h2>5. 동의 거부</h2><p>개인정보 수집·이용에 동의하지 않을 수 있지만, 이 경우 캐쉬 충전 확인과 쿠키 지급이 불가능합니다.</p></section>
      <section><h2>6. 만 14세 미만</h2><p>만 14세 미만 이용자의 개인정보를 처리하려면 법정대리인의 동의가 필요합니다.</p></section>
    </div>
  </InfoPage>;
}
