ДЗ: Вивід дати

-----------------------------------

var y = prompt(...);

function day(d, m, y) {
	if (y === '') { ... }
}

day(d, m);

-----------------------------------

function addZero(s){
	s += '';
	if (s.length < 2) { s = '0' + s; }
	return s;
}

day(addZero(d), addZero(m));

-----------------------------------




















резинова, адаптивна, чуйна верстка
бутстрап
флексбокс
грід

perfect pixel, фріланс



window.document
document

document.documentElement
document.body

document.getElementById('...');

document.getElementsByClassName('...');
document.getElementsByTagName('...');

document.querySelector('...');
document.querySelectorAll('...');

навігація по нодам:

document.getElementById('...').parentNode();

var elem = document.getElementById('...');
elem.parentNode()
elem.childNodes()
elem.previousSibling()
elem.nextSibling()
elem.firstChild()
elem.lastChild()

навігація по елементам:

elem.parentElement()
elem.children()
elem.previousElementSibling()
elem.nextElementSibling()
elem.firstElementChild()
elem.lastElementChild()
