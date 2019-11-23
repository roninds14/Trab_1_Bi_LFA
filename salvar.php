<?php 

$tipo = $_REQUEST["tipo"];
$data = $_REQUEST["data"];

switch ( $tipo ){
case "ER":
	salvar_ER( $data );
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

function salvar_ER($tipo){
	echo $tipo;	
};

function salvar_AF(){
	echo "AF";	
};

function salvar_GR(){
	echo "GR";	
};

?>