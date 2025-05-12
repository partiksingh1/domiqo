import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  BedDouble,
  Bath,
  Home,
  MapPin,
  Calendar,
  Heart,
  Share2,
  MessageSquare,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router";
import PropertyMap from "@/components/MapView";
import toast from "react-hot-toast";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND";
  status: "AVAILABLE" | "SOLD" | "RENTED";
  numBedrooms: number;
  numBathrooms: number;
  squareMeters: number;
  yearBuilt: number;
  latitude: number;
  longitude: number;
  features: { [key: string]: boolean };
  images: { id:number,url: string; imageType: "MAIN" | "GALLERY" | "FLOORPLAN" }[];
  userId: number;
}

export default function PropertyPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.user_id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `http://localhost:3000/api/v1/findPropertyById/${id}`
        );
        setProperty(response.data);
        console.log("property is ", response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSaveProperty = async () => {
    if (!property) return;
    if (!userId) {
      alert("You need to log in to save a property.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/favorites/${property.id}`,
        { user_id: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if(response.status==200){
        toast("Property saved to favorites successfully!")
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "An error occurred while saving the property.");
    }
  };

  const handleContactOwner = async () => {
    if (!property || !userId) return;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </Card>
      </div>
    );
  }

  if (!property) return null;

  // Parse features from the stringified JSON object
  const featuresArray = Object.entries(property.features)
    .filter(([_, v]) => v)
    .map(([k]) => k);

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col lg:flex-row gap-8">
  {/* Left: Image Carousel */}
  <div className="w-full">
    <Carousel className="h-[500px] rounded-lg overflow-hidden">
      <CarouselContent>
        {property.images.map((img) => (
          <CarouselItem key={img.id}>
            <img
              src={img.url}
              alt="Property image"
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.addressLine1}
                  <br />
                  {property.addressLine2}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  €{property.price.toLocaleString()}
                </div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {property.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 border-y">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-gray-400" />
                <span>{property.numBedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gray-400" />
                <span>{property.numBathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-gray-400" />
                <span>{property.squareMeters}m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>Built {property.yearBuilt}</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featuresArray.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        

        <div className="lg:col-span-1">
        <PropertyMap
      latitude={property.latitude}
      longitude={property.longitude}
      height="500px"
      width="100%"
    />
        </div>
      </div>
      <div className="w-3/4 justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-8 flex flex-col items-center">
              <Button
                onClick={handleContactOwner}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <MessageSquare className="mr-2 h-6 w-6" />
                Contact Owner
              </Button>
              <Button onClick={handleSaveProperty} variant="outline" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Save Property
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}