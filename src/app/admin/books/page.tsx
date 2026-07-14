"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BookOpen, Upload, X, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Category {
  _id: string;
  name: string;
}

export default function AddBookPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    fullDescription: "",
    price: "",
    originalPrice: "",
    category: "",
    tags: "",
    publisher: "",
    publishedDate: "",
    language: "English",
    cover: "",
    inStock: true,
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    rating: "0",
    reviewCount: "0",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/categories`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: "POST",
        credentials: "include",
        body: uploadData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, cover: data.url }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          cover: formData.cover || "/books/default.jpg",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create book");
      }

      toast.success("Book created successfully");
      router.push("/admin/books");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create book");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold text-foreground">Add New Book</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Book Details</h3>
              <div className="space-y-4">
                <Input
                  label="Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                />
                <Input
                  label="Author *"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
                <div>
                  <label className="label-field">Short Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="input-field w-full resize-none"
                    placeholder="Brief description of the book"
                  />
                </div>
                <div>
                  <label className="label-field">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={6}
                    className="input-field w-full resize-none"
                    placeholder="Detailed description of the book"
                  />
                </div>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pricing & Stock</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Price *"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
                <Input
                  label="Original Price"
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                <Input
                  label="Rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="0.0"
                />
                <Input
                  label="Review Count"
                  name="reviewCount"
                  type="number"
                  min="0"
                  value={formData.reviewCount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">New Release</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBestseller"
                    checked={formData.isBestseller}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">Bestseller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">Featured</span>
                </label>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Publisher name"
                />
                <Input
                  label="Published Date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  placeholder="e.g. January 1, 2024"
                />
                <Input
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="English"
                />
                <Input
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Fiction, Adventure, Classic"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Category *</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field w-full appearance-none bg-card"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  No categories found.{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/admin/categories")}
                    className="text-accent hover:underline"
                  >
                    Add one first
                  </button>
                </p>
              )}
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Cover Image</h3>
              <div className="space-y-4">
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-primary-dark border-2 border-dashed border-card-border flex items-center justify-center">
                  {imagePreview || formData.cover ? (
                    <img
                      src={imagePreview || formData.cover}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No image selected</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="btn-outline w-full justify-center cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload from Computer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {(imagePreview || formData.cover) && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, cover: "" }));
                    }}
                    className="text-sm text-destructive hover:underline flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove image
                  </button>
                )}
                <Input
                  label="Or enter image URL"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </Card>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Book
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
