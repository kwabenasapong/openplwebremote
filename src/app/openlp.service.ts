import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams, Http } from '@angular/http';


import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PluginDescription, State, Slide, ServiceItem } from './responses';

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
    let ws:WebSocket = new WebSocket('ws://localhost:4317/state')
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
    return this.http.get<Slide[]>(`${this.apiURL}/controller/live/text`);
  }

  getServiceItems(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiURL}/service/list`);
  }

  getSearchablePlugins(): Observable<PluginDescription[]> {
    return this.http.get<PluginDescription[]>(`${this.apiURL}/plugin/search`);
  }

  setServiceItem(id:number): Observable<any> {
    return this.http.get(`${this.apiURL}/service/set?id=${id}`);
  }

  search(plugin, text): Observable<any> {
    return this.http.get(`${this.apiURL}/${plugin}/search?q=${text}`);
  }


  setSlide(id): Observable<any> {
    return this.http.get(`${this.apiURL}/controller/live/set?id=${id}`);
  }

  nextItem(): Observable<any> {
    return this.http.get(`${this.apiURL}/service/next`);
  }

  previousItem(): Observable<any> {
    return this.http.get(`${this.apiURL}/service/previous`);
  }

  nextSlide(): Observable<any> {
    return this.http.get(`${this.apiURL}/controller/live/next`);
  }

  previousSlide(): Observable<any> {
    return this.http.get(`${this.apiURL}/controller/live/previous`);
  }

  blankDisplay(): Observable<any> {
    return this.http.get(`${this.apiURL}/display/blank`);
  }

  themeDisplay(): Observable<any> {
    return this.http.get(`${this.apiURL}/display/theme`);
  }

  desktopDisplay(): Observable<any> {
    return this.http.get(`${this.apiURL}/display/desktop`);
  }

  showDisplay(): Observable<any> {
    return this.http.get(`${this.apiURL}/display/show`);
  }

  showAlert(text): Observable<any> {
    return this.http.get(`${this.apiURL}/alert?text=${text}`);
  }

  sendItemLive(plugin, id): Observable<any> {
    return this.http.get(`${this.apiURL}/${plugin}/live?id=${id}`);
  }

  addItemToService(plugin, id): Observable<any> {
    return this.http.get(`${this.apiURL}/${plugin}/add?id=${id}`);
  }
}
