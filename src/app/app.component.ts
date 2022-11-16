import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'url-shortner-app';
  url = "";
  shortenedUrl = "";
  count: any;
  search: any;

  constructor(){
    this.count = this.getClickCount()
    this.search = this.getSearchCount()
  }

  onKey(e: any) {
    this.url = e.target.value;
  }

  fetchShortenedUrl() {
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", this.url);
    
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'ee659e09e6msh1cf158e95819546p1de5ebjsnfbb60a811b68',
        'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
      },
      body: encodedParams
    };

    const searchOptions = {
      method: 'POST'
    }
    
    fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
      .then(response => response.json())
      .then(response => this.shortenedUrl = response.result_url)
      .then(() => {
        if(this.shortenedUrl == undefined){
          alert("Entered url is invalid")
        }
      }).then(()=>{
        fetch("http://localhost:3000/register/search", searchOptions)
          .then(resp => resp.json())
          .catch(console.error)
        })
        .then(()=>{
          this.getSearchCount()
        })
  }

  addCountForClick(){
    const options= {
      method: 'POST'
    }

    fetch("http://localhost:3000/register/click", options)
      .then(res=>res.json())
      .catch(console.error)
    
    this.getClickCount()
  }

  getClickCount(){
    fetch("http://localhost:3000/getclick")
      .then(res=>res.json())
      .then(res=>this.count = res.click)
      .catch(console.error)
  }

  getSearchCount(){
    fetch("http://localhost:3000/getsearch")
      .then(res=>res.json())
      .then(res=>this.search = res.search)
      .catch(console.error)
  }

}
