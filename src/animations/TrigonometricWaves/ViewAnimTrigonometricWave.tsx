import React from 'react';
import { AnimView } from '../Anim.style';
import CanvasAnimation from '../CanvasAnimation';
import AnimTrigonometricWave from './AnimTrigonometricWave';
import NavBox from '../../components/NavBox';
import { NavBoxInteractionButton } from '../../components/NavBox.style';

export default class ViewAnimTrigonometricWaves extends React.Component<any, {
	txtPlaybutton: string,
	params: any
}> {

	private canvas: any;
	private anim: CanvasAnimation | undefined;

	constructor(props: any) {
		super(props);
		this.canvas = React.createRef();
		this.state = {
			txtPlaybutton: 'Play',
			params: []
		};
		this.state.params["amplitude"] = 0.15;
	}

	componentDidMount() {
		this.anim = new AnimTrigonometricWave(this.canvas.current);
		this.anim.setup();

		this.setState({ params: this.anim.getParams() });
		this.anim.subscribe( (params: any) => {
			this.setState({params});
		});


		this.handlePlay();
	}

	componentWillUnmount() {
		this.anim?.revokeSubscriptions();
	}

	handlePlay = () => {
		if(this.state.txtPlaybutton === 'Play') {
			this.setState({txtPlaybutton: "Pause"});
			this.anim?.play();
		} else {
			this.setState({txtPlaybutton: "Play"});
			this.anim?.pause();
		}
	}

	render() {
		return <AnimView>
			<NavBox>
				<h1>Trigonometric Waves</h1>
				<div>
					<NavBoxInteractionButton 
						onClick={this.handlePlay}
						className="play">
							{this.state.txtPlaybutton}
					</NavBoxInteractionButton>
					<NavBoxInteractionButton 
						onClick={()=>this.anim?.reset()}
						className="reset">
							Reset
					</NavBoxInteractionButton>
					<br/>
					<br/>
					
					<span>Amplitude: <i>({Math.round(this.state.params["amplitude"]*window.innerWidth)}px)</i></span>
					<input type="range" className="wideslider" min="0.005" max="0.4" step="0.005" value={this.state.params["amplitude"]} onChange={ e => {
						this.anim?.setParam("amplitude", e.target.value);
					}}/>
					<br/>

					<span>Speed: <i>({Math.round(100*this.state.params["speed"])}%)</i></span>
					<input type="range" className="wideslider" min="0.01" max="50" step="0.01" value={this.state.params["speed"]} onChange={ e => {
						this.anim?.setParam("speed", e.target.value);
					}}/>
					<br/>
					
					<span>Wave Function:</span>
					<b 
					onClick={ ()=>{ this.anim?.setParam("function", "sin")}}
					style={{
						width: '33%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#2ecc71",
						cursor: 'pointer',
						textDecoration: (this.state.params["function"] === "sin") ? 'underline' : 'none'
					}}>sin</b>
					<b 
					onClick={ ()=>{ this.anim?.setParam("function", "cos")}}
					style={{
						width: '33%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#9b59b6",
						cursor: 'pointer',
						textDecoration: (this.state.params["function"] === "cos") ? 'underline' : 'none'
					}}>cos</b>
					<b 
					onClick={ ()=>{ this.anim?.setParam("function", "tan")}}
					style={{
						width: '33%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#e67e22",
						cursor: 'pointer',
						textDecoration: (this.state.params["function"] === "tan") ? 'underline' : 'none'
					}}>tan</b>
				</div>
			</NavBox>
			<canvas ref={this.canvas}></canvas>
		</AnimView>;
	}
}