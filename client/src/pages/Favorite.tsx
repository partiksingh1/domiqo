import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchFavoritesApi, removeFavoriteApi } from "@/api/favorites";
import toast from 'react-hot-toast';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BedDouble, Bath, Home, Trash2 } from "lucide-react";

export default function FavoritesPage() {

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.user_id;
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!userId) {
            window.location.href = "/login";
        }
    }, [userId]);

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => fetchFavoritesApi(userId),
        enabled: !!userId, // Don't run until userId is available
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: removeFavoriteApi,
        onSuccess: (_, favoriteId) => {
            queryClient.setQueryData(["favorites", userId], (old: any) =>
                old?.filter((fav: any) => fav.id !== favoriteId)
            );
            toast("Removed");
        },
        onError: () => {
            toast("Error", {
                duration: 3000,
                position: "top-center"
            });
        },
    });

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 h-48 rounded-t-lg" />
                            <div className="p-4 space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Saved</h1>
                <div className="flex items-center gap-2">
                    <Heart className="text-red-500" />
                    <span className="text-lg font-medium">{favorites.length} Properties</span>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h2>
                    <p className="text-gray-500 mb-4">Start adding properties to your favorites list</p>
                    <Button asChild>
                        <a href="/properties">Browse Properties</a>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite: any) => (
                        <Card key={favorite.id} className="overflow-hidden group">
                            <div className="relative">
                                <img
                                    src={"https://img.freepik.com/free-photo/comfortable-elegance-modern-bedroom-with-luxury-bedding-generated-by-ai_188544-17037.jpg"}
                                    alt={favorite.property.title}
                                    className="object-cover w-full h-full"
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeFavoriteMutation.mutate(favorite.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{favorite.property.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{favorite.property.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <BedDouble className="h-4 w-4" />
                                        <span>{favorite.property.numBedrooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bath className="h-4 w-4" />
                                        <span>{favorite.property.numBathrooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Home className="h-4 w-4" />
                                        <span>{favorite.property.squareMeters}m²</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-emerald-600">
                                        €{favorite.property.price.toLocaleString()}
                                    </span>
                                    <Button variant="outline" asChild>
                                        <a href={`/properties/${favorite.property.id}`}>View Details</a>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
