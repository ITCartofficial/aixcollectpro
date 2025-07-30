import smartAiRecommendationData from "../../../../data/ai-insights/smartAiRecommendationData.json";

// TYPE
interface SmartAiRecommendationData {
    id: string;
    title: string;
    description: string;
}

const SmartAiRecommendation: React.FC = () => {
    // Only show the first 5 recommendations
    const displayedData: SmartAiRecommendationData[] = (smartAiRecommendationData as SmartAiRecommendationData[]).slice(0, 5);

    return (
        <div className="bg-white rounded-lg p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold flex-1 mb-5">Smart AI Recommendation</h2>
            <div
                className="border border-blue-300 rounded-xl bg-white px-6 py-5"
                style={{
                    boxShadow: "0 1px 6px 0 rgba(32,80,177,.03)"
                }}
            >
                {displayedData.map((item) => (
                    <div key={item.id} className="mb-5 last:mb-0">
                        <div className="font-bold text-[17px] leading-tight mb-1">{item.title}</div>
                        <div className="text-gray-700 text-[15px] leading-snug">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartAiRecommendation;
