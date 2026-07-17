import InfoPage from "../components/InfoPage";

const tiers = [
  { name: "Iron", homes: 1, color: "#b9bec5", benefit: "기본 혜택" },
  { name: "Bronze", homes: 1, color: "#bd7447", benefit: "추가 혜택 없음" },
  { name: "Silver", homes: 2, color: "#d9e0e7", benefit: "홈 1개 추가" },
  { name: "Gold", homes: 3, color: "#ffd84a", benefit: "/쓰레기통" },
  { name: "Platinum", homes: 3, color: "#b8f1e8", benefit: "/작업대" },
  { name: "Diamond", homes: 4, color: "#62e8e8", benefit: "/모자" },
  { name: "Crystal", homes: 4, color: "#a9eeff", benefit: "/엔더상자" },
  { name: "Emerald", homes: 5, color: "#42d16f", benefit: "[아이템]" },
  { name: "Ruby", homes: 6, color: "#ed4560", benefit: "/상자정리" },
  { name: "Sapphire", homes: 7, color: "#417de8", benefit: "홈 1개 추가" },
  { name: "Amethyst", homes: 8, color: "#ae68df", benefit: "홈 1개 추가" },
  { name: "Topaz", homes: 8, color: "#f0a14a", benefit: "추가 혜택 없음" },
  { name: "Opal", homes: 9, color: "#f4bfe8", benefit: "/수리" },
  { name: "Obsidian", homes: 10, color: "#49345e", benefit: "홈 1개 추가" },
  { name: "Mythic", homes: 10, color: "#ff5dad", benefit: "최고 티어" },
];

export default function TierPage() {
  return <InfoPage kicker="TIER" title="티어 안내" description="상위 티어는 하위 티어에서 해금한 혜택을 모두 이어받습니다.">
    <section className="tier-upgrade-guide">
      <span className="tier-guide-icon">🎟️</span>
      <div><strong>티어 업그레이드 방법</strong><p>인게임 서버 메뉴를 열고 티어권을 구매하면 다음 티어로 업그레이드할 수 있습니다.</p></div>
    </section>
    <div className="tier-list">
      {tiers.map((tier, index) => <article className={`tier-list-row${index === 0 ? " current-default" : ""}`} key={tier.name}>
        <span className="tier-number">{String(index).padStart(2, "0")}</span>
        <div className="tier-name"><span className="ore-icon" style={{ "--ore": tier.color } as React.CSSProperties}><i/><i/><i/><i/></span><strong>{tier.name}</strong>{index === 0 && <small>기본 티어</small>}</div>
        <div className="tier-home"><small>HOME</small><b>{tier.homes}개</b></div>
        <div className="tier-benefit"><small>추가 혜택</small><b>{tier.benefit}</b></div>
      </article>)}
    </div>
    <p className="tier-footnote">닉네임 변경은 티어 혜택이 아닌 별도 캐쉬 아이템으로 이용할 수 있습니다.</p>
  </InfoPage>;
}
