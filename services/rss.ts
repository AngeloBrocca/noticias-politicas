import { XMLParser } from "fast-xml-parser";
import { NewsItem } from "@/types/news";

const parser = new XMLParser({
  ignoreAttributes: false,
});

type ParsedRSSItem = {
  title: string;
  link: string;
  pubDate: string;
  source?: {
    "#text"?: string;
    "@_url"?: string;
  } | string;
};

async function fetchRSS(domain: string): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=site:${domain}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  const xml = await response.text();

  const json = parser.parse(xml);

  const items = json.rss.channel.item || [];

  return (items as ParsedRSSItem[]).map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,

    source: {
      name: typeof item.source === "string" ? item.source : item.source?.["#text"] || "",
      url: typeof item.source === "string" ? "" : item.source?.["@_url"] || "",
    },
  }));
}

export async function getGroupedNews(
  domains: string[]
) {
  const responses = await Promise.all(
    domains.map((domain) => fetchRSS(domain))
  );

  return responses.flat();
}