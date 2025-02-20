import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description ,imageUrl,newsUrl}= this.props;
    return (
      <div>
        <div className="card" >
          <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/b1b2/live/b8148c10-ec5e-11ef-bd1b-d536627785f2.jpg":imageUrl} className="card-img-top" alt="..."/>
           <div className="card-body">
           <h5 className="card-title">{title}...</h5>
           <p className="card-text">{description}...</p>
             <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
         </div>
      </div>
        
             </div>
    )
  }
}

export default NewsItem
