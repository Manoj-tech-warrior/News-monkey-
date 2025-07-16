import React, { useEffect, useState, useCallback } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>  {

    const CapitalizeFirstLetter = (string)=> {
        return string[0].toUpperCase() + string.slice(1);
    }
    document.title = `${CapitalizeFirstLetter(props.category)} - NewsMonkey`;

    const [articles, setArticles] = useState([])
    const [Loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // ✅ Yaha apna backend ka URL use kar
    const backendBaseUrl = "http://news-backend-jp4z.onrender.com"; 
    // Deploy hone ke baad replace kar dena:
    // const backendBaseUrl = "https://<your-backend>.onrender.com";

    const fetchNews = useCallback(async()=> {
        try {
            setLoading(true);
            let url = `${backendBaseUrl}/api/news?category=${props.category}&pageSize=${props.pageSize}&page=1`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            if (parsedData.articles && Array.isArray(parsedData.articles)) {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults || 0);
            } else {
                setArticles([]);
                setTotalResults(0);
            }
            setPage(2); 
        } catch (error) {
            console.error('Error fetching news:', error);
            setArticles([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    }, [props.category, props.pageSize]);

    useEffect(()=>{
        setArticles([]);
        setPage(1);
        fetchNews();
    }, [props.category, fetchNews]);

    const fetchMoreData = async()=> {
        try {
            setLoading(true);
            let url = `${backendBaseUrl}/api/news?category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            if (parsedData.articles && Array.isArray(parsedData.articles)) {
                setArticles((prevArticles) => {
                    const allArticles = [...prevArticles, ...parsedData.articles];
                    const uniqueArticles = allArticles.filter((article, index, self) =>
                        index === self.findIndex((a) => a.url === article.url)
                    );
                    return uniqueArticles;
                });
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching more news:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container my-3'>
            <h2 className='text-center sticky '>
                <b>News-Monkey Top Headlines - News from {CapitalizeFirstLetter(props.category)}</b>
            </h2>
            {Loading && articles.length === 0 && <Spinner/>}
            <InfiniteScroll
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                dataLength={articles.length}
                loader={<Spinner/>}
            > 
                <div className="container">
                    <div className="row">
                        {articles && articles.length > 0 && articles.map((element) => { 
                            return (
                                <div className='col-md-4 my-5' key={element.url}>
                                    <Newsitem 
                                        title={element.title} 
                                        Description={element.description} 
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url} 
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default News;
