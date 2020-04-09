import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PluginDescription,
  State,
  Slide,
  ServiceItem,
  Theme,
  MainView,
  SystemInformation,
  Credentials,
  AuthToken
} from './responses';
import { environment } from '../environments/environment';


const deserialize = (json, cls) => {
  const inst = new cls();
  for (const p in json) {
    if (!json.hasOwnProperty(p)) {
      continue;
    }
    inst[p] = json[p];
  }
  return inst;
};

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class OpenLPService {
  private apiURL: string;
  public stateChanged$: EventEmitter<State>;
  public liveChanged$: EventEmitter<State>;

  constructor(private http: HttpClient) {
    const host = window.location.hostname;
    let port: string;
    if (environment.production) {
      port = window.location.port;
    }
    else {
      port = '4316';
    }
    this.apiURL = `http://${host}:${port}/api/v2`;

    this.stateChanged$ = new EventEmitter<State>();
    this.retrieveSystemInformation().subscribe(info => {
    const ws = new WebSocket(`ws://${host}:${info.websocket_port}/state`);
      ws.onmessage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          const state = deserialize(JSON.parse(reader.result as string).results, State);
          this.stateChanged$.emit(state);
        };
        reader.readAsText(event.data);
      };
    });
    this.liveChanged$ = new EventEmitter<State>();
    this.retrieveSystemInformation().subscribe(info => {
    const ws = new WebSocket(`ws://${host}:${info.websocket_port}/live_changed`);
      ws.onmessage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          const state = deserialize(JSON.parse(reader.result as string).results, State);
          this.liveChanged$.emit(state);
        };
        reader.readAsText(event.data);
      };
    });
  }

  setAuthToken(token: string): void {
    httpOptions.headers = httpOptions.headers.set('Authorization', token);
  }

  retrieveSystemInformation(): Observable<SystemInformation> {
    return this.http.get<SystemInformation>(`${this.apiURL}/core/system`, httpOptions);
  }

  getMainImage(): Observable<MainView> {
    return this.http.get<MainView>(`${this.apiURL}/core/live-image`, httpOptions);
  }

  getItemSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(`${this.apiURL}/controller/live-item`, httpOptions);
  }

  getServiceItems(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiURL}/service/items`, httpOptions);
  }

  getThemeLevel(): Observable<any> {
    return this.http.get(`${this.apiURL}/controller/theme-level`, httpOptions);
  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiURL}/controller/themes`, httpOptions);
  }

  getSearchablePlugins(): Observable<PluginDescription[]> {
    return this.http.get<PluginDescription[]>(`${this.apiURL}/core/plugins`, httpOptions);
  }

  setServiceItem(id: number): Observable<any> {
    return this.http.post(`${this.apiURL}/service/show`, {'id': id}, httpOptions);
  }

  search(plugin, text): Observable<any> {
    return this.http.get(`${this.apiURL}/plugins/${plugin}/search?text=${text}`, httpOptions);
  }

  setSlide(id): Observable<any> {
    return this.http.post(`${this.apiURL}/controller/show`, {'id': id}, httpOptions);
  }

  setThemeLevel(level): Observable<any> {
    return this.http.post(`${this.apiURL}/controller/theme-level`, {'level': level}, httpOptions);
  }

  setTheme(theme: string): Observable<any> {
    return this.http.post(`${this.apiURL}/controller/theme`, {'theme': theme}, httpOptions);
  }

  nextItem(): Observable<any> {
    return this.http.post(`${this.apiURL}/service/progress`, {'action': 'next'}, httpOptions);
  }

  previousItem(): Observable<any> {
    return this.http.post(`${this.apiURL}/service/progress`, {'action': 'previous'}, httpOptions);
  }

  nextSlide(): Observable<any> {
    return this.http.post(`${this.apiURL}/controller/progress`, {'action': 'next'}, httpOptions);
  }

  previousSlide(): Observable<any> {
    return this.http.post(`${this.apiURL}/controller/progress`, {'action': 'previous'}, httpOptions);
  }

  blankDisplay(): Observable<any> {
    return this.http.post(`${this.apiURL}/core/display`, {'display': 'blank'}, httpOptions);
  }

  themeDisplay(): Observable<any> {
    return this.http.post(`${this.apiURL}/core/display`, {'display': 'theme'}, httpOptions);
  }

  desktopDisplay(): Observable<any> {
    return this.http.post(`${this.apiURL}/core/display`, {'display': 'desktop'}, httpOptions);
  }

  showDisplay(): Observable<any> {
    return this.http.post(`${this.apiURL}/core/display`, {'display': 'show'}, httpOptions);
  }

  showAlert(text): Observable<any> {
    return this.http.post(`${this.apiURL}/plugins/alerts`, {'text': text}, httpOptions);
  }

  sendItemLive(plugin, id): Observable<any> {
    return this.http.post(`${this.apiURL}/plugins/${plugin}/live`, {'id': id}, httpOptions);
  }

  addItemToService(plugin, id): Observable<any> {
    return this.http.post(`${this.apiURL}/plugins/${plugin}/add`, {'id': id}, httpOptions);
  }

  login(credentials: Credentials): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.apiURL}/core/login`, credentials, httpOptions);
  }
}
