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

	live = () => {return !(this.blank || this.display || this.theme);}
}

export interface Slide {
	selected: boolean;
	html: string;
	tag: string;
	text: string;
	lines: string[];
}

export interface ServiceItem {
    id: string;
    notes: string;
    plugin: string;
    selected: boolean;
    title: string;
}