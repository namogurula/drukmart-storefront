// lib/notify-email.ts
//Install EmailJS
//npm install @emailjs/browser

import emailjs from "@emailjs/browser"

export async function sendEmailOrderNotification(order: any) {
  const templateParams = {
    customer_name: order.customer_name,
    dzongkhag: order.dzongkhag,
    payment_method: order.payment_method,
    txn_ref: order.txn_ref || "-",
    total: (order.total / 100).toFixed(2),
  }

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )
}
