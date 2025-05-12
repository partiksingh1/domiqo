import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { PropertySchema, type PropertyFormData } from "@/types/propertyListSchema";

const PropertyForm = ({ userId }: { userId: number }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      userId,
      features: {},
      images: [],
      price: 0,
      numBedrooms: 0,
      numBathrooms: 0,
      squareMeters: 0,
      yearBuilt: 1900,
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    console.log("form data is ", data);
    
    setIsSubmitting(true);
    const formData = new FormData();

    // Append all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && value) {
        (value as File[]).forEach((file: File) => formData.append("images", file));
      } else if (key === "features" && value) {
        formData.append("features", JSON.stringify(value));
      } else {
        formData.append(key,value);
      }
    });

    try {
        console.log("fe formsata",formData);
        
      const response = await axios.post(
        "http://localhost:3000/api/v1/list-property",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status !== 201) {
        throw new Error("Error in Listing");
      }

      toast.success("Property listed successfully!");
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to list property";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.trim();
  
    let featuresObj: Record<string, boolean> = {};
  
    try {
      // Try parsing as JSON object (if user inputs raw JSON)
      const parsed = JSON.parse(input);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        featuresObj = parsed;
      }
    } catch {
      // Fallback to comma-separated string input
      const entries = input
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      featuresObj = entries.reduce((acc, feature) => {
        acc[feature] = true;
        return acc;
      }, {} as Record<string, boolean>);
    }
  
    setValue("features", featuresObj);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("images", Array.from(e.target.files));
    }
  };

  // Debugging: Log form errors
  console.log("Form errors:", errors);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">List a Property</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="address" {...register("addressLine1")} />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input id="addressLine2" {...register("addressLine2")} />
          {errors.addressLine2 && (
            <p className="text-red-500 text-sm">{errors.addressLine2.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="county">County</Label>
          <Input id="county" {...register("county")} />
          {errors.county && (
            <p className="text-red-500 text-sm">{errors.county.message}</p>
          )}
        </div>

        {/* Property Type */}
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            onValueChange={(value) =>
              setValue("propertyType", value as "APARTMENT" | "HOUSE" | "CONDO" | "TOWNHOUSE")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APARTMENT">Apartment</SelectItem>
              <SelectItem value="HOUSE">House</SelectItem>
              <SelectItem value="CONDO">Condo</SelectItem>
              <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
            </SelectContent>
          </Select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm">{errors.propertyType.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) =>
              setValue("status", value as "AVAILABLE" | "SOLD" | "RENTED")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
              <SelectItem value="SOLD">SOLD</SelectItem>
              <SelectItem value="RENTED">RENTED</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Bedrooms */}
        <div>
          <Label htmlFor="numBedrooms">Number of Bedrooms</Label>
          <Input
            id="numBedrooms"
            type="number"
            {...register("numBedrooms", { valueAsNumber: true })}
          />
          {errors.numBedrooms && (
            <p className="text-red-500 text-sm">{errors.numBedrooms.message}</p>
          )}
        </div>

        {/* Bathrooms */}
        <div>
          <Label htmlFor="numBathrooms">Number of Bathrooms</Label>
          <Input
            id="numBathrooms"
            type="number"
            {...register("numBathrooms", { valueAsNumber: true })}
          />
          {errors.numBathrooms && (
            <p className="text-red-500 text-sm">{errors.numBathrooms.message}</p>
          )}
        </div>

        {/* Square Meters */}
        <div>
          <Label htmlFor="squareMeters">Square Meters</Label>
          <Input
            id="squareMeters"
            type="number"
            {...register("squareMeters", { valueAsNumber: true })}
          />
          {errors.squareMeters && (
            <p className="text-red-500 text-sm">{errors.squareMeters.message}</p>
          )}
        </div>

        {/* Year Built */}
        <div>
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            type="number"
            {...register("yearBuilt", { valueAsNumber: true })}

          />
          {errors.yearBuilt && (
            <p className="text-red-500 text-sm">{errors.yearBuilt.message}</p>
          )}
        </div>

        {/* Latitude */}
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            {...register("latitude", { valueAsNumber: true })}
          />
          {errors.latitude && (
            <p className="text-red-500 text-sm">{errors.latitude.message}</p>
          )}
        </div>

        {/* Longitude */}
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            {...register("longitude", { valueAsNumber: true })}
          />
          {errors.longitude && (
            <p className="text-red-500 text-sm">{errors.longitude.message}</p>
          )}
        </div>

        {/* Features */}
        <div>
          <Label htmlFor="features">Features (comma-separated)</Label>
          <Textarea
            id="features"
            onChange={handleFeaturesChange}
            placeholder="e.g., Pool, Garage, Garden"
          />
          {errors.features && (
            <p className="text-red-500 text-sm">{"error here"}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <Label htmlFor="images">Upload Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "List Property"}
        </Button>
      </form>
    </div>
  );
};

export default PropertyForm;