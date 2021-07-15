// http://perfectionkills.com/exploring-canvas-drawing-techniques/

function midPointBetween(p1, p2) {
	return {
		x: p1.x + (p2.x - p1.x) / 2,
		y: p1.y + (p2.y - p1.y) / 2
	};
}

function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

class DrawingPad {
	constructor(canvas) {
		this.cvs = canvas;
		this.cvs.width = window.innerWidth;
		this.cvs.height = window.innerHeight;
		this.ctx = this.cvs.getContext('2d');
		this.ctx.lineJoin = this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 5;
		this.isDrawing = false;
		this.lastPoint = false;
		
		this.init();
	}
	
	get drawing() {
		return this.isDrawing;
	}
	
	attachMouseDownListener() {
		this.cvs.addEventListener('mousedown', (e) => {
			this.isDrawing = true;
			this.lastPoint = { x: e.clientX, y: e.clientY };
		});
	}
	
	attachMouseMoveListener() {
		this.cvs.addEventListener('mousemove', (e) => {
			if (!this.isDrawing) {
				return;
			}
			
			this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
			
			let currentPoint = { x: e.clientX, y: e.clientY };
			
			let angle = angleBetween(this.lastPoint, currentPoint);
			let distance = distanceBetween(this.lastPoint, currentPoint);
			let midPoint = midPointBetween(this.lastPoint, currentPoint);
			
			for (let i = 0; i < distance; i += 4) {
				let x = this.lastPoint.x + (Math.sin(angle) * i);
				let y = this.lastPoint.y + (Math.cos(angle) * i);
				this.ctx.lineTo(x, y);
			}
			
			this.ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, midPoint.x, midPoint.y);
			this.ctx.stroke();
			
			this.lastPoint = currentPoint;
		});
	}
	
	attachMouseUpListener() {
		this.cvs.addEventListener('mouseup', (e) => {
			this.isDrawing = false;
		});
	}
	
	init() {
		this.attachMouseDownListener();
		this.attachMouseMoveListener();
		this.attachMouseUpListener();
	}
}



