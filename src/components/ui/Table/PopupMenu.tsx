import React from "react";

export interface PopupPosition {
    top: number;
    left: number;
}

export interface PopupMenuProps {
    isVisible: boolean;
    position: PopupPosition;
    onClose: () => void;
    onAction: (action: string) => void;
    popupRef: React.RefObject<HTMLDivElement | null>;
    menuItems: { label: string; action: string }[];
}

const PopupMenu: React.FC<PopupMenuProps> = ({
    isVisible,
    position,
    onClose,
    onAction,
    popupRef,
    menuItems,
}) => {
    if (!isVisible) return null;

    // Calculate popup vertical position
    const shouldShowAbove = position.top + 300 > window.innerHeight; // 300px approximate popup height
    const adjustedTop = shouldShowAbove ? position.top - 300 : position.top;

    return (
        <>
            {/* Backdrop */}
            <div
                className="absolute inset-0 z-40"
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "transparent",
                }}
            />

            {/* Popup Menu */}
            <div
                ref={popupRef}
                className="fixed z-50 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[200px] max-h-[300px] overflow-y-auto"
                style={{
                    top: `${Math.max(10, Math.min(adjustedTop, window.innerHeight - 310))}px`,
                    left: `${Math.max(10, Math.min(position.left, window.innerWidth - 210))}px`,
                }}
            >
                {menuItems.map((item) => (
                    <button
                        key={item.action}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 flex items-center transition-colors duration-150 cursor-pointer border-b border-neutral-300 last:border-b-0"
                        onClick={() => {
                            onAction(item.action);
                            onClose();
                        }}
                    >
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </>
    );
};

export default PopupMenu;