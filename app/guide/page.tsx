import InfoPage from "../components/InfoPage";

export default function GuidePage() {
  return <InfoPage kicker="BEGINNER GUIDE" title="초보자 가이드" description="디저트 서버에서 첫 모험을 시작하는 순서입니다.">
    <div className="info-grid guide-steps">
      <article className="info-block"><span className="step-number">01</span><h2>서버 접속</h2><p>마인크래프트 멀티플레이에서 mc.dexxert.kr 주소로 접속하세요.</p></article>
      <article className="info-block"><span className="step-number">02</span><h2>가이드 확인</h2><p>게임에서 /가이드를 입력해 기본 메뉴와 서버 기능을 확인하세요.</p></article>
      <article className="info-block"><span className="step-number">03</span><h2>야생 정착</h2><p>야생으로 이동한 뒤 안전한 장소를 찾아 첫 거점을 만들어보세요.</p></article>
      <article className="info-block"><span className="step-number">04</span><h2>토지 보호</h2><p>토지 보호 기능을 이용해 건축물과 보관함을 안전하게 관리하세요.</p></article>
    </div>
  </InfoPage>;
}
