import PrimaryButton from '../../../components/ui/Buttons/PrimaryButton';

export interface TabConfig {
    id: string;
    label: string;
    component: React.ComponentType;
    width?: string;
}

interface TabButtonsProps {
    tabsConfig: TabConfig[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const TabButtonSection: React.FC<TabButtonsProps> = ({
    tabsConfig,
    activeTab,
    onTabChange
}) => {
    const activeTabConfig = tabsConfig.find(tab => tab.id === activeTab);
    const ActiveComponent = activeTabConfig?.component;

    return (
        <div className="w-full">
            {/* Tab Buttons Section */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
                {tabsConfig.map((tab) => (
                    <PrimaryButton
                        key={tab.id}
                        text={tab.label}
                        className={`${tab.width || 'w-auto px-4'} py-2 text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.id
                                ? "bg-primary-700 hover:bg-primary-600 text-white shadow-md"
                                : "bg-white text-neutral-700 hover:bg-primary-700 hover:text-white border border-neutral-200 hover:border-primary-700"
                        }`}
                        onClick={() => onTabChange(tab.id)}
                    />
                ))}
            </div>

            {/* Content Section - Separated with proper spacing */}
            <div className="w-full">
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
};

export default TabButtonSection;