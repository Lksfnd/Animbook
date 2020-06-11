import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ViewNavWrapper } from "./ViewNav.style";

class ViewNav extends React.Component<any> {
	render() {
		return <ViewNavWrapper>
			<Link to="/anim/trigonometric-waves">Trigonometric Waves</Link><br/>
			<Link to="/anim/rotating-waves">Rotating Waves</Link><br/>
		</ViewNavWrapper>;
	}
}

export default withRouter(ViewNav);