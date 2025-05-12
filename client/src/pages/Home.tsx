import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/3d-rendering-loft-scandinavian-living-room-with-working-table-bookshelf_105762-2162.jpg?t=st=1736748732~exp=1736752332~hmac=8a42e606e41f16487f397a9429d7fd5bc7b23ba0a1b64dbb176d2cc1cd44fed4&w=2000')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Find Your Perfect Home in Ireland
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover thousands of properties across Ireland's most beautiful locations
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mt-8 flex flex-col md:flex-row gap-4">
              <Input 
                className="bg-white text-black h-12"
                placeholder="Enter location, property type, or keywords"
              />
              <Button size="lg" className="bg-blue-900 hover:bg-blue-900">
                <Search className="mr-2 h-5 w-5" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video relative">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/property-placeholder.jpg')"
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Beautiful Property {item}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Dublin, Ireland
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-900 font-bold text-xl">
                        €350,000
                      </span>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Extensive Property List",
                description: "Access thousands of properties across Ireland"
              },
              {
                title: "Expert Support",
                description: "Get help from our experienced property experts"
              },
              {
                title: "Secure Transactions",
                description: "Safe and secure property dealings guaranteed"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through our platform
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white  hover:bg-gray-100"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </main>
  )
}