import InfoPage from "../components/InfoPage";

const commandGroups = [
  { title: "경제", commands: [
    ["/잔액", "보유 중인 서버 돈을 확인합니다."], ["/송금 <닉네임> <금액>", "다른 유저에게 돈을 보냅니다."],
    ["/돈순위 [페이지]", "서버의 잔액 순위를 확인합니다."], ["/쿠키", "보유 중인 쿠키를 확인합니다."],
    ["/쿠키상점", "쿠키로 이용하는 캐쉬 상점을 엽니다."],
  ]},
  { title: "홈", commands: [
    ["/홈 [이름]", "등록한 홈으로 이동합니다."], ["/홈설정 [이름]", "현재 위치를 홈으로 등록합니다."],
    ["/홈삭제 <이름>", "등록한 홈을 삭제합니다."], ["/홈목록", "등록된 홈 목록 GUI를 엽니다."],
  ]},
  { title: "이동", commands: [
    ["/스폰", "서버 스폰으로 이동합니다."], ["/워프 <이름>", "선택한 워프 지점으로 이동합니다."],
    ["/워프목록", "사용 가능한 워프 목록을 확인합니다."], ["/tpa <닉네임>", "상대방에게 이동 요청을 보냅니다."],
    ["/tpahere <닉네임>", "상대방을 내 위치로 부르는 요청을 보냅니다."], ["/수락", "받은 이동 요청을 수락합니다."],
    ["/거절", "받은 이동 요청을 거절합니다."], ["/요청취소", "보낸 이동 요청을 취소합니다."],
    ["/back", "마지막 사망 위치로 한 번 이동합니다."],
  ]},
  { title: "토지 보호", commands: [
    ["/땅설정", "현재 보호구역의 설정 GUI를 엽니다."], ["/땅정보", "현재 위치한 청크의 토지 정보를 확인합니다."],
    ["/땅목록", "내가 소유하거나 공유받은 보호구역을 확인합니다."],
  ]},
  { title: "편의 기능", commands: [
    ["/우편함", "받은 우편과 아이템을 확인합니다."], ["/접속보상", "현재 접속보상 진행도를 확인합니다."],
  ]},
  { title: "티어 혜택", note: "보유한 티어와 권한에 따라 사용할 수 있습니다.", commands: [
    ["/닉네임 <이름>", "채팅과 TAB에 표시되는 닉네임을 변경합니다."], ["/수리", "손에 들고 있는 아이템을 수리합니다."],
    ["/엔더상자", "어디서든 엔더상자를 엽니다."], ["/작업대", "어디서든 작업대를 엽니다."],
  ]},
];

export default function CommandsPage() {
  return <InfoPage kicker="COMMANDS" title="명령어 모음" description="Dexxert에서 일반 유저가 사용할 수 있는 명령어를 기능별로 확인하세요.">
    <div className="command-groups">
      {commandGroups.map((group) => <section className="command-group" key={group.title}>
        <div className="command-group-title"><h2>{group.title}</h2>{group.note && <p>{group.note}</p>}</div>
        <div className="command-list">{group.commands.map(([command, text]) => <article className="command-row" key={command}><code>{command}</code><p>{text}</p></article>)}</div>
      </section>)}
    </div>
  </InfoPage>;
}
