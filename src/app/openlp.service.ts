import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams, Http } from '@angular/http';

import { State } from './state';
import { Slide } from './slide';
import { ServiceItem } from './service_item';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SlideOuterResponse, PluginDescription } from './responses';

let deserialize = (json, cls) => {
    var inst = new cls();
    for(var p in json) {
      if(!json.hasOwnProperty(p)) {
        continue;
      }
      inst[p] = json[p];
    }
    return inst;
  }

let buildTextParams = id => {
    let params: URLSearchParams = new URLSearchParams();
    params.set('data', '{"request": {"text": "' + id + '"}}');
    return {search: params}
}

let buildNumberParams = id => {
    let params: URLSearchParams = new URLSearchParams();
    params.set('data', '{"request": {"id": ' + id + '}}');
    return {search: params}
}

@Injectable()
export class OpenLPService {
  private apiURL: string = 'http://localhost:4316';

  public stateChanged$: EventEmitter<State>;

  constructor(private http: HttpClient) {
    this.stateChanged$ = new EventEmitter<State>();
    let state:State = null;
    let ws:WebSocket = new WebSocket('ws://localhost:4317/poll')
    ws.onmessage = (event) => {
      let reader = new FileReader()
      reader.onload = () => {
        state = deserialize(JSON.parse(reader.result).results, State);
        this.stateChanged$.emit(state);
        }
      reader.readAsText(event.data);
    }
  }

  getItemSlides(): Observable<Slide[]> {
    return this.http.get<SlideOuterResponse>('http://localhost:4316/controller/live/text')
    .pipe(
      take(1),
      map(result => result.results.slides));
  }

  // getItemSlides() {
  //   return this.http.get('http://localhost:4316/api/controller/live/text')
  //     .toPromise()
  //     .then(response => {
  //       let slides:Slide[] = [];
  //       response.json().results.slides.forEach(item => {
  //         let slide = deserialize(item, Slide);
  //         slide.lines = slide.text.split('\n');
  //         slides.push(slide);
  //       });
  //       return slides;
  //     })
  //     .catch(this.handleError);
  // }

  getServiceItems(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>('http://localhost:4316/service/list');
  }


  // getServiceItems() {
  //   return this.http.get('http://localhost:4316/api/service/list')
  //     .toPromise()
  //     .then(response => {
  //       let serviceItems:ServiceItem[] = [];
  //       response.json().results.items.forEach(item => serviceItems.push(deserialize(item, ServiceItem)));
  //       return serviceItems;
  //     })
  //     .catch(this.handleError);
  // }

  sendItemLive(plugin, id) {}
  showAlert(text) {}
  addItemToService(plugin, id) {}

  getSearchablePlugins(): Observable<PluginDescription[]> {
    return this.http.get<PluginDescription[]>(`${this.apiURL}/plugin/search`);
  }

  // getSearchablePlugins() {
  //   return this.http.get('http://localhost:4316/plugin/search')
  //     .toPromise()
  //     .then(response => response.json().results.items)
  //     .catch(this.handleError);
  // }

  setServiceItem(id:number) {
  }


  // setServiceItem(id:number) {
  //   this.http.get('http://localhost:4316/service/set', buildNumberParams(id))
  //     .toPromise()
  //     .then(response => console.log(response.json().results))
  //     .catch(this.dropError);
  // }
  
  /*
  setSlide(id) {
    this.http.get('http://localhost:4316/controller/live/set', buildNumberParams(id))
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  nextItem() {
    this.http.get('http://localhost:4316/service/next')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  previousItem() {
    this.http.get('http://localhost:4316/service/previous')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  nextSlide() {
    this.http.get('http://localhost:4316/controller/live/next')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  previousSlide() {
    this.http.get('http://localhost:4316/controller/live/previous')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  blankDisplay() {
    this.http.get('http://localhost:4316/display/blank')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  themeDisplay() {
    this.http.get('http://localhost:4316/display/theme')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  desktopDisplay() {
    this.http.get('http://localhost:4316/display/desktop')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  showDisplay() {
    this.http.get('http://localhost:4316/display/show')
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }

  showAlert(text) {
    this.http.get('http://localhost:4316/alert', buildTextParams(text))
      .toPromise()
      .then(response => console.log(response.json().results))
      .catch(this.dropError);
  }
  */
  search(plugin, text) {
    return this.http.get(`${this.apiURL}/${plugin}/search`);
  }

  /*
  search(plugin, text) {
    return this.http.get('http://localhost:4316/' + plugin + '/search', buildTextParams(text))
      .toPromise()
      .then(response => response.json().results.items)
      .catch(this.handleError);
  }

  sendItemLive(plugin, id) {
    this.http.get('http://localhost:4316/' + plugin + '/live', buildNumberParams(id))
      .toPromise()
      .then(response => console.log(response))
      .catch(this.dropError);
  }

  addItemToService(plugin, id) {
    this.http.get('http://localhost:4316/' + plugin + '/add', buildNumberParams(id))
      .toPromise()
      .then(response => console.log(response))
      .catch(this.dropError);
  }

  private dropError(error: any) {
    console.error('An error occurred', error);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  */
}
