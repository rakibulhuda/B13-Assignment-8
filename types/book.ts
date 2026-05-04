export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: "Story" | "Tech" | "Science";
  available_quantity: number;
  image_url: string;
}

export type Category = "All" | "Story" | "Tech" | "Science";
