import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ViewNavWrapper } from "./ViewNav.style";

class ViewNav extends React.Component<any> {
	render() {
		return <ViewNavWrapper>
			<Link to="/anim/trigonometric-waves">Trigonometric Waves</Link>
		</ViewNavWrapper>;
	}
}

export default withRouter(ViewNav);