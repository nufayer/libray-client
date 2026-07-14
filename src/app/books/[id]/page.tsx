"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  BookOpen,
  ChevronRight,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  User,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Globe,
  Hash,
  Building,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface Book {
  id: string | number;
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
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  language?: string;
  fullDescription?: string;
  tableOfContents?: string[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right.",
    cover: "/books/midnight-library.jpg",
    rating: 4.8,
    reviewCount: 12450,
    price: 14.99,
    originalPrice: 19.99,
    category: "Fiction",
    tags: ["Bestseller", "Contemporary", "Philosophical"],
    inStock: true,
    isBestseller: true,
    pages: 304,
    publisher: "Viking",
    publishedDate: "September 29, 2020",
    isbn: "978-0525559474",
    language: "English",
    fullDescription: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?\n\nNora Seed finds herself faced with this decision. Faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to see what is worth living for, what we can choose to change, and what it means to be happy.\n\nA dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How to Stop Time.",
    tableOfContents: [
      "Chapter 1: The Root",
      "Chapter 2: The Library",
      "Chapter 3: The Midnight Library",
      "Chapter 4: Another Life",
      "Chapter 5: The Decision",
      "Chapter 6: Coming Home",
    ],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones. Tiny changes, remarkable results.",
    cover: "/books/atomic-habits.jpg",
    rating: 4.9,
    reviewCount: 45230,
    price: 16.99,
    originalPrice: 22.99,
    category: "Self-Help",
    tags: ["Bestseller", "Productivity", "Psychology"],
    inStock: true,
    isBestseller: true,
    pages: 320,
    publisher: "Avery",
    publishedDate: "October 16, 2018",
    isbn: "978-0735211292",
    language: "English",
    fullDescription: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.\n\nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can teach you how to master the tiny behaviors that lead to remarkable results.\n\nOne insight at a time, this book will teach you how to design your environment to make success easier, how to make time for new habits even when life gets crazy, and how to get back on track when you fall off course.",
    tableOfContents: [
      "The Fundamentals: Why Tiny Changes Make a Big Difference",
      "The 1st Law: Make It Obvious",
      "The 2nd Law: Make It Attractive",
      "The 3rd Law: Make It Easy",
      "The 4th Law: Make It Satisfying",
      "Advanced Tactics: How to Go from Being Merely Good to Being Truly Great",
    ],
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save humanity from extinction in this brilliant sci-fi adventure.",
    cover: "/books/project-hail-mary.jpg",
    rating: 4.7,
    reviewCount: 18760,
    price: 15.99,
    category: "Science Fiction",
    tags: ["New Release", "Space", "Adventure"],
    inStock: true,
    isNew: true,
    pages: 496,
    publisher: "Ballantine Books",
    publishedDate: "May 4, 2021",
    isbn: "978-0593135204",
    language: "English",
    fullDescription: "Ryland Grace is the sole survivor on a desperate, last-chance mission--and if he fails, humanity and the earth itself are finished. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.\n\nAll he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.\n\nHis crewmates dead, his memories fuzzily returning, Ryland realizes that an impossible task now confronts him. Hurtling through space on this tiny ship, it's up to him to puzzle out an extraterrestrial conspiracy while also battling his own personal demons.",
    tableOfContents: [
      "Part One: Memories",
      "Part Two: Discovery",
      "Part Three: Convergence",
      "Part Four: Solution",
      "Epilogue",
    ],
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "A reclusive Hollywood icon finally tells her story in this captivating tale of love and ambition.",
    cover: "/books/evelyn-hugo.jpg",
    rating: 4.6,
    reviewCount: 22100,
    price: 13.99,
    originalPrice: 18.99,
    category: "Historical Fiction",
    tags: ["Bestseller", "LGBTQ+", "Hollywood"],
    inStock: true,
    isBestseller: true,
    pages: 400,
    publisher: "Atria Books",
    publishedDate: "June 13, 2017",
    isbn: "978-1501161933",
    language: "English",
    fullDescription: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more surprised than Monique herself.\n\nSummoned to Evelyn's luxurious apartment, Monique listens in fascination as the actress tells her story. From making her way to Los Angeles in the 1950s to her decision to leave show business in the '80s, and, of course, the seven husbands along the way, Evelyn unspools a tale of ruthless ambition, unexpected friendship, and a great forbidden love.",
    tableOfContents: [
      "Monique",
      "Evelyn",
      "Husband #1: Don Adler",
      "Husband #2: Mick Riva",
      "Husband #3: Rex North",
      "Husband #4: Harry Cameron",
      "Husband #5: Max Girard",
      "Husband #6: John Brooks",
      "Husband #7: Dan Reagan",
      "Celia",
      "The Truth",
    ],
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description: "From the Nobel Prize winner, a haunting look at our changing world through the eyes of an Artificial Friend.",
    cover: "/books/klara-sun.jpg",
    rating: 4.5,
    reviewCount: 8920,
    price: 14.99,
    category: "Literary Fiction",
    tags: ["New Release", "AI", "Dystopian"],
    inStock: true,
    isNew: true,
    pages: 320,
    publisher: "Knopf",
    publishedDate: "March 2, 2021",
    isbn: "978-0593318171",
    language: "English",
    fullDescription: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her.\n\nKlara and the Sun is a thrilling book that offers a look at our changing world through the eyes of an unforgettable narrator, and one that explores the fundamental question: what does it mean to love?\n\nIn its award-winning novelist Kazuo Ishiguro's masterpiece, we see the world through the eyes of Klara, an Artificial Friend with outstanding observational qualities. Watching through the window of a shop, Klara observes the behavior of those who come in to browse, and of those who pass by on the street. She hopes that a customer will soon choose her.",
    tableOfContents: [
      "Part I",
      "Part II",
      "Part III",
      "Part IV",
      "Part V",
    ],
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't about what you know.",
    cover: "/books/psychology-money.jpg",
    rating: 4.8,
    reviewCount: 31450,
    price: 17.99,
    category: "Finance",
    tags: ["Bestseller", "Investing", "Behavioral Economics"],
    inStock: true,
    isBestseller: true,
    pages: 256,
    publisher: "Harriman House",
    publishedDate: "September 8, 2020",
    isbn: "978-0857197696",
    language: "English",
    fullDescription: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.\n\nMoney--investing, personal finance, and business decisions--is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions in a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.\n\nIn The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    tableOfContents: [
      "No One's Crazy",
      "Luck & Risk",
      "Never Enough",
      "Confounding Compounding",
      "Getting Wealthy vs. Staying Wealthy",
      "Tails, You Win",
      "Freedom",
      "Man in the Car Paradox",
      "Wealth Is What You Don't See",
      "Save Money",
      "Reasonable > Rational",
      "Surprise!",
      "Room for Error",
      "You'll Change",
      "Nothing's Free",
      "You & Me",
      "The Seduction of Pessimism",
      "When You'll Believe Anything",
    ],
  },
  {
    id: 7,
    title: "Circe",
    author: "Madeline Miller",
    description: "A bold and subversive retelling of the goddess Circe's story from Homer's Odyssey.",
    cover: "/books/circe.jpg",
    rating: 4.7,
    reviewCount: 15670,
    price: 12.99,
    originalPrice: 17.99,
    category: "Fantasy",
    tags: ["Mythology", "Greek", "Female Protagonist"],
    inStock: true,
    pages: 400,
    publisher: "Little, Brown and Company",
    publishedDate: "April 10, 2018",
    isbn: "978-0316556347",
    language: "English",
    fullDescription: "In the house of Helios, god of the sun and mightiest of the Titans, a girl is born. Circe is a strange child--not powerful like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess a power--the power of witchcraft.\n\nWhen threatens to drive her apart from those she loves, Circe must choose whether to belong with the gods she is born from, or the mortals she has come to love.\n\nWith unforgettably vivid characters, mesmerizing language, and a stunning combination of the everyday and the fantastical, Madeline Miller's Circe is an intoxicating tale of family rivalry, lust, and those who are trapped between the two.",
    tableOfContents: [
      "I. The Girl",
      "II. The Punishment",
      "III. The Boat",
      "IV. The Island",
      "V. The Son",
      "VI. The Sorceress",
      "VII. The Labyrinth",
      "VIII. The Mountain",
      "IX. The Return",
      "X. The Homecoming",
    ],
  },
  {
    id: 8,
    title: "Educated",
    author: "Tara Westover",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge.",
    cover: "/books/educated.jpg",
    rating: 4.8,
    reviewCount: 28900,
    price: 14.99,
    originalPrice: 19.99,
    category: "Memoir",
    tags: ["Bestseller", "Inspirational", "Coming of Age"],
    inStock: true,
    isBestseller: true,
    pages: 352,
    publisher: "Random House",
    publishedDate: "February 20, 2018",
    isbn: "978-0399590504",
    language: "English",
    fullDescription: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent.\n\nWhen another brother got himself into college, Tara decided to try a new kind of life. Her quest for knowledge transformed her, taking her over oceans and across continents, to Harvard and to Cambridge University. Only then would she wonder if she'd traveled too far, if there was still a way home.\n\nEducated is an account of the struggle for self-invention. It is a tale of fierce family loyalty, and of the grief that comes with severing the closest of ties.",
    tableOfContents: [
      "Part One: The Mountain",
      "Part One: The Child",
      "Part Two: The Educated",
      "Part Three: The Family",
      "Part Four: The World",
      "Part Five: The Wilderness",
    ],
  },
  {
    id: 9,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A woman's act of violence against her husband—and the therapist obsessed with uncovering her motive.",
    cover: "/books/silent-patient.jpg",
    rating: 4.4,
    reviewCount: 19800,
    price: 11.99,
    originalPrice: 16.99,
    category: "Thriller",
    tags: ["Psychological", "Mystery", "Page Turner"],
    inStock: true,
    pages: 352,
    publisher: "Celadon Books",
    publishedDate: "February 5, 2019",
    isbn: "978-1250301697",
    language: "English",
    fullDescription: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with a big glass studio overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face.\n\nAnd then she never speaks another word.\n\nAlicia's refusal to talk, or offer any kind of explanation, turns a domestic tragedy into something far grander, a media sensation, a mystery that captures the public imagination. The Silent Patient is a shocking psychological thriller of a woman's act of violence against her husband--and of the therapist obsessed with uncovering her motive.",
    tableOfContents: [
      "Alicia",
      "Theo",
      "The Patient",
      "The Investigation",
      "The Breakdown",
      "The Truth",
    ],
  },
  {
    id: 10,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description: "A coming-of-age story and murder mystery set in the marshes of North Carolina.",
    cover: "/books/crawdads-sing.jpg",
    rating: 4.6,
    reviewCount: 34500,
    price: 13.99,
    originalPrice: 18.99,
    category: "Mystery",
    tags: ["Bestseller", "Nature", "Southern Gothic"],
    inStock: true,
    isBestseller: true,
    pages: 384,
    publisher: "G.P. Putnam's Sons",
    publishedDate: "August 14, 2018",
    isbn: "978-0735219090",
    language: "English",
    fullDescription: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.\n\nKya is indeed what the locals call her--she lives alone in the marsh, making a living from the land. But she is also intelligent, sensitive, and has a rich inner world. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life--until the unthinkable happens.\n\nPerfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder.",
    tableOfContents: [
      "Part I: The Marsh",
      "Part II: The Town",
      "Part III: The Trial",
      "Part IV: The Marsh",
    ],
  },
  {
    id: 11,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind. From the Stone Age to the Silicon Age.",
    cover: "/books/sapiens.jpg",
    rating: 4.7,
    reviewCount: 25600,
    price: 18.99,
    category: "History",
    tags: ["Anthropology", "Evolution", "Society"],
    inStock: true,
    pages: 464,
    publisher: "Harper",
    publishedDate: "February 10, 2015",
    isbn: "978-0062316097",
    language: "English",
    fullDescription: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one--homo sapiens. What happened to the others? And what may happen to us?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here, and where we're going. Sapiens is a thrilling account of humankind's extraordinary history--from the Stone Age to the Silicon Age--and our journey from insignificant apes to rulers of the world.\n\nSapiens takes us on a cruise through the entire history of our species, from the emergence of Homo sapiens in Africa to the present, and asks: what is the story of us? How did we go from being an insignificant ape to becoming the rulers of the world?",
    tableOfContents: [
      "Part One: The Cognitive Revolution",
      "Part Two: The Agricultural Revolution",
      "Part Three: The Unification of Humankind",
      "Part Four: The Scientific Revolution",
    ],
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A magical story about following your dreams and listening to your heart.",
    cover: "/books/alchemist.jpg",
    rating: 4.5,
    reviewCount: 42100,
    price: 10.99,
    originalPrice: 14.99,
    category: "Fiction",
    tags: ["Classic", "Philosophical", "Inspirational"],
    inStock: true,
    pages: 208,
    publisher: "HarperOne",
    publishedDate: "April 25, 1993",
    isbn: "978-0062315007",
    language: "English",
    fullDescription: "Paulo Coelho's masterwork tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different--and far more satisfying--than he ever imagined.\n\nSantiago's journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, to follow our dreams.",
    tableOfContents: [
      "The Dream",
      "The Journey Begins",
      "The Crystal Merchant",
      "The Oasis",
      "The Alchemist",
      "The Transformation",
      "The Return",
    ],
  },
];

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "December 15, 2024",
    title: "Absolutely captivating!",
    content: "I couldn't put this book down. The characters are so well-developed and the plot keeps you guessing until the very end. A must-read for anyone who loves a good story.",
    helpful: 45,
    notHelpful: 2,
    verified: true,
  },
  {
    id: 2,
    author: "James K.",
    rating: 4,
    date: "November 28, 2024",
    title: "Great read, minor issues",
    content: "Really enjoyed this book overall. The writing style is engaging and the themes are thought-provoking. My only complaint is that the pacing felt a bit slow in the middle section.",
    helpful: 32,
    notHelpful: 5,
    verified: true,
  },
  {
    id: 3,
    author: "Emily R.",
    rating: 5,
    date: "November 10, 2024",
    title: "Changed my perspective",
    content: "This book truly changed how I think about the world. The author's insights are profound yet accessible. I've recommended it to everyone I know.",
    helpful: 28,
    notHelpful: 1,
    verified: false,
  },
  {
    id: 4,
    author: "Michael T.",
    rating: 4,
    date: "October 22, 2024",
    title: "Worth every penny",
    content: "An excellent book that delivers on its promises. The research is thorough and the presentation is clear. I learned so much from reading this.",
    helpful: 19,
    notHelpful: 3,
    verified: true,
  },
  {
    id: 5,
    author: "Lisa P.",
    rating: 3,
    date: "October 5, 2024",
    title: "Good but not great",
    content: "It's a solid book with some interesting ideas, but I felt it could have been more concise. Some sections felt repetitive. Still worth reading if you're interested in the topic.",
    helpful: 15,
    notHelpful: 8,
    verified: true,
  },
];

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-current"
              : i < rating
              ? "text-amber-400 fill-current opacity-50"
              : "text-muted-foreground/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params.id;

  const book = useMemo(() => mockBooks.find((b) => String(b.id) === String(bookId)), [bookId]);

  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card variant="elevated" padding="lg" className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/books" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse All Books
          </Link>
        </Card>
      </div>
    );
  }

  const hasDiscount = book.originalPrice && book.originalPrice > book.price;
  const discountPercent = hasDiscount ? Math.round((1 - book.price / book.originalPrice!) * 100) : 0;

  const relatedBooks = mockBooks
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, 4);

  const moreBooks = relatedBooks.length < 4
    ? [...relatedBooks, ...mockBooks.filter((b) => b.id !== book.id && !relatedBooks.find((r) => r.id === b.id)).slice(0, 4 - relatedBooks.length)]
    : relatedBooks;

  const ratingDistribution = [
    { stars: 5, percent: 68 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-primary-dark/30 border-b border-border">
        <nav className="section-container py-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li>
              <Link href="/books" className="hover:text-foreground transition-colors">Books</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li>
              <Link href={`/books?category=${book.category}`} className="hover:text-foreground transition-colors">{book.category}</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{book.title}</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="section-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-primary-dark border border-card-border">
              {(book.isNew || book.isBestseller) && (
                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                  {book.isBestseller && <Badge variant="warning" size="md">Bestseller</Badge>}
                  {book.isNew && <Badge variant="accent" size="md">New Release</Badge>}
                </div>
              )}
              {hasDiscount && (
                <Badge variant="destructive" size="md" className="absolute top-4 right-4 z-10">
                  -{discountPercent}% Off
                </Badge>
              )}
              <img
                src={book.cover}
                alt={`${book.title} by ${book.author} book cover`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i - 1)}
                  className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i - 1
                      ? "border-accent"
                      : "border-card-border hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={book.cover}
                    alt={`View ${i}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" size="sm" className="mb-3">{book.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground">
                by <span className="text-foreground font-medium">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={book.rating} />
              <span className="font-semibold text-foreground">{book.rating}</span>
              <span className="text-muted-foreground">({book.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-accent">${book.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${book.originalPrice!.toFixed(2)}</span>
                  <Badge variant="destructive" size="sm">Save ${(book.originalPrice! - book.price).toFixed(2)}</Badge>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, i) => (
                <Badge key={i} variant="default" size="sm">#{tag}</Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center border border-card-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-foreground font-medium border-x border-card-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={!book.inStock}
                >
                  <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                  {book.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant={isInWishlist ? "accent" : "outline"}
                  size="lg"
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} aria-hidden="true" />
                </Button>
                <Button variant="outline" size="lg" aria-label="Share">
                  <Share2 className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-card-border">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex border-b border-card-border mb-6 overflow-x-auto">
            {[
              { id: "description" as const, label: "Description" },
              { id: "specifications" as const, label: "Specifications" },
              { id: "reviews" as const, label: `Reviews (${book.reviewCount.toLocaleString()})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-accent border-accent"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">About this book</h2>
              <div className="prose prose-invert max-w-none">
                {book.fullDescription?.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {book.tableOfContents && book.tableOfContents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Table of Contents</h3>
                  <ol className="space-y-2">
                    {book.tableOfContents.map((chapter, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-primary-dark flex items-center justify-center text-xs font-medium text-accent">
                          {i + 1}
                        </span>
                        {chapter}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Book Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: "Pages", value: book.pages?.toString() || "N/A" },
                  { icon: Building, label: "Publisher", value: book.publisher || "N/A" },
                  { icon: Calendar, label: "Published", value: book.publishedDate || "N/A" },
                  { icon: Hash, label: "ISBN", value: book.isbn || "N/A" },
                  { icon: Globe, label: "Language", value: book.language || "N/A" },
                  { icon: Bookmark, label: "Category", value: book.category },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-card-hover rounded-xl border border-card-border">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-8 mb-8">
                {/* Rating Summary */}
                <div className="text-center sm:text-left">
                  <div className="text-5xl font-bold text-foreground mb-2">{book.rating}</div>
                  <StarRating rating={book.rating} size="lg" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {book.reviewCount.toLocaleString()} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1 space-y-2">
                  {ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-8">{dist.stars}★</span>
                      <div className="flex-1 h-2 bg-primary-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${dist.percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">{dist.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <Card key={review.id} variant="default" padding="md">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{review.author}</span>
                            {review.verified && (
                              <Badge variant="success" size="sm">Verified Purchase</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{review.content}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Was this helpful?</span>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {review.helpful}
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                        {review.notHelpful}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Books */}
        {moreBooks.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {moreBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  href={`/books/${relatedBook.id}`}
                  className="card-base card-hover group"
                >
                  <div className="aspect-[2/3] overflow-hidden bg-primary-dark rounded-t-xl">
                    <img
                      src={relatedBook.cover}
                      alt={`${relatedBook.title} by ${relatedBook.author}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedBook.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span className="text-sm font-medium">{relatedBook.rating}</span>
                      </div>
                      <span className="font-bold text-accent">${relatedBook.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
