import CanvasAnimation from "../CanvasAnimation";
import { CircularEndpoint } from "../AnimationHelper";
import { timeStamp } from "console";

export default class AnimRotationWave extends CanvasAnimation {
	
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.state = {
			ticks: 0
		};
	}

	public setup() : void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		
		this.setParam("wavecount", 25);
		this.setParam("amplitude", window.innerWidth/2);
		this.setParam("function", "tan");
		this.setParam("exponent", 1);
		this.setParam("applytoradius", false);
		this.setParam("applytoangle", false);
	}

	private applyCurrent(x: number) : number {
		return this.getParam('function') === "sin" ? Math.sin(x) : this.getParam('function') === "cos" ? Math.cos(x) : Math.tan(x);
	}

	public frame() : void {

		this.clearFrame();
		const center = {
			x: Math.round(this.canvas.width / 2),
			y: Math.round(this.canvas.height / 2)
		};
		
		const angleOffset: number = (2 * Math.PI) / this.getParam("wavecount");

		this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
		this.ctx.lineCap = "round";
		for(let x: number = 0; x < this.getParam("wavecount");x++) {
			this.ctx.beginPath();
			this.ctx.moveTo(center.x,center.y);
			for(let i: number = 0; i < this.canvas.width / 2; i++) {
				const target = CircularEndpoint(center.x,center.y, Math.pow(this.applyCurrent(i/70),this.getParam("exponent")) * this.getParam("amplitude"),x*angleOffset);
				const radius = (this.getParam("applytoradius")) ? this.applyCurrent(i) : i;
				const angle = (this.getParam("applytoangle")) ? this.applyCurrent(this.state.ticks+x*angleOffset+Math.PI/2) : this.state.ticks+x*angleOffset+Math.PI/2;
				const endpoint = CircularEndpoint(target.x,target.y,radius,angle);
				this.ctx.lineTo(endpoint.x,endpoint.y);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
		
		this.state.ticks+=0.01;

		if(this.isRunning) {
			window.requestAnimationFrame(() => {
				this.frame();
			});
		}
	}

	public play(): void {
		if(this.isRunning) return;
		this.isRunning = true;
		this.frame();
	};

	public pause(): void {
		if(!this.isRunning) return;
		this.isRunning = false;
	};

	public reset(): void {
		this.setup();
	};
}