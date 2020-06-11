import React from 'react';
import { AnimView } from '../Anim.style';
import CanvasAnimation from '../CanvasAnimation';
import NavBox from '../../components/NavBox';
import { NavBoxInteractionButton } from '../../components/NavBox.style';
import AnimRotationWave from './AnimRotationWave';

export default class ViewAnimRotationalWave extends React.Component<any, {
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
		this.anim = new AnimRotationWave(this.canvas.current);
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
				<h1>Rotating  Waves</h1>
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

					<hr/>
					<br/>

					<span>Amplitude: <i>({Math.round(this.state.params["amplitude"])})</i></span>
					<input type="range" className="wideslider" min="10" max="10000" step="2" value={this.state.params["amplitude"]} onChange={ e => {
						this.anim?.setParam("amplitude", e.target.value);
					}}/>
					<br/>




					<span>Wavecount: <i>({Math.round(this.state.params["wavecount"])})</i></span>
					<input type="range" className="wideslider" min="1" max="200" step="1" value={this.state.params["wavecount"]} onChange={ e => {
						this.anim?.setParam("wavecount", e.target.value);
					}}/>
					<br/>

					<span>Exponent: <i>({Math.round(this.state.params["exponent"])})</i></span>
					<input type="range" className="wideslider" min="1" max="10" step="1" value={this.state.params["exponent"]} onChange={ e => {
						this.anim?.setParam("exponent", e.target.value);
					}}/>
					<br/>

					<span>Retain Radial function:</span>
					<b 
					onClick={ ()=>{ this.anim?.setParam("applytoradius", true)}}
					style={{
						width: '25%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#16a085",
						cursor: 'pointer',
						textDecoration: (this.state.params["applytoradius"]) ? 'underline' : 'none'
					}}>yes</b>
					<b 
					onClick={ ()=>{ this.anim?.setParam("applytoradius", false)}}
					style={{
						width: '25%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#e74c3c",
						cursor: 'pointer',
						textDecoration: (!this.state.params["applytoradius"]) ? 'underline' : 'none'
					}}>no</b>

					<span>Retain Angle function:</span>
					<b 
					onClick={ ()=>{ this.anim?.setParam("applytoangle", true)}}
					style={{
						width: '25%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#16a085",
						cursor: 'pointer',
						textDecoration: (this.state.params["applytoangle"]) ? 'underline' : 'none'
					}}>yes</b>
					<b 
					onClick={ ()=>{ this.anim?.setParam("applytoangle", false)}}
					style={{
						width: '25%',
						boxSizing: 'border-box',
						display: 'inline-block',
						textAlign: 'center',
						color: "#e74c3c",
						cursor: 'pointer',
						textDecoration: (!this.state.params["applytoangle"]) ? 'underline' : 'none'
					}}>no</b>



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