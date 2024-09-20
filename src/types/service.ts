import { TOKEN } from "./token-mapbox";
export interface Service {
    id: string;
    clinic_id: string;
    image?: string;
    name: string;
    clinic_name: string;
    description: string;
    price: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}
export const initialService: Service = {
    id: "",
    clinic_id: "",
    name: "",
    clinic_name: "",
    description: "",
    price: 0,
    address: "",
    createdAt: new Date(),
    updatedAt: new Date(),
}
export const convertAddress = async (address: string): Promise<string> => {
    const accessToken = TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent("Khu phố 6, Đ. Võ Trường Toản, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam")}.json?access_token=${accessToken}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
            return `${latitude}, ${longitude}`;
        } else {
            return "";
        }
    } catch (error) {
        console.error("Lỗi khi chuyển đổi địa chỉ:", error);
        return "Không thể chuyển đổi địa chỉ";
    }
}

export const handleGetServices = async (services: Service[]): Promise<Service[]> => {
    const updatedServices = await Promise.all(services.map(async (service) => {
        const convertedAddress = await convertAddress(service.address);
        return { ...service, address: convertedAddress };
    }));

    return updatedServices;
}