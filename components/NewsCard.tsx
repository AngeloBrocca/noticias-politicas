import { NewsItem } from "@/types/news";

type Props = {
  article: NewsItem;
};

export function NewsCard({
  article,
}: Props) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      className="news-card"
    >
      <div className="news-content">
        <span>{article.source.name}</span>

        <h3>{article.title}</h3>

        <small>
          {new Date(
            article.pubDate
          ).toLocaleDateString("pt-BR")}
        </small>
      </div>
    </a>
  );
}