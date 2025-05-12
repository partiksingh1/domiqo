export interface Property {
    id: number
    title: string
    description: string
    price: number
    address: string
    propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND"
    status: "AVAILABLE" | "SOLD" | "RENTED"
    numBedrooms: number
    numBathrooms: number
    squareMeters: number
    yearBuilt: number
    latitude: number
    longitude: number
    features: { [key: string]: boolean }
    images: { url: string; imageType: "MAIN" | "GALLERY" | "FLOORPLAN" }[]
    userId: number
  }
  