import PropertyForm from "@/components/ListForm";

export function ListPropertyPage() {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.user_id;

    return (
      <div className="min-h-screen bg-gray-100">
        <PropertyForm userId={userId} />
      </div>
    );
  }