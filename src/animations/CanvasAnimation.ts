export default abstract class CanvasAnimation {

	/** The canvas element to draw on */
	protected canvas: HTMLCanvasElement;
	/** The context to draw on */
	protected ctx: CanvasRenderingContext2D;
	/** The current state */
	public state: any;
	protected params: any;
	protected isRunning: boolean = false;
	protected subscribers: Array<Function> = [];
	
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d') || new CanvasRenderingContext2D();
		this.state = {};
		this.params = [];
	}


	public abstract setup() : void;
	public abstract frame() : void;

	public abstract play(): void;
	public abstract pause(): void;
	public abstract reset(): void;

	public setParam (param: string, value: any) {
		this.params[param] = value;
		for(let sub of this.subscribers) {
			sub(this.params);
		}
	}
	public getParam(param: string) {
		return this.params[param] || null;
	}
	public getParams() {
		return this.params;
	}

	protected clearFrame() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}

	public subscribe(callback: Function): number {
		this.subscribers.push(callback);
		return this.subscribers.length-1;
	}
	public revokeSubscriptions(): void {
		this.subscribers = [];
	}
	public revokeSubscription(id: number) {
		this.subscribers[id] = () => {};
	}
	

}