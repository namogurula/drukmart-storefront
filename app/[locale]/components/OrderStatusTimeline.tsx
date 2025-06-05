// components/OrderStatusTimeline.tsx
const statusSteps = [
  { key: "confirmed", label: "Confirmed" },
  { key: "packed", label: "Packed" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
]

export default function OrderStatusTimeline({ status }: { status: string }) {
  const activeIndex = statusSteps.findIndex((s) => s.key === status)

  return (
    <div className="flex items-center justify-between gap-1 text-sm mb-4">
      {statusSteps.map((step, i) => (
        <div key={step.key} className="flex-1 text-center">
          <div
            className={`w-4 h-4 mx-auto rounded-full ${
              i <= activeIndex ? "bg-green-600" : "bg-gray-300"
            }`}
          />
          <span
            className={`block mt-1 text-xs ${
              i === activeIndex ? "text-black font-bold" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
