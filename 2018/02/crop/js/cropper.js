/*
* imageCropperInit(img) - создание кропалки
*
* imageCropperSetPosition(img) - установление позиции кропалки поверх картинки
*
* imageCropperRemove(img) - удаление кропалки
*
* */



function imageCropperInit(img){
	/* создаём теги и вставляем их после картинки */
	let Cropper = document.createElement('span');
	Cropper.classList.add('image-cropper');
	let html = '<span class="crop-area">';
	html += '<span class="move-area"></span>';
	let cropRatio = _getCropRatio(img);
	let directions = ['nw', 'ne', 'sw', 'se'];
	let directionsWNES = ['w', 'n', 'e', 's'];
	if (!cropRatio) directions = directions.concat(directionsWNES);
	directions.forEach(function(e){ html += '<span class="point point-' + e + '" data-point="' + e + '"></span>'; });
	html += '</span>';
	directionsWNES.forEach(function(e){ html += '<span class="shade shade-' + e + '"></span>'; });
	Cropper.innerHTML = html;
	img.parentElement.insertBefore(Cropper, img.nextElementSibling);
	imageCropperSetPosition(img);

	Cropper.querySelector('.move-area').addEventListener('mousedown', _cropperMoveStart);
	Cropper.querySelectorAll('.point').forEach(function(point){
		point.addEventListener('mousedown', _cropperCropStart);
	});


	return Cropper;

}

function imageCropperSetPosition(img){
	let Cropper = img.nextElementSibling;
	if (!Cropper || !Cropper.classList.contains('image-cropper')) return null;
	let cropRatio = _getCropRatio(img);
	if (!Cropper.classList.contains('initialized')){
		/* первый раз устанавливаем позицию */
		setPositionFirstTime(img, Cropper, cropRatio);
	} else {
		/* устанавливаем позицию после ресайза окна */
	}
	Cropper.classList.add('initialized');
	return Cropper;

	function setPositionFirstTime(img, Cropper, cropRatio){
		Cropper.style.left = img.offsetLeft + 'px';
		Cropper.style.top = img.offsetTop + 'px';
		Cropper.style.width = img.clientWidth + 'px';
		Cropper.style.height = img.clientHeight + 'px';
		let imgWidth = img.clientWidth;
		let imgHeight = img.clientHeight;
		let cropWidth = Math.round(imgWidth * 0.8);
		let cropHeight = Math.round(imgHeight * 0.8);
		let left = 0, top = 0, width = 0, height = 0;
		if (cropRatio){
			/* изменение размера, сохраняя пропорции */
			let w = Math.round(cropHeight * cropRatio);
			let h = Math.round(cropWidth / cropRatio);
			let vertical = cropWidth / cropHeight > cropRatio;
			left = Math.round(vertical ? (imgWidth - w) / 2 : imgWidth / 10);
			top = Math.round(vertical ? imgHeight / 10 : (imgHeight - h) / 2);
			width = (vertical ? w : cropWidth);
			height = (vertical ? cropHeight : h);
		} else {
			/* свободное изменение размера */
			left = Math.round(imgWidth / 10);
			top = Math.round(imgHeight / 10);
			width = cropWidth;
			height = cropHeight;
		}
		img.dataset.crop = left + ' ' + top + ' ' + width + ' ' + height;
		let CropArea = Cropper.querySelector('.crop-area');
		CropArea.style.left = left + 'px';
		CropArea.style.top = top + 'px';
		CropArea.style.width = width + 'px';
		CropArea.style.height = height + 'px';
		_setShadePositions(Cropper);
	}
}

function imageCropperRemove(img){
	let Cropper = img.nextElementSibling;
	if (!Cropper || !Cropper.classList.contains('image-cropper')) return false;
	Cropper.parentElement.removeChild(Cropper);
	return true;
}

function _setShadePositions(Cropper){
	let CropArea = Cropper.querySelector('.crop-area');
	let left = parseInt(CropArea.style.left);
	let top = parseInt(CropArea.style.top);
	let Shade = Cropper.querySelector('.shade-w');
	Shade.style.top = top + 'px';
	Shade.style.width = left + 'px';
	Shade.style.height = CropArea.clientHeight + 'px';
	Shade = Cropper.querySelector('.shade-n');
	Shade.style.width = Cropper.clientWidth + 'px';
	Shade.style.height = top + 'px';
	Shade = Cropper.querySelector('.shade-e');
	Shade.style.top = top + 'px';
	Shade.style.width = Cropper.clientWidth - left - CropArea.clientWidth + 'px';
	Shade.style.height = CropArea.clientHeight + 'px';
	Shade = Cropper.querySelector('.shade-s');
	Shade.style.width = Cropper.clientWidth + 'px';
	Shade.style.height = Cropper.clientHeight - top - CropArea.clientHeight + 'px';
}

function _cropperMoveStart(e){
	window.Cropper = this.parentElement.parentElement;
	window.Cropper.addEventListener('mousemove', _cropperMove);
	window.addEventListener('mouseup', _cropperMoveEnd);
	window.CropperInf = { state: 'move' };
	window.CropperInf.startPoint = { x: e.pageX, y: e.pageY };
	let CropArea = window.Cropper.querySelector('.crop-area');
	window.CropperInf.cropAreaPosition = { x: parseInt(CropArea.style.left), y: parseInt(CropArea.style.top) };
}
function _cropperMove(e){
	if (!window.Cropper) return false;
	if (window.CropperInf.state !== 'move') return false;
	let CropArea = window.Cropper.querySelector('.crop-area');
	let left = e.pageX - window.CropperInf.startPoint.x + window.CropperInf.cropAreaPosition.x;
	let top = e.pageY - window.CropperInf.startPoint.y + window.CropperInf.cropAreaPosition.y;
	left = Math.max(Math.min(left, window.Cropper.clientWidth - CropArea.clientWidth), 0);
	top = Math.max(Math.min(top, window.Cropper.clientHeight - CropArea.clientHeight), 0);
	CropArea.style.left = left + 'px';
	CropArea.style.top = top + 'px';
	_setShadePositions(window.Cropper);
	window.Cropper.previousElementSibling.dataset.crop = left + ' ' + top + ' ' + CropArea.clientWidth + ' ' + CropArea.clientHeight;
}
function _cropperMoveEnd(){
	try {
		window.Cropper.removeEventListener('mousemove', _cropperMove);
		window.removeEventListener('mouseup', _cropperMoveEnd);
	} catch (e) { console.dir(e); }
	window.Cropper = null;
	window.CropperInf = null;
}

function _cropperCropStart(e){
	window.Cropper = this.parentElement.parentElement;
	window.Cropper.addEventListener('mousemove', _cropperCrop);
	window.addEventListener('mouseup', _cropperCropEnd);
	window.CropperInf = { state: 'crop' };
	window.CropperInf.startPoint = { x: e.pageX, y: e.pageY };
	window.CropperInf.direction = this.dataset.point;
	window.CropperInf.cropRatio = _getCropRatio(window.Cropper.previousElementSibling);

	let CropArea = window.Cropper.querySelector('.crop-area');
	window.CropperInf.cropAreaPosition = {
		x: parseInt(CropArea.style.left),
		y: parseInt(CropArea.style.top),
		w: CropArea.clientWidth,
		h: CropArea.clientHeight
	};
}
function _cropperCrop(e){
	if (!window.Cropper) return false;
	if (window.CropperInf.state !== 'crop') return false;
	let cropRatio = window.CropperInf.cropRatio;
	let CropArea = window.Cropper.querySelector('.crop-area');
	let startPoint = window.CropperInf.startPoint;
	let left = window.CropperInf.cropAreaPosition.x;
	let top = window.CropperInf.cropAreaPosition.y;
	let right = window.CropperInf.cropAreaPosition.x + window.CropperInf.cropAreaPosition.w;
	let bottom = window.CropperInf.cropAreaPosition.y + window.CropperInf.cropAreaPosition.h;
	let deltaX = e.pageX - startPoint.x;
	let deltaY = e.pageY - startPoint.y;
	/*if (cropRatio) {
		if (deltaX * cropRatio > deltaY) deltaX = (deltaX < 0 ? -1 : 1) * Math.abs(deltaY) * cropRatio;
		else deltaY = (deltaY < 0 ? -1 : 1) * Math.abs(deltaX) / cropRatio;
	}*/
	if (window.CropperInf.direction === 'nw') {
		if (cropRatio) {
			left += deltaY * cropRatio;
			top += deltaY;
		} else {
			left += deltaX;
			top += Math.round(deltaX / cropRatio);
		}
	}
	if (window.CropperInf.direction === 'ne') {
		right += deltaX;
		top += deltaY;
	}
	if (window.CropperInf.direction === 'sw') {
		left += deltaX;
		bottom += deltaY;
	}
	if (window.CropperInf.direction === 'se') {
		right += deltaX;
		bottom += deltaY;
	}
	left = Math.max(Math.min(left, window.CropperInf.cropAreaPosition.x + window.CropperInf.cropAreaPosition.w - 24), 0);
	top = Math.max(Math.min(top, window.CropperInf.cropAreaPosition.y + window.CropperInf.cropAreaPosition.h - 24), 0);
	right = Math.max(Math.min(right, window.Cropper.clientWidth), left + 24);
	bottom = Math.max(Math.min(bottom, window.Cropper.clientHeight), top + 24);
	let width = right - left;
	let height = bottom - top;
	CropArea.style.left = left + 'px';
	CropArea.style.top = top + 'px';
	CropArea.style.width = width + 'px';
	CropArea.style.height = height + 'px';
	_setShadePositions(window.Cropper);
}
function _cropperCropEnd(){
	try {
		window.removeEventListener('mousemove', _cropperCrop);
		window.Cropper.removeEventListener('mouseup', _cropperCropEnd);
	} catch (e) { console.dir(e); }
	window.Cropper = null;
	window.CropperInf = null;
}

function _getCropRatio(elem){
	let res = parseFloat(elem.dataset.cropratio);
	if (isNaN(res)) res = null;
	return res;
}