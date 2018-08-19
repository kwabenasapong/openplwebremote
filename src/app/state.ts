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