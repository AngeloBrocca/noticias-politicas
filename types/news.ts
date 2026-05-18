export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;

  source: {
    name: string;
    url: string;
  };
}