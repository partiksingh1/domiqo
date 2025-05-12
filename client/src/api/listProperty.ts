export async function uploadImage(image: File) {
    const formData = new FormData();
    formData.append("file", image);
  
    const response = await fetch("http://localhost:3000/api/v1/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Image upload failed");
    }
  
    return response.json();
  }
  
  export async function listProperty(data: any) {
    const response = await fetch("http://localhost:3000/api/v1/properties/list-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to list property");
    }
  
    return response.json();
  }