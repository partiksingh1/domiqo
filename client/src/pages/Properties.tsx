import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchPropertiesApi, type PropertyFilters } from "@/api/properties"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Search, BedDouble, Bath, Home } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "react-router" // for React Router

export default function PropertiesPage() {
  const navigate = useNavigate()

  const [filters, setFilters] = useState<PropertyFilters>({
    location: "",
    propertyType: "",
    priceMin: 0,
    priceMax: 1000000,
    numBedrooms: "",
    status: ""
  })

  const { data, isLoading } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchPropertiesApi(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const properties = data?.properties || []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <Input
              placeholder="Search location..."
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          {/* Property Type */}
          <Select
            value={filters.propertyType}
            onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
          >
            <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
            <SelectContent>
              {["HOUSE", "APARTMENT", "COMMERCIAL", "LAND"].map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Bedrooms */}
          <Select
            value={filters.numBedrooms}
            onValueChange={(value) => setFilters({ ...filters, numBedrooms: value })}
          >
            <SelectTrigger><SelectValue placeholder="Bedrooms" /></SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}+ Beds</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              {["AVAILABLE", "SOLD", "RENTED"].map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Slider */}
        <div className="mt-6">
          <label className="text-sm font-medium mb-2 block">
            Price Range: €{filters.priceMin?.toLocaleString()} - €{filters.priceMax?.toLocaleString()}
          </label>
          <Slider
            defaultValue={[filters.priceMin || 0 , filters.priceMax || 0]}
            max={1000000}
            step={10000}
            onValueChange={([min, max]) =>
              setFilters({ ...filters, priceMin: min, priceMax: max })
            }
            className="mt-2"
          />
        </div>
      </div>

      {/* Loading or Results */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spinner size="large" className="text-emerald-600" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No properties found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property:any) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[0]?.url}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded">
                    {property.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.numBedrooms}</div>
                  <div className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.numBathrooms}</div>
                  <div className="flex items-center gap-1"><Home className="h-4 w-4" />{property.squareMeters}m²</div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-xl font-bold text-emerald-600">€{property.price.toLocaleString()}</div>
                <Button variant="outline" onClick={() => navigate(`/properties/${property.id}`)}>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
