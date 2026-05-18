import { NewsItem } from "@/types/news";
import { NewsCard } from "./NewsCard";

type Props = {
  title: string;
  articles: NewsItem[];
};

export function NewsColumn({
  title,
  articles,
}: Props) {
  return (
    <section className="column">
      <h2>{title}</h2>

      <div className="news-list">
        {articles.map((article) => (
          <NewsCard
            key={article.link}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}