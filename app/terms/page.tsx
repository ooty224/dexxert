import InfoPage from "../components/InfoPage";

export default function TermsPage() {
  return <InfoPage kicker="CASH POLICY" title="캐쉬 충전 이용정책" description="디저트 서버 캐쉬 충전과 쿠키 지급에 관한 운영 기준입니다.">
    <div className="legal-document">
      <section><h2>1. 충전 및 지급</h2><p>계좌이체는 입금액 100원당 쿠키 1개를 지급합니다. 문화상품권은 현금화 수수료 10%를 제외한 인정 금액을 기준으로 쿠키를 지급합니다.</p></section>
      <section><h2>2. 처리 방식</h2><p>신청 후 관리자가 입금 또는 PIN을 확인하고, 신청서에 입력한 마인크래프트 계정으로 쿠키를 수동 지급합니다. 잘못된 계정명을 입력해 발생한 문제는 공식 디스코드로 문의해주세요.</p></section>
      <section><h2>3. 취소 및 환불</h2><p>쿠키 지급 전에는 공식 디스코드를 통해 취소를 요청할 수 있습니다. 지급 후에는 쿠키 사용 여부를 확인하여 처리하며, 이미 사용하거나 다른 계정으로 이전된 쿠키는 환불이 제한될 수 있습니다.</p></section>
      <section><h2>4. 신청 거절</h2><p>입금이 확인되지 않거나 상품권 PIN이 잘못되었거나 이미 사용된 경우 신청이 거절될 수 있습니다.</p></section>
      <section><h2>5. 미성년 이용자</h2><p>만 14세 미만 이용자는 법정대리인의 동의를 받은 뒤 신청해야 합니다. 실제 결제수단과 환불 기준은 보호자와 함께 확인해주세요.</p></section>
      <section><h2>6. 문의</h2><p><a href="https://discord.gg/GacqH48qsa" target="_blank" rel="noreferrer">Dexxert 공식 디스코드</a>의 관리자 문의 채널을 이용해주세요.</p></section>
    </div>
  </InfoPage>;
}
