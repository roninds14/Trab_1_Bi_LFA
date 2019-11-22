<?php 

$tipo = $_REQUEST["tipo"];

function salvar_ER(){
	echo "ER";	
};

function salvar_AF(){
	echo "AF";	
};

function salvar_GR(){
	echo "GR";	
};

switch ( $tipo ){
	case "ER":
		salvar_ER();
		break;
	case "AF":
		salvar_AF();
		break;
	case "GR":
		salvar_GR();
		break;
	default: 
		echo "Erro desconhecido";
	
	}

?>