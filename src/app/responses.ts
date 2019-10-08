export interface PluginDescription {
  key: string;
  name: string;
}

export class State {
  isAuthorized: boolean;
  version: number;
  slide: number;
  display: boolean;
  isSecure: boolean;
  blank: boolean;
  twelve: boolean;
  theme: boolean;

  live = () => !(this.blank || this.display || this.theme);
}

export interface Slide {
  selected: boolean;
  html: string;
  tag: string;
  text: string;
  chords_text: string;
  lines: string[];
  first_slide_of_tag: boolean;
}

export interface ServiceItem {
    id: string;
    notes: string;
    plugin: string;
    selected: boolean;
    title: string;
}

export interface MainView {
  binary_image: string;
}

export interface SystemInformation {
  websocket_port: number;
  login_required: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
}
