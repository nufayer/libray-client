"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BookOpen, Search, Loader2, Pencil, Trash2, X, Upload } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  publisher?: string;
  publishedDate?: string;
  language?: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
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
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/books`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
      toast.error("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/books/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete book");
      }

      toast.success("Book deleted successfully");
      setBooks((prev) => prev.filter((b) => b._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete book");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = async (book: Book) => {
    setEditBook(book);
    setIsEditLoading(true);
    setEditImagePreview(null);

    try {
      const res = await fetch(`${API_URL}/api/admin/books/${book._id}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const b = data.book;
        setEditForm({
          title: b.title || "",
          author: b.author || "",
          description: b.description || "",
          fullDescription: b.fullDescription || "",
          price: String(b.price ?? ""),
          originalPrice: String(b.originalPrice ?? ""),
          category: b.category || "",
          tags: Array.isArray(b.tags) ? b.tags.join(", ") : b.tags || "",
          publisher: b.publisher || "",
          publishedDate: b.publishedDate || "",
          language: b.language || "English",
          cover: b.cover || "",
          inStock: b.inStock ?? true,
          isNew: b.isNew ?? false,
          isBestseller: b.isBestseller ?? false,
          isFeatured: b.isFeatured ?? false,
          rating: String(b.rating ?? 0),
          reviewCount: String(b.reviewCount ?? 0),
        });
      }
    } catch (error) {
      console.error("Failed to fetch book:", error);
      toast.error("Failed to load book data");
      setEditBook(null);
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditImagePreview(URL.createObjectURL(file));

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
        setEditForm((prev) => ({ ...prev, cover: data.url }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Failed to upload image");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBook) return;

    if (!editForm.title || !editForm.author || !editForm.price || !editForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/books/${editBook._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...editForm,
          cover: editForm.cover || "/books/default.jpg",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update book");
      }

      toast.success("Book updated successfully");
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update book");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold text-foreground">Manage Books</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold text-foreground">Manage Books</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card variant="elevated" padding="lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Books</p>
              <p className="text-2xl font-bold text-foreground">{books.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      <Card variant="elevated" padding="lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {books.length === 0 ? "No books yet" : "No books match your search"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Cover</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Title</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Author</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Price</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Category</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-3 pr-4">Stock</th>
                    <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book._id} className="border-b border-card-border/50 last:border-0">
                      <td className="py-3 pr-4">
                        <div className="w-10 h-14 rounded overflow-hidden bg-primary-dark flex-shrink-0">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/books/default.jpg";
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-foreground text-sm truncate max-w-[200px]">{book.title}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-sm text-muted-foreground truncate max-w-[150px]">{book.author}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-sm font-medium text-foreground">${book.price.toFixed(2)}</p>
                        {book.originalPrice && book.originalPrice > book.price && (
                          <p className="text-xs text-muted-foreground line-through">${book.originalPrice.toFixed(2)}</p>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline" size="sm">{book.category}</Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={book.inStock ? "success" : "destructive"} size="sm">
                          {book.inStock ? "In Stock" : "Out"}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(book)}
                            aria-label={`Edit ${book.title}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(book)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label={`Delete ${book.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="flex items-start gap-3 p-3 bg-card-hover rounded-lg border border-card-border"
                >
                  <div className="w-12 h-16 rounded overflow-hidden bg-primary-dark flex-shrink-0">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/books/default.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{book.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <p className="text-sm font-medium text-foreground">${book.price.toFixed(2)}</p>
                      <Badge variant="outline" size="sm">{book.category}</Badge>
                      <Badge variant={book.inStock ? "success" : "destructive"} size="sm">
                        {book.inStock ? "In Stock" : "Out"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(book)}
                      aria-label={`Edit ${book.title}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(book)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      aria-label={`Delete ${book.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card variant="elevated" padding="lg" className="w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Book</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete &quot;{deleteTarget.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {editBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8">
            {isEditLoading ? (
              <Card variant="elevated" padding="lg" className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              </Card>
            ) : (
              <Card variant="elevated" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Edit Book</h3>
                  <button
                    onClick={() => setEditBook(null)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <Card variant="default" padding="md">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Book Details</h4>
                        <div className="space-y-3">
                          <Input
                            label="Title *"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                            placeholder="Enter book title"
                            required
                          />
                          <Input
                            label="Author *"
                            name="author"
                            value={editForm.author}
                            onChange={handleEditChange}
                            placeholder="Enter author name"
                            required
                          />
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Short Description</label>
                            <textarea
                              name="description"
                              value={editForm.description}
                              onChange={handleEditChange}
                              rows={3}
                              className="w-full rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50 transition-all duration-200 text-base px-4 py-2.5 resize-none"
                              placeholder="Brief description of the book"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Full Description</label>
                            <textarea
                              name="fullDescription"
                              value={editForm.fullDescription}
                              onChange={handleEditChange}
                              rows={5}
                              className="w-full rounded-lg bg-card border border-card-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50 transition-all duration-200 text-base px-4 py-2.5 resize-none"
                              placeholder="Detailed description of the book"
                            />
                          </div>
                        </div>
                      </Card>

                      <Card variant="default" padding="md">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Pricing & Stock</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Price *"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={editForm.price}
                            onChange={handleEditChange}
                            placeholder="0.00"
                            required
                          />
                          <Input
                            label="Original Price"
                            name="originalPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            value={editForm.originalPrice}
                            onChange={handleEditChange}
                            placeholder="0.00"
                          />
                          <Input
                            label="Rating"
                            name="rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editForm.rating}
                            onChange={handleEditChange}
                            placeholder="0.0"
                          />
                          <Input
                            label="Review Count"
                            name="reviewCount"
                            type="number"
                            min="0"
                            value={editForm.reviewCount}
                            onChange={handleEditChange}
                            placeholder="0"
                          />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="inStock"
                              checked={editForm.inStock}
                              onChange={handleEditChange}
                              className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-foreground">In Stock</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="isNew"
                              checked={editForm.isNew}
                              onChange={handleEditChange}
                              className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-foreground">New Release</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="isBestseller"
                              checked={editForm.isBestseller}
                              onChange={handleEditChange}
                              className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-foreground">Bestseller</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="isFeatured"
                              checked={editForm.isFeatured}
                              onChange={handleEditChange}
                              className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-foreground">Featured</span>
                          </label>
                        </div>
                      </Card>

                      <Card variant="default" padding="md">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Additional Info</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Publisher"
                            name="publisher"
                            value={editForm.publisher}
                            onChange={handleEditChange}
                            placeholder="Publisher name"
                          />
                          <Input
                            label="Published Date"
                            name="publishedDate"
                            value={editForm.publishedDate}
                            onChange={handleEditChange}
                            placeholder="e.g. January 1, 2024"
                          />
                          <Input
                            label="Language"
                            name="language"
                            value={editForm.language}
                            onChange={handleEditChange}
                            placeholder="English"
                          />
                          <Input
                            label="Tags (comma separated)"
                            name="tags"
                            value={editForm.tags}
                            onChange={handleEditChange}
                            placeholder="Fiction, Adventure, Classic"
                          />
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card variant="default" padding="md">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Category *</h4>
                        <select
                          name="category"
                          value={editForm.category}
                          onChange={handleEditChange}
                          className="w-full rounded-lg bg-card border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50 transition-all duration-200 text-base px-4 py-2.5 appearance-none"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </Card>

                      <Card variant="default" padding="md">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Cover Image</h4>
                        <div className="space-y-3">
                          <div className="aspect-[2/3] rounded-xl overflow-hidden bg-primary-dark border-2 border-dashed border-card-border flex items-center justify-center">
                            {editImagePreview || editForm.cover ? (
                              <img
                                src={editImagePreview || editForm.cover}
                                alt="Cover preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <Upload className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">No image</p>
                              </div>
                            )}
                          </div>
                          <label className="btn-outline w-full justify-center cursor-pointer inline-flex items-center gap-2 text-sm">
                            <Upload className="w-4 h-4" />
                            Upload from Computer
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleEditImageUpload}
                              className="hidden"
                            />
                          </label>
                          {(editImagePreview || editForm.cover) && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditImagePreview(null);
                                setEditForm((prev) => ({ ...prev, cover: "" }));
                              }}
                              className="text-xs text-destructive hover:underline flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              Remove image
                            </button>
                          )}
                          <Input
                            label="Or enter image URL"
                            name="cover"
                            value={editForm.cover}
                            onChange={handleEditChange}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditBook(null)}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
