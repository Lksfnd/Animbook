import styled from "styled-components";

export const AnimView = styled.div`
	background-color: #232323;
	color: #ffffff;
	width: 100vw;
	box-sizing: border-box;
	min-height: 100vh;

	canvas {
		width: 100%;
		box-sizing: border-box;
		min-height: 100%;
	}

	span {
		display: inline-block;
		width: 100%;
		box-sizing: border-box;
		padding: 5px;

		i {
			font-style: normal;
			color: #bdc3c7;
		}
		b {
			font-weight: normal;
		}
	}
`;