import styled from 'styled-components';

export const NavBoxWrapper = styled.div`
	z-index: 5;
	position: fixed;
	top: 1em;
	right: 1em;
	width: 20%;
	border: 1.5px solid rgba(255,255,255,0.2);
	background-color: rgba(255,255,255,0.05);
	padding: 0.5em;
	font-family: 'Consolas', monospace, sans-serif;
	font-size: 12pt;

	h1 {
		font-size: 16pt;
		width: 100%;
		display: inline-block;
		/*border-bottom: 1px solid #565656;*/
		padding-bottom: 5px;
		margin: 0;
		font-family: 'Roboto', sans-serif;
		font-weight: normal;
		text-align: center;
	}

	div {
		width: 100%;
		box-sizing: border-box;
	}
`;

export const NavBoxInteractionButton = styled.button`
	width: 66%;
	background-color: #3498db;
	color: #ffffff;
	border: none;
	padding: 5px 0;
	cursor: pointer;
	font-family: 'Consolas', sans-serif;

	&:hover {
		opacity: 0.7;
	}

	&.play {
		
	}
	&.reset {
		width: 33%;
		background-color: #34495e;
	}
`;