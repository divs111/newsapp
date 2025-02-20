import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'


export class News extends Component {    
  static defaultProps =  {
    country : 'in',
    category : 'science'
  }
  static propTypes =  {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
  
    constructor(){
        super();
        console.log("Hello i'm a constructor from News Component")
        this.state=
            {
               articles: [],
               page :1,
               loading : false
    };
} 
async componentDidMount()
{
    let url= `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf24e962ea414e0b95c507e38ec365f4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ articles : parsedData.articles ,
      totalArticles : parsedData.totalResults,
      loading : false
    })
}

  handlePreviousClick = async()=>{
    console.log("previous")
    let url= `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf24e962ea414e0b95c507e38ec365f4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page : this.state.page - 1,
      articles : parsedData.articles,
      loading : false
    })
  }
  handleNextClick = async()=>{
    console.log("next")
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
      {
       let url= `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf24e962ea414e0b95c507e38ec365f4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
       this.setState({loading : true});
       let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page : this.state.page + 1,
      articles : parsedData.articles,
      loading: false
    })
    }
  }
  
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin : '30px'}}>NewsBreak - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-3" key= {element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
   }
}

export default News
