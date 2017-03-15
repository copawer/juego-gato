$(document).ready(init);

var currentSection = null;

function init() {
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
	$('#btn-historial').click(onClickBtnHistorial);

	$('#lista-juegos').on('click', 'button', onClickBtnItemJuego);


	TweenMax.from($('#saludo h1'), 1, {marginBottom: '0px', ease: Elastic.easeOut});
}

function onClickBtnItemJuego()
{
	var idGame = $(this).parent().data('idGame');
	console.log(idGame);
	getSingleGame(idGame);
}

function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function onClickBtnHistorial(evt) {
	evt.preventDefault();
	gotoSection('historial');
	getHistorial();
}

function gotoSection(_identificadorDeSeccion) {
	currentSection.removeClass('visible');
	var nextSection = $('#' + _identificadorDeSeccion);

	nextSection.addClass('visible');

	TweenMax.from(nextSection, 1.5, {scale: 0.2, opacity: 0, ease: Elastic.easeOut});
	currentSection = nextSection;
}

function getHistorial() {
	$.ajax({
		url:'http://test-ta.herokuapp.com/games'
	}).success(function (_data) {
		dibujarHistorial(_data);
	});
}

function getSingleGame(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}

function dibujarHistorial(_datos) {
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);

		var html = '<li data-idgame="'+ _datos[i].id +'class="list-group-item"><button class="btn">Ver</button> Ganador: ' + _datos[i].winner_player + '</li>';
		lista.append(html);
	}
}