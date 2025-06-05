// components/OrderReceiptPDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 12 },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontWeight: "bold" },
})

export default function OrderReceiptPDF({
  order,
  items,
}: {
  order: any
  items: any[]
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>🧾 DrukMart Order Receipt</Text>

        <View style={styles.section}>
          <Text>Order ID: {order.id}</Text>
          <Text>Customer: {order.customer_name}</Text>
          <Text>Dzongkhag: {order.dzongkhag}</Text>
          <Text>Payment: {order.payment_method}</Text>
          {order.txn_ref && <Text>Txn Ref: {order.txn_ref}</Text>}
          <Text>Status: {order.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Items:</Text>
          {items.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text>{item.product_name}</Text>
              <Text>Nu. {item.price / 100}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>
            Total: Nu. {(order.total / 100).toFixed(2)}
          </Text>
        </View>

        <Text style={{ marginTop: 20 }}>🕉 Thank you for shopping with DrukMart</Text>
      </Page>
    </Document>
  )
}
