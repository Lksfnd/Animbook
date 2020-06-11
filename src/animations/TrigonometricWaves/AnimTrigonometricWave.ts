import CanvasAnimation from "../CanvasAnimation";
import { CircularEndpoint } from "../AnimationHelper";

export default class AnimTrigonometricWave extends CanvasAnimation {
	
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.state = {
			ticks: 0,
			currentRotation: Math.PI/2
		};
	}

	public setup() : void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		
		this.setParam("amplitude", 0.15);
		this.setParam("function", "sin");
		this.setParam("speed", 1.0);
	}

	private applyCurrentFunction(x: number) {
		return this.getParam('function') === "sin" ? Math.sin(x) : this.getParam('function') === "cos" ? Math.cos(x) : Math.tan(x);
	}

	public frame() : void {

		this.clearFrame();

		const circleCenter = {
			x: this.getParam('amplitude')* window.innerWidth + 25,
			y: Math.round(this.canvas.height / 2)
		};

		this.ctx.lineWidth = 1;
		// Draw the normal circle
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#efefef";
		this.ctx.arc(
			circleCenter.x,
			circleCenter.y,
			this.getParam("amplitude")* window.innerWidth,
			0,
			2 * Math.PI
		);
		this.ctx.stroke();
		this.ctx.closePath();


		// Draw the center point
		this.ctx.beginPath();
		this.ctx.fillStyle = "#efefef";
		this.ctx.arc(
			circleCenter.x,
			circleCenter.y,
			3,
			0,
			2 * Math.PI
		);
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "#ffffff";

		// Single line endpoint
		const angularEndpoint = CircularEndpoint(circleCenter.x, circleCenter.y, this.getParam("amplitude")* window.innerWidth, this.state.currentRotation);
		// Little point at the end
		this.ctx.beginPath();
		this.ctx.arc(angularEndpoint.x,angularEndpoint.y,3,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();

		// Line 1 - the slanted one
		this.ctx.beginPath();
		this.ctx.moveTo(circleCenter.x,circleCenter.y);
		this.ctx.lineTo(angularEndpoint.x,angularEndpoint.y);
		this.ctx.stroke();
		this.ctx.closePath();
		// Line 2 - the sinus (vertical one) - #2ecc71
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#2ecc71";
		this.ctx.moveTo(angularEndpoint.x, circleCenter.y);
		this.ctx.lineTo(angularEndpoint.x, angularEndpoint.y);
		this.ctx.stroke();
		// Line 2 - the cosinus (horizontal one) - #9b59b6
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#9b59b6";
		this.ctx.moveTo(angularEndpoint.x, circleCenter.y);
		this.ctx.lineTo(circleCenter.x, circleCenter.y);
		this.ctx.stroke();

		const curvestartPoint = {
			x: circleCenter.x + this.getParam("amplitude") * window.innerWidth + 25,
			y: circleCenter.y
		};

		// Draw graph
		this.ctx.strokeStyle = this.getParam('function') === "sin" ? "#2ecc71" : this.getParam('function') === "cos" ? "#9b59b6" : "#e67e22";
		
		this.ctx.beginPath();
		this.ctx.moveTo(curvestartPoint.x, curvestartPoint.y + this.applyCurrentFunction(this.state.currentRotation+3*Math.PI/2+((circleCenter.x)*(Math.PI / 180))) * this.getParam("amplitude") * window.innerWidth);

	  for(let x: number = curvestartPoint.x; x < this.canvas.width; x++) {
			this.ctx.lineTo(x, curvestartPoint.y + this.applyCurrentFunction(this.state.currentRotation+3*Math.PI/2+((x-circleCenter.x)*(Math.PI / 180))) * this.getParam("amplitude") * window.innerWidth);
		}
		this.ctx.stroke();
		this.ctx.closePath();



		this.state.currentRotation += this.getParam("speed") * (Math.PI / 180);
		

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