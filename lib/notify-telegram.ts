// lib/notify-telegram.ts
export async function sendTelegramOrderNotification(order: any) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  const message = `
🧾 New Order Received
👤 ${order.customer_name}
📍 ${order.dzongkhag}
💳 ${order.payment_method.toUpperCase()}
💬 Ref: ${order.txn_ref || "-"}
🛒 Total: Nu. ${order.total / 100}
`

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  })
}
