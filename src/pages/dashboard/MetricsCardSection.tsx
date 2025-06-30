import MetricCard from "../../components/ui/Card/MetricCard";

const metricCards = [
  {
    title: "Total Collection",
    value: "₹16,82,000",
    percentage: "+16.7%",
    isPositive: true,
    metric: ""
  },
  {
    title: "Avg Collection Per Agent",
    value: "₹1,52,900",
    percentage: "+12.7%",
    isPositive: true,
    metric: ""
  },
  {
    title: "Paid Conversion Rate",
    value: "",
    percentage: "-4.3%",
    isPositive: false,
    metric: "68%"
  },
  {
    title: "Visit Completion Rate",
    value: "",
    percentage: "-2.3%",
    isPositive: false,
    metric: "81%"
  }
];

const MetricsCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metricCards.map((card, index) => (
            <MetricCard
              key={index}
              title={card.title}
              value={card.value}
              percentage={card.percentage}
              isPositive={card.isPositive}
              metric={card.metric}
            />
          ))}

        </div>
  )
}

export default MetricsCardSection