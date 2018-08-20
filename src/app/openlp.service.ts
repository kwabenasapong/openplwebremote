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
    return this.http.get<Slide[]>('http://localhost:4316/controller/live/text');
  }

  getServiceItems(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>('http://localhost:4316/service/list');
  }

  sendItemLive(plugin, id) {}
  showAlert(text) {}
  addItemToService(plugin, id) {}

  getSearchablePlugins(): Observable<PluginDescription[]> {
    return this.http.get<PluginDescription[]>(`${this.apiURL}/plugin/search`);
  }

  setServiceItem(id:number) {
  }

  search(plugin, text) {
    return this.http.get(`${this.apiURL}/${plugin}/search?q=${text}`);
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

  /*

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
  */
}
