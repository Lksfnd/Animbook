import React from 'react';
import { NavBoxWrapper } from './NavBox.style';

export default class NavBox extends React.Component {
	render() {
		return <NavBoxWrapper>
			{this.props.children}
		</NavBoxWrapper>;
	}
};