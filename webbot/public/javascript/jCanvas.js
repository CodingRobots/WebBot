/*!
jCanvas v5.1
Copyright 2011, Caleb Evans
Licensed under the MIT license
*/

(function($, document, Math, Array, Image, parseFloat, parseInt, undefined) {

// Define local variables for better compression
var defaults, prefs,
	fn = $.fn,
	merge = $.extend,
	pi = Math.PI,
	round = Math.round,
	sin = Math.sin,
	cos = Math.cos,
	eventFix = $.event.fix,
	cssProps,
	colorProps;

// jCanvas function
function jCanvas(args) {
	if (!args) {
		// Reset to defaults if nothing is passed
		prefs = Prefs.prototype = merge({}, defaults);
	} else {
		// Merge arguments with preferences
		merge(prefs, args);
	}
	return this;
}
jCanvas.version = '5.1';
// Set jCanvas default properties
defaults = {
	align: 'center',
	angle: 0,
	baseline: 'middle',
	ccw: false,
	closed: false,
	compositing: 'source-over',
	cornerRadius: 0,
	cropFromCenter: true,
	end: 360,
	fillStyle: 'transparent',
	font: 'normal 12pt sans-serif',
	fromCenter: true,
	height: 0,
	inDegrees: true,
	load: null,
	mask: false,
	opacity: 1,
	projection: 0,
	r1: null,
	r2: null,
	radius: 0,
	repeat: 'repeat',
	rounded: false,
	scaleX: 1,
	scaleY: 1,
	shadowBlur: 3,
	shadowColor: 'transparent',
	shadowX: 0,
	shadowY: 0,
	sHeight: 0,
	sides: 3,
	source: '',
	start: 0,
	strokeCap: 'butt',
	strokeJoin: 'miter',
	strokeStyle: 'transparent',
	strokeWidth: 1,
	sWidth: 0,
	sx: null,
	sy: null,
	text: '',
	width: 0,
	x: 0,
	x1: 0,
	x2: 0,
	y: 0,
	y1: 0,
	y2: 0
};
// Copy defaults over to preferences
function Prefs() {}
prefs = Prefs.prototype;
jCanvas();

// Set global properties
function setGlobals(ctx, params) {
	ctx.fillStyle = params.fillStyle;
	ctx.strokeStyle = params.strokeStyle;
	ctx.lineWidth = params.strokeWidth;
	// Set rounded corners for paths
	if (params.rounded) {
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	} else {
		ctx.lineCap = params.strokeCap;
		ctx.lineJoin = params.strokeJoin;
	}
	ctx.shadowOffsetX = params.shadowX;
	ctx.shadowOffsetY = params.shadowY;
	ctx.shadowBlur = params.shadowBlur;
	ctx.shadowColor = params.shadowColor;
	ctx.globalAlpha = params.opacity;
	ctx.globalCompositeOperation = params.compositing;
}

// Close path if chosen
function closePath(ctx, params) {
	// Mask if chosen
	if (params.mask) {
		ctx.save();
		ctx.clip();
	}
	if (params.closed) {
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	} else {
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}

// Measure angles in chosen units
function convertAngles(params) {
	return params.inDegrees ? pi/180 : 1;
}

// Rotate individual shape
function positionShape(ctx, params, width, height) {
	
	params.toRad = convertAngles(params);
	ctx.save();
		
	// Always rotate from center
	if (!params.fromCenter) {
		params.x += width/2;
		params.y += height/2;
	}
	
	// Rotate only if specified
	if (params.angle) {
		ctx.translate(params.x, params.y);
		ctx.rotate(params.angle*params.toRad);
		ctx.translate(-params.x, -params.y);
	}
}

// Extend jCanvas
function extend(plugin) {

	// Merge properties with defaults
	plugin = plugin || {};
	defaults = merge(defaults, plugin.props || {});
	$.jCanvas();

	// Create plugin
	if (plugin.name) {
		$.fn[plugin.name] = function(args) {
			var $elems = this, elem,
				ctx, e, params = merge(new Prefs(), args);
			for (e=0; e<$elems.length; e+=1) {
				elem = $elems[e];
				if (!elem.getContext) {continue;}
				ctx = elem.getContext('2d');
				setGlobals(ctx, params);
				params.toRad = convertAngles(params);
				plugin.fn.call(elem, ctx, params);
			}
			return $elems;
		};
	}
	return $.fn[plugin.name];
}

// Make jCanvas function "chainable"
$.fn.jCanvas = jCanvas;

// Load canvas
$.fn.loadCanvas = function(ctx) {
	if (!this[0].getContext) {return null;}
	return this[0].getContext(ctx || '2d');
};

// Load canvas
$.fn.getCanvasImage = function(type) {
	if (!this[0].toDataURL) {return null;}
	if (type === undefined) {
		type = 'image/png';
	} else {
		type = type
			.replace(/^([a-z]+)$/gi, 'image/$1')
			.replace(/jpg/gi, 'jpeg');
	}
	return this[0].toDataURL(type);
};

// Draw on canvas manually
$.fn.draw = function(callback) {
	var $elems = this, e;
	for (e=0; e<$elems.length; e+=1) {
		if (!$elems[e].getContext) {continue;}
		callback.call($elems[e], $elems[e].getContext('2d'));
	}
	return this;
};

// Create gradient
$.fn.gradient = function(args) {
	if (!this[0].getContext) {return null;}
	var ctx = this[0].getContext('2d'),
		params = merge(new Prefs(), args),
		gradient, percent,
		stops = 0,
		i = 1;
	
	// Create radial gradient if chosen
	if (params.r1 != null || params.r2 != null) {
		gradient = ctx.createRadialGradient(params.x1, params.y1, params.r1, params.x2, params.y2, params.r2);
	} else {
		gradient = ctx.createLinearGradient(params.x1, params.y1, params.x2, params.y2);
	}
	
	// Count number of color stops
	while (params['c' + i] !== undefined) {
		stops += 1;
		i += 1;
	}
		
	// Calculate color stop percentages if absent
	for (i=1; i<=stops; i+=1) {
		percent = round(100 / (stops-1) * (i-1)) / 100;
		if (params['s' + i] === undefined) {
			params['s' + i] = percent;
		}
		gradient.addColorStop(params['s' + i], params['c' + i]);
	}
	return gradient;
};

// Create pattern
$.fn.pattern = function(args) {
	if (!this[0].getContext) {return null;}
	var ctx = this[0].getContext('2d'),
		params = merge(new Prefs(), args),
		img = new Image(),
		pattern;
	// Use specified element, if not, a source URL
	if (params.source.src) {
		img = params.source;
	} else if (params.source) {
		img.src = params.source;
	}	
	
	// Create pattern
	function create() {
		if (img.complete) {
			// Create pattern
			pattern = ctx.createPattern(img, params.repeat);
			return true;
		} else {
			return false;
		}
		
	}
	// Run callback function
	function callback() {
		if (params.load) {
			params.load.call(this[0], pattern);
		}
	}
	function onload() {
		create();
		callback();
	}
	// Draw when image is loaded (if chosen)
	if (!img.complete && params.load) {
		img.onload = onload;
	} else {
		// Draw image if loaded
		if (!create()) {
			img.onload = onload;
		} else {
			callback();
		}
	}
	return pattern;
};

// Clear canvas
$.fn.clearCanvas = function(args) {
	var ctx, e, params = merge(new Prefs(), args);

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');

		positionShape(ctx, params, params.width, params.height);
		
		// Clear entire canvas
		if (!params.width && !params.height) {
			ctx.clearRect(0, 0, this[e].width, this[e].height);
		} else {
			ctx.clearRect(params.x-params.width/2, params.y-params.height/2, params.width, params.height);
		}
	}
	return this;
};

// Save canvas
$.fn.saveCanvas = function() {
	var e;
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		this[e].getContext('2d').save();
	}
	return this;
};

// Restore canvas
$.fn.restoreCanvas = function() {
	var e;
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		this[e].getContext('2d').restore();
	}
	return this;
};

// Scale canvas
$.fn.scaleCanvas = function(args) {
	var ctx, e, params = merge(new Prefs(), args);
		
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');

		ctx.save();
		ctx.translate(params.x, params.y);
		ctx.scale(params.scaleX, params.scaleY);
		ctx.translate(-params.x, -params.y);
	}
	return this;
};

// Translate canvas
$.fn.translateCanvas = function(args) {
	var ctx, e, params = merge(new Prefs(), args);

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		ctx.save();
		ctx.translate(params.x, params.y);
	}
	return this;
};

// Rotate canvas
$.fn.rotateCanvas = function(args) {
	var ctx, e, params = merge(new Prefs(), args);
	
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		positionShape(ctx, params, 0, 0);
	}
	return this;
};

// Draw rectangle
$.fn.drawRect = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		x1, y1, x2, y2, r;

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
		positionShape(ctx, params, params.width, params.height);
		ctx.beginPath();
		
		// Draw a rounded rectangle if chosen
		if (params.cornerRadius) {
			params.closed = true;
			x1 = params.x - params.width/2;
			y1 = params.y - params.height/2;
			x2 = params.x + params.width/2;
			y2 = params.y + params.height/2;
			r = params.cornerRadius;
			// Prevent over-rounded corners
			if ((x2 - x1) - (2 * r) < 0) {
				r = (x2 - x1) / 2;
			}
			if ((y2 - y1) - (2 * r) < 0) {
				r = (y2 - y1) / 2;
			}
			ctx.moveTo(x1+r,y1);
			ctx.lineTo(x2-r,y1);
			ctx.arc(x2-r, y1+r, r, 3*pi/2, pi*2, false);
			ctx.lineTo(x2,y2-r);
			ctx.arc(x2-r, y2-r, r, 0, pi/2, false);
			ctx.lineTo(x1+r,y2);
			ctx.arc(x1+r, y2-r, r, pi/2, pi, false);
			ctx.lineTo(x1,y1+r);
			ctx.arc(x1+r, y1+r, r, pi, 3*pi/2, false);
		} else {
			ctx.rect(params.x-params.width/2, params.y-params.height/2, params.width, params.height);
		}
		ctx.restore();
		closePath(ctx, params);
	}
	return this;
};

// Draw arc
$.fn.drawArc = function(args) {
	var ctx, e, params = merge(new Prefs(), args);

	// Change default end angle to radians if needed
	if (!params.inDegrees && params.end === 360) {
		params.end = pi * 2;
	}
		
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
		positionShape(ctx, params, params.radius*2, params.radius*2);
		
		// Draw arc
		ctx.beginPath();
		ctx.arc(params.x, params.y, params.radius, (params.start*params.toRad)-(pi/2), (params.end*params.toRad)-(pi/2), params.ccw);
		// Close path if chosen
		ctx.restore();
		closePath(ctx, params);
	}
	return this;
};

// Draw ellipse
$.fn.drawEllipse = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		controlW = params.width * 4/3;
		
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
		positionShape(ctx, params, params.width, params.height);
		
		// Create ellipse
		ctx.beginPath();
		ctx.moveTo(params.x, params.y-params.height/2);
		// Left side
		ctx.bezierCurveTo(params.x-controlW/2, params.y-params.height/2, params.x-controlW/2, params.y+params.height/2, params.x, params.y+params.height/2);
		// Right side
		ctx.bezierCurveTo(params.x+controlW/2, params.y+params.height/2, params.x+controlW/2, params.y-params.height/2, params.x, params.y-params.height/2);
		ctx.restore();
		closePath(ctx, params);
	}
	return this;
};

// Draw line
$.fn.drawLine = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		l=2, lx=0, ly=0;

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
		
		// Draw each point
		ctx.beginPath();
		ctx.moveTo(params.x1, params.y1);
		while (true) {
			lx = params['x' + l];
			ly = params['y' + l];
			if (lx !== undefined && ly !== undefined) {
				ctx.lineTo(lx, ly);
				l += 1;
			} else {
				break;
			}
		}
		// Close path if chosen
		closePath(ctx, params);
	}
	return this;
};

// Draw quadratic curve
$.fn.drawQuad = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		l = 2,
		lx=0, ly=0,
		lcx=0, lcy=0;

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
			
		// Draw each point
		ctx.beginPath();
		ctx.moveTo(params.x1, params.y1);
		while (true) {
			lx = params['x' + l];
			ly = params['y' + l];
			lcx = params['cx' + (l-1)];
			lcy = params['cy' + (l-1)];
			if (lx !== undefined && ly !== undefined && lcx !== undefined && lcy !== undefined) {
				ctx.quadraticCurveTo(lcx, lcy, lx, ly);
				l += 1;
			} else {
				break;
			}
		}
		// Close path if chosen
		closePath(ctx, params);
	}
	return this;
};

// Draw Bezier curve
$.fn.drawBezier = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		l = 2, lc = 1,
		lx=0, ly=0,
		lcx1=0, lcy1=0,
		lcx2=0, lcy2=0;

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
	
		// Draw each point
		ctx.beginPath();
		ctx.moveTo(params.x1, params.y1);
		while (true) {
			lx = params['x' + l];
			ly = params['y' + l];
			lcx1 = params['cx' + lc];
			lcy1 = params['cy' + lc];
			lcx2 = params['cx' + (lc+1)];
			lcy2 = params['cy' + (lc+1)];
			if (lx !== undefined && ly !== undefined && lcx1 !== undefined && lcy1 !== undefined && lcx2 !== undefined && lcy2 !== undefined) {
				ctx.bezierCurveTo(lcx1, lcy1, lcx2, lcy2, lx, ly);
				l += 1;
				lc += 2;
			} else {
				break;
			}
		}
		// Close path if chosen
		closePath(ctx, params);
	}
	return this;
};

// Draw text
$.fn.drawText = function(args) {
	var ctx, e, params = merge(new Prefs(), args);

	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
	
		// Set text-specific properties
		ctx.textBaseline = params.baseline;
		ctx.textAlign = params.align;
		ctx.font = params.font;
		
		ctx.strokeText(params.text, params.x, params.y);
		ctx.fillText(params.text, params.x, params.y);
	}
	return this;
};

// Draw image
$.fn.drawImage = function(args) {
	var ctx, elem, e, params = merge(new Prefs(), args),
		// Define image source
		img = new Image(),
		scaleFac;
	// Use specified element, if not, a source URL
	if (params.source.src) {
		img = params.source;
	} else if (params.source) {
		img.src = params.source;
	}
	
	// Draw image function
	function draw(ctx) {
		if (img.complete) {
			scaleFac = (img.width / img.height);
			
			// Show whole image if no cropping region is specified
			params.sWidth = params.sWidth || img.width;
			params.sHeight = params.sHeight || img.height;
			// Ensure cropped region is not bigger than image
			if (params.sWidth > img.width) {
				params.sWidth = img.width;
			}
			if (params.sHeight > img.height) {
				params.sHeight = img.height;
			}
			// Destination width/height should equal source unless specified
			if (params.width === 0 && params.sWidth !== img.width) {
				params.width = params.sWidth;
			}
			if (params.height === 0 && params.sHeight !== img.height) {
				params.height = params.sHeight;
			}
			
			// If no sx/sy specified, use center of image (or top-left corner if cropFromCenter is false)
			if (params.sx === null) {
				if (params.cropFromCenter) {
					params.sx = img.width / 2;
				} else {
					params.sx = 0;
				}
			}
			if (params.sy === null) {
				if (params.cropFromCenter) {
					params.sy = img.height / 2;
				} else {
					params.sy = 0;
				}
			}
			
			// Crop from top-left corner if specified (rather than center)
			if (!params.cropFromCenter) {
				params.sx += params.sWidth/2;
				params.sy += params.sHeight/2;
			}
			
			// Ensure cropped region does not extend image boundary
			if ((params.sx - params.sWidth/2) < 0) {
				params.sx = params.sWidth/2;
			}
			if ((params.sx + params.sWidth/2) > img.width) {
				params.sx = img.width - params.sWidth / 2;
			}
			if ((params.sy - params.sHeight/2) < 0) {
				params.sy = params.sHeight / 2;
			}
			if ((params.sy + params.sHeight/2) > img.height) {
				params.sy = img.height - params.sHeight / 2;
			}
			
			// If only width is present
			if (params.width && !params.height) {
				params.height = params.width / scaleFac;
			// If only height is present
			} else if (!params.width && params.height) {
				params.width = params.height * scaleFac;
			// If width and height are both absent
			} else if (!params.width && !params.height) {
				params.width = img.width;
				params.height = img.height;
			}
			
			// Draw image
			positionShape(ctx, params, params.width, params.height);
			ctx.drawImage(
				img,
				params.sx - params.sWidth / 2,
				params.sy - params.sHeight / 2,
				params.sWidth,
				params.sHeight,
				params.x - params.width / 2,
				params.y - params.height / 2,
				params.width,
				params.height
			);
			ctx.restore();
			return true;
		} else {
			return false;
		}
	}
	// Run callback function
	function callback() {
		if (params.load) {
			params.load.call(elem);
		}
	}
	// On load function
	function onload() {
		draw(ctx);
		callback();
	}
	// Draw image if already loaded
	for (e=0; e<this.length; e+=1) {
		elem = this[e];
		if (!elem.getContext) {continue;}
		ctx = elem.getContext('2d');
		setGlobals(ctx, params);
		
		// Draw when image is loaded (if chosen)
		if (!img.complete && params.load) {
			img.onload = onload;
		} else {
			// Draw image if loaded
			if (!draw(ctx)) {
				img.onload = onload;
			} else {
				callback();
			}
		}
	}
	return this;
};

// Draw polygon
$.fn.drawPolygon = function(args) {
	var ctx, e, params = merge(new Prefs(), args),
		inner = pi / params.sides,
		theta = (pi/2) + inner,
		dtheta = (pi*2) / params.sides,
		apothem = cos(dtheta/2) * params.radius,
		x1, y1, x2, y2, i;
	params.closed = true;
	
	if (params.sides > 2) {
	for (e=0; e<this.length; e+=1) {
		if (!this[e].getContext) {continue;}
		ctx = this[e].getContext('2d');
		setGlobals(ctx, params);
		
		// Calculate points and draw
		positionShape(ctx, params, params.radius, params.radius);
		ctx.beginPath();
		for (i=0; i<params.sides; i+=1) {
			x1 = params.x + round(params.radius * cos(theta));
			y1 = params.y + round(params.radius * sin(theta));
			// Draw path
			if (i === 0) {
				ctx.moveTo(x1, y1);
			} else {
				ctx.lineTo(x1, y1);
			}
			// Project sides if chosen
			if (params.projection) {
				x2 = params.x + round((apothem+apothem*params.projection) * cos(theta+inner));
				y2 = params.y + round((apothem+apothem*params.projection) * sin(theta+inner));
				ctx.lineTo(x2, y2);
			}
			theta += dtheta;
		}
		ctx.restore();
		closePath(ctx, params);
	}
	}
	return this;
};

// Get pixels on the canvas
$.fn.setPixels = function(args) {
	var ctx, elem, e, i,
		params = merge(new Prefs(), args),
		imgData, data, len, px = {};
	
	for (e=0; e<this.length; e+=1) {
			elem = this[e];
			if (!elem.getContext) {continue;}
			ctx = elem.getContext('2d');
			// Measure from center
			if (!params.x && !params.y && !params.width && !params.height) {
				params.width = elem.width;
				params.height = elem.height;
				params.x = params.width/2;
				params.y = params.height/2;
			}
			positionShape(ctx, params, params.width, params.height);
			imgData = ctx.getImageData(params.x-params.width/2, params.y-params.height/2, params.width, params.height);
			data = imgData.data;
			len = data.length;
			px = [];
			
			// Loop through pixels with "each" method
			if (params.each !== undefined) {
				for (i=0; i<len; i+=4) {
					px.index = i/4;
					px.r = data[i];
					px.g = data[i+1];
					px.b = data[i+2];
					px.a = data[i+3];
					params.each.call(elem, px);
					data[i] = px.r;
					data[i+1] = px.g;
					data[i+2] = px.b;
					data[i+3] = px.a;
				}
			}
			// Put pixels on canvas
			ctx.putImageData(imgData, params.x-params.width/2, params.y-params.height/2);
			ctx.restore();
	}
	return this;
};

// Show object properties
function showProps(props, obj) {
	var i;
	for (i=0; i<props.length; i+=1) {
		obj[props[i]] = obj['_' + props[i]];
	}
}

// Hide object properties
function hideProps(props, obj) {
	var i;
	for (i=0; i<props.length; i+=1) {
		obj['_' + props[i]] = obj[props[i]];
	}
}

// Define properties
cssProps = [
	'width',
	'height',
	'opacity'
];
colorProps = [
	'backgroundColor',
	'color',
	'borderColor',
	'borderTopColor',
	'borderRightColor',
	'borderBottomColor',
	'borderLeftColor',
	'fillStyle',
	'strokeStyle',
	'shadowColor'
];

// Convert a color value to RGBA
function toRgba(color) {
	var original, elem,
		rgb = [],
		multiple = 1;
	
	// If color is array already
	if (typeof color === 'object') {
		rgb = color;
	} else {
		
		// Deal with color names
		if (color.match(/^[a-z]+$/gi)) {
			// Deal with complete transparency
			if (color === 'transparent') {
				color = 'rgba(255, 255, 255, 0)';
			}
			elem = document.documentElement;
			original = elem.style.color;
			elem.style.color = color;
			color = $.css(elem, 'color');
			elem.style.color = original;
		}
		// Deal with hexadecimal
		if (color.match(/^\#/gi)) {
			// Deal with shorthand hex
			if (color.length === 4) {
				color = color.replace(/([0-9a-f])/gi, '$1$1');
			}
			rgb = color.match(/[0-9a-f]{2}/gi);
			rgb[0] = parseInt(rgb[0], 16);
			rgb[1] = parseInt(rgb[1], 16);
			rgb[2] = parseInt(rgb[2], 16);
		// Parse RGB string
		} else if (color.match(/^rgb/gi)) {
			rgb = color.match(/[0-9\.]+/gi);
			// Deal with RGB percentages
			if (color.match(/\%/gi)) {
				multiple = 2.55;
			}
			rgb[0] = rgb[0] * multiple;
			rgb[1] = rgb[1] * multiple;
			rgb[2] = rgb[2] * multiple;
		}
		// Add alpha
		if (color.indexOf('rgba') !== -1) {
			rgb[3] = parseFloat(rgb[3]);
		} else {
			rgb[3] = 1;
		}
	}
	return rgb;
}

// Get current frame value
function getFrame(fx, i) {
	fx.now[i] = fx.start[i] + (fx.end[i] - fx.start[i]) * fx.pos;
	// Don't round opacity
	if (i < 3) {fx.now[i] = round(fx.now[i]);}
}

// Animate a hex or RGB color
function animateColor(fx) {
	if (typeof fx.start !== 'object') {
		fx.start = toRgba(fx.start);
		fx.end = toRgba(fx.end);
	}
	fx.now = [];
	getFrame(fx, 0);
	getFrame(fx, 1);
	getFrame(fx, 2);
	getFrame(fx, 3);
	fx.now = 'rgba(' + fx.now.join(',') + ')';
	if (fx.elem.style) {
		fx.elem.style[fx.prop] = fx.now;
	} else {
		fx.elem[fx.prop] = fx.now;
	}
}

// Enable animation for color properties
function supportColorProps(props) {
	var p;
	for (p=0; p<props.length; p+=1) {
		if (!$.fx.step[props[p]]) {
			$.fx.step[props[p]] = animateColor;
		}
	}
}

// Get jCanvas layers
$.fn.getLayers = function() {
	var elem = this[0], layers;
	if (!elem || !elem.getContext) {return [];}
	layers = $.data(elem, 'layers');
	// Create layers array if none exists
	if (layers === undefined) {
		layers = [];
		$.data(elem, 'layers', layers);
	}
	return layers;
};

// Get a single jCanvas layer
$.fn.getLayer = function(index) {
	index = index || 0;
	return this.getLayers()[index];
};

// Add a new jCanvas layer
$.fn.addLayer = function(args) {
	var $elems = this, $elem, layers, img, e,
	params = merge(args, new Prefs(), $.extend({}, args));
	// Use the "fn" property if specified (for compatibility)
	params.method = params.fn || params.method;
	params.layer = true;

	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		if (!$elems[e].getContext) {continue;}
		layers = $elem.getLayers();
		// If layer is a function
		if (typeof params === 'function') {
			params.method = 'draw';
		}
		layers.push(params);
	}
	return $elems;
};

// Remove a jCanvas layer
$.fn.removeLayer = function(index) {
	index = index || 0;
	this.getLayers().splice(index, 1);
	return this;
};

// Draw jCanvas layers
$.fn.drawLayers = function() {
	var $elems = this, $elem,
		ctx, params, layers, e, i;
	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		if (!$elem[0].getContext) {continue;}
		ctx = $elem[0].getContext('2d');
		layers = $elem.getLayers();
		// Clear canvas first
		ctx.clearRect(0, 0, $elem[0].width, $elem[0].height);
		// Draw items on queue
		for (i=0; i<layers.length; i+=1) {
			params = layers[i];
			// If layer is a function
			if (params.method === 'draw') {
				params.call($elem[0], ctx);
			// If layer is an object
			} else {
				if (fn[params.method]) {
					fn[params.method].call($elem, params);
				}
			}
		}
	}
	return $elems;
};

// Animate jCanvas layer
$.fn.animateLayer = function() {
	// Setup
	var $elems = this,
		args = Array.prototype.slice.call(arguments, 0),
		$elem, layers, layer, e;
		
	// Deal with all cases of argument placement
	
	// If index is omitted
	if (typeof args[0] === 'object' && !args[0].method) {
		args.unshift(0);
	}
	// If object is the last argument
	if (args[2] === undefined) {
		args.splice(2, 0, null);
		args.splice(3, 0, null);
		args.splice(4, 0, function() {});
	// If callback comes after object
	} else if (typeof args[2] === 'function') {
		args.splice(2, 0, null);
		args.splice(3, 0, null);
	}
	// If duration is the last argument
	if (args[3] === undefined) {
		args[3] = null;
		args.splice(4, 0, function() {});
	// If callback comes after duration
	} else if (typeof args[3] === 'function') {
		args.splice(3, 0, null);
	}
	// If callback is ommitted
	if (args[4] === undefined) {
		args[4] = function() {};
	}

	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		// If a layer object was passed, use it as a reference
		if (args[0].layer) {		
			layer = args[0];
		} else {
			layer = $elem.getLayers()[args[0]];
		}
		if (!layer || layer.method === 'draw') {
			continue;
		}
		// Trick drawImage() to not fill in width/height if either is 0
		if (layer.method === 'drawImage') {
			args[1].width = args[1].width || 1e-10;
			args[1].height = args[1].height || 1e-10;
			layer.width = layer.width || 1e-10;
			layer.height = layer.height || 1e-10;
		}
		// Merge properties so any property can be animated
		layer = merge(layer, prefs, $.extend({}, layer));
		// Allow jQuery to animate CSS properties of regular objects
		hideProps(cssProps, layer);
		hideProps(cssProps, args[1]);
		// Animate layer
		$(layer).animate(args[1], {
			duration: args[2],
			easing: ($.easing[args[3]] ? args[3] : null),
			// When animation completes
			complete: (function($elem) {
				return function() {
					showProps(cssProps, layer);
					$elem.drawLayers(true);
					args[4].call($elem[0]);
				};
			}($elem)),
			// Redraw for every frame
			step: (function($elem, layer) {
				return function() {
					showProps(cssProps, layer);
					$elem.drawLayers(true);
				};
			}($elem, layer))
		});
	}
	return $elems;
};

// Normalize offsetX and offsetY for all browsers
$.event.fix = function(event) {
	event = eventFix.call($.event, event);
	// If offsetX and offsetY are not supported
	if (event.offsetX == null && event.offsetY == null) {
		var offset = $(event.target).offset();
		event.offsetX = event.pageX - offset.left;
		event.offsetY = event.pageY - offset.top;
	}
	return event;
};

// Check for canvas support with $.support
$.support.canvas = (document.createElement('canvas').getContext != null);

// Enable animation for color properties
supportColorProps(colorProps);

// Export jCanvas functions
jCanvas.defaults = defaults;
jCanvas.prefs = prefs;
jCanvas.extend = extend;
$.jCanvas = jCanvas;

}(jQuery, document, Math, Array, Image, parseFloat, parseInt));
