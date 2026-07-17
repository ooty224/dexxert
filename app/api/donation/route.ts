function safeText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max).replace(/[@`]/g, "") : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (body.website) return Response.json({ ok: true });

    const amount = typeof body.amount === "number" ? body.amount : Number(body.amount);
    const gameName = safeText(body.gameName, 16);
    const depositorName = safeText(body.depositorName, 20);
    const isGiftcard = body.paymentMethod === "giftcard";
    const paymentMethod = isGiftcard ? "문화상품권" : "계좌이체";
    const creditedAmount = isGiftcard ? Math.floor(amount * 0.9) : amount;
    const cookies = Math.floor(creditedAmount / 100);
    const giftcardPin = safeText(body.giftcardPin, 40);
    const validGiftcardAmount = [5000, 10000, 30000, 50000].includes(amount);
    if (!Number.isInteger(amount) || amount < 100 || amount > 1_000_000 || amount % 100 !== 0 || !/^[A-Za-z0-9_]{3,16}$/.test(gameName) || (!isGiftcard && depositorName.length < 2) || (isGiftcard && (!validGiftcardAmount || giftcardPin.length < 8))) {
      return Response.json({ error: "입력 정보를 다시 확인해주세요." }, { status: 400 });
    }

    const orderId = `DX-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    const webhookUrl = process.env.DISCORD_ADMIN_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return Response.json({ orderId, demo: true });

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Dexxert 후원 알림",
        allowed_mentions: { parse: [] },
        embeds: [{
          title: isGiftcard ? "문화상품권 후원 확인" : "계좌이체 후원 확인",
          color: 0xfeaeee,
          fields: [
            { name: "주문번호", value: orderId, inline: false },
            { name: "후원 금액", value: `${amount.toLocaleString("ko-KR")}원`, inline: true },
            { name: "인정 금액", value: `${creditedAmount.toLocaleString("ko-KR")}원${isGiftcard ? " (수수료 10% 차감)" : ""}`, inline: true },
            { name: "지급 예정", value: `${cookies.toLocaleString("ko-KR")}쿠키`, inline: true },
            { name: "결제 방법", value: paymentMethod, inline: true },
            { name: "인게임 이름", value: gameName, inline: true },
            ...(isGiftcard
              ? [{ name: "PIN번호 · 테스트", value: giftcardPin, inline: false }]
              : [{ name: "입금자 이름", value: depositorName, inline: true }]),
          ],
          footer: { text: "입금 확인 대기 · 확인 후 개인정보가 포함된 메시지를 정리해주세요." },
          timestamp: new Date().toISOString(),
        }],
      }),
    });
    if (!response.ok) return Response.json({ error: "관리자 알림 전송에 실패했습니다." }, { status: 502 });
    return Response.json({ orderId, demo: false });
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
}
