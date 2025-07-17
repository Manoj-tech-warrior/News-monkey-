import React, { useEffect, useState, useCallback } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  // Utility to capitalize
  const CapitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${CapitalizeFirstLetter(props.category)} - NewsMonkey`;

  // State
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // ✅ Read backend URL from env
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || "https://news-backend-jp4z.onrender.com";

  // Fetch first page
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${backendBaseUrl}/api/news?category=${props.category}&pageSize=${props.pageSize}&page=1`;
      console.log("🔗 Fetching:", url);

      const response = await fetch(url);
      if (!response.ok) {
        console.error("❌ Error status:", response.status);
        setArticles([]);
        setTotalResults(0);
        return;
      }

      const parsedData = await response.json();
      console.log("✅ Data fetched:", parsedData);

      if (parsedData.articles && Array.isArray(parsedData.articles)) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults || 0);
        setPage(2);
      } else {
        setArticles([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error("🔥 Error fetching news:", err);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [props.category, props.pageSize, backendBaseUrl]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    fetchNews();
  }, [props.category, fetchNews]);

  // Fetch more data for infinite scroll
  const fetchMoreData = async () => {
    try {
      const url = `${backendBaseUrl}/api/news?category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
      console.log("📥 Loading more:", url);

      const response = await fetch(url);
      if (!response.ok) {
        console.error("❌ Error status on load more:", response.status);
        return;
      }

      const parsedData = await response.json();
      console.log("✅ More data:", parsedData);

      if (parsedData.articles && Array.isArray(parsedData.articles)) {
        setArticles((prevArticles) => {
          const allArticles = [...prevArticles, ...parsedData.articles];
          // remove duplicates by url
          const uniqueArticles = allArticles.filter(
            (article, index, self) =>
              index === self.findIndex((a) => a.url === article.url)
          );
          return uniqueArticles;
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error("🔥 Error fetching more news:", err);
    }
  };

  return (
    <div className="container my-3">
      <h2 className="text-center sticky">
        <b>
          News-Monkey Top Headlines - News from {CapitalizeFirstLetter(props.category)}
        </b>
      </h2>

      {loading && articles.length === 0 && <Spinner />}

      <InfiniteScroll
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        dataLength={articles.length}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.length > 0 &&
              articles.map((element) => (
                <div className="col-md-4 my-5" key={element.url}>
                  <Newsitem
                    title={element.title}
                    Description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
