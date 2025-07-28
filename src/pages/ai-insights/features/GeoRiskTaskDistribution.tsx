import React from "react";
import { GoogleMap, useJsApiLoader, HeatmapLayerF } from "@react-google-maps/api";


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: "100%",
    height: "280px"
};

const heatmapData = [
    // Koramangala
    { lat: 12.9352, lng: 77.6146 },
    { lat: 12.9369, lng: 77.6226 },
    { lat: 12.9318, lng: 77.6182 },

    // MG Road
    { lat: 12.9756, lng: 77.6051 },
    { lat: 12.9731, lng: 77.6090 },
    { lat: 12.9719, lng: 77.6038 },

    // Shivajinagar
    { lat: 12.9871, lng: 77.6059 },
    { lat: 12.9856, lng: 77.6095 },
    { lat: 12.9863, lng: 77.6071 },

    // Halasuru
    { lat: 12.9788, lng: 77.6271 },
    { lat: 12.9765, lng: 77.6300 },
    { lat: 12.9750, lng: 77.6285 },

    // Indiranagar
    { lat: 12.9719, lng: 77.6412 },
    { lat: 12.9694, lng: 77.6428 },
    { lat: 12.9736, lng: 77.6397 },

    // BTM Layout
    { lat: 12.9165, lng: 77.6101 },
    { lat: 12.9141, lng: 77.6092 },
    { lat: 12.9187, lng: 77.6135 }
];

// Calculate center from heatmapData
const avgLat = heatmapData.reduce((acc, item) => acc + item.lat, 0) / heatmapData.length;
const avgLng = heatmapData.reduce((acc, item) => acc + item.lng, 0) / heatmapData.length;
const center = { lat: avgLat, lng: avgLng };

const GeoRiskTaskDistribution: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY || "",
        libraries: ["visualization"],
    });

    return (
        <div className="w-full">
            <div className="rounded-lg overflow-hidden shadow">
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13} // You can increase zoom for a closer view
                    >
                        <HeatmapLayerF
                            data={heatmapData.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
                            options={{
                                radius: 40,
                                opacity: 0.7,
                            }}
                        />
                    </GoogleMap>
                )}
            </div>
            <div className="flex justify-center gap-10 pt-4">
                <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-4 bg-[#10A95C] rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">High</span>
                </div>
                <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-4 bg-[#FFAD0D] rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Medium</span>
                </div>
                <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-4 bg-[#EC2D30] rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Low</span>
                </div>
            </div>
        </div>
    );
};

export default GeoRiskTaskDistribution;