import axios from 'axios'

export interface PropertyFilters {
  location?: string
  propertyType?: string
  priceMin?: number
  priceMax?: number
  numBedrooms?: string
  status?: string
}

export const fetchPropertiesApi = async (filters: PropertyFilters) => {
  const params = new URLSearchParams()

  if (filters.location) params.append("location", filters.location)
  if (filters.propertyType) params.append("propertyType", filters.propertyType)
  if (filters.priceMin) params.append("priceMin", filters.priceMin.toString())
  if (filters.priceMax) params.append("priceMax", filters.priceMax.toString())
  if (filters.numBedrooms) params.append("numBedrooms", filters.numBedrooms)
  if (filters.status) params.append("status", filters.status)

  const { data } = await axios.get(`http://localhost:3000/api/v1/find-properties?${params.toString()}`) // Change URL as needed
  return data
}
