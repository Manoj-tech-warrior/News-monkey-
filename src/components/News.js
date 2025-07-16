

import React, { useEffect, useState, useCallback } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types'




const News = (props)=>  {
   
    const CapitalizeFirstLetter = (string)=> {
        return string[0].toUpperCase() + string.slice(1);
      }
      document.title = `${CapitalizeFirstLetter(props.category)} - NewsMonkey`;
      
        const [articles, setArticles] = useState([])
        const [Loading, setLoading] = useState(true)
        const [page, setPage] = useState(1)
        const [totalResults, setTotalResults] = useState(0)

    
    //https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=636a0b4b78574390aa3f98b7e296c345
const apiKey = "636a0b4b78574390aa3f98b7e296c345";
    
   const  fetchNews= useCallback(async()=>{
    try {
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&pageSize=${props.pageSize}`;
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
        setPage(2); // Set to 2 since we've loaded the first page
    } catch (error) {
        console.error('Error fetching news:', error);
        setArticles([]);
        setTotalResults(0);
    } finally {
        setLoading(false);
    }
   }, [props.category, props.pageSize, apiKey])
   
   useEffect(()=>{
        setArticles([]); // Clear previous articles before fetching new ones
        setPage(1);
        fetchNews();
    },[props.category, fetchNews])
   
   const fetchMoreData = async()=>{
    try {
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&pageSize=${props.pageSize}&page=${page}`;
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
    } finally {        setLoading(false);
    }
   }
    

    
        return (
            <div className='container my-3'>
                <h2 className='text-center sticky '><b>News-Monkey Top Headlines-News from {CapitalizeFirstLetter(props.category)}</b></h2>
               {Loading && articles.length === 0 && <Spinner/>}
               <InfiniteScroll
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    dataLength={articles.length}
                    loader={<Spinner/> }> 
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
                {/* <div className="container-3 d-flex justify-content-between">
                    <button type="button"  disabled={page <= 1} className="btn btn-dark">&larr; previous</button>
                    <button type="button"  className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </div>
        );
    }


export default News;



