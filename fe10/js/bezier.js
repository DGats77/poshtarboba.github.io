/* t -> [0..1]  */
/* if 2 points: start, end */
/* if 3 points: start, middle, end */
/* if 4 points: start, start1, end1, end */

function bezier(t, x1, y1, x2, y2, x3, y3, x4, y4) {
	var x, y;
	if (arguments.length > 8) {
		x =  (1 - t) * (1 - t) * (1 - t) * x1 + 3 * (1 - t) * (1 - t) * t * x2 + 3 * (1 - t) * t * t * x3 + t * t * t * x4;
		y =  (1 - t) * (1 - t) * (1 - t) * y1 + 3 * (1 - t) * (1 - t) * t * y2 + 3 * (1 - t) * t * t * y3 + t * t * t * y4;
	} else if (arguments.length > 6) {
		x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3;
		y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * y2 + t * t * y3;
	} else if (arguments.length > 4) {
		x = (1 - t) * x1 + t * x2;
		y = (1 - t) * y1 + t * y2;
	}
	return { x: x, y: y };
}