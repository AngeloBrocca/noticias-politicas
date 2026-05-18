import { NewsColumn } from "@/components/NewsColumn";

import {
  LEFT_SOURCES,
  RIGHT_SOURCES,
} from "@/constants/sources";

import {
  getGroupedNews,
} from "@/services/rss";

export default async function Home() {
  const [leftNews, rightNews] =
    await Promise.all([
      getGroupedNews(LEFT_SOURCES),
      getGroupedNews(RIGHT_SOURCES),
    ]);

  return (
    <main>
      <header className="header">
        <h1>Ponto Cego</h1>

        <p>
          Veja como diferentes espectros políticos
          noticiam os acontecimentos
        </p>
      </header>

      <section className="container">
        {/* DIREITA */}
        <div className="side left">
          <NewsColumn
            title="Para a Esquerda"
            articles={rightNews}
          />
        </div>

        <div className="divider" />

        {/* ESQUERDA */}
        <div className="side right">
          <NewsColumn
            title="Para a Direita"
            articles={leftNews}
          />
        </div>
      </section>
    </main>
  );
}