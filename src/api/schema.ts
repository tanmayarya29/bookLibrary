export interface Book {
  title: string;
  subtitle: string;
  author_name: string[];
  latest_publish_year: number;
  first_publish_year: number;
}

export interface BookMetadata {
  total: number;
}
