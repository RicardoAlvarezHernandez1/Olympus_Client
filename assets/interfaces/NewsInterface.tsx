// This TypeScript interface defines the structure for a NewsItem object.
export interface NewsItem {
  // Information about the source of the news item.
  source: {
    // Unique identifier for the news source (can be null).
    id: string | null;

    // Name of the news source.
    name: string;
  };

  // Author of the news item.
  author: string;

  // Title of the news item.
  title: string;

  // Brief description of the news item.
  description: string;

  // URL to the full news article.
  url: string;

  // URL to an image associated with the news item.
  urlToImage: string;

  // Date and time when the news item was published.
  publishedAt: string;

  // Full content or summary of the news item.
  content: string;
}
