export function CircularEndpoint(x: number, y: number, radius: number, angle: number){
	return {
		x: x + radius * Math.sin(angle),
		y: y + radius * Math.cos(angle)
	};
}
export function CircularEndpointDeg(x: number, y: number, radius: number, angle: number){
	return CircularEndpoint(x, y, radius, angle / 180 * Math.PI)
}