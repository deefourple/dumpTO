import React, { Component } from 'react';
import './App.css';
import contentfulCMS from './utils/cms'

class App extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    return this.articles = contentfulCMS.getEntries().then(data => {
      this.setState({
        articles: data.items
      }) 
    });
  }

  renderArticleData() {
    return this.state.articles.map((article, index) => {
      const { 
        articleAuthor, 
        articleBodyText, 
        articleSummary, 
        articleTitle, 
        publishedDate, 
        photos 
      } = article.fields;

      return (
        <div key={`${articleTitle}=${index}`}>
          <div>Title: {articleTitle}</div>
          <div>Author: {articleAuthor}</div>
          <div>Summary: {articleSummary}</div>
          <div>Date: {publishedDate}</div>
          <div>Article Text: {articleBodyText}</div>
          <br />
          <br />
          { 
            photos ? 
            photos.map(photo => <img key={photo.sys.id} width={250} height={250} src={photo.fields.file.url} alt={photo.fields.file.title} />) :
            null
          }
        </div>
      )
    })
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
            <div>
              {this.renderArticleData()}
            </div>
        </header>
      </div>
    );
  }
}

export default App;
