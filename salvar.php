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
	salvar_GR( $data );
	break;
default: 
	echo "Erro desconhecido";

}

function salvar_ER( $data){
	$xw = xmlwriter_open_memory();
	
	xmlwriter_set_indent($xw, 1);
	
	$res = xmlwriter_set_indent_string($xw, ' ');

	xmlwriter_start_document($xw, '1.0', 'UTF-8');
	
	xmlwriter_start_element($xw, 'structure');
	
		xmlwriter_start_element($xw, 'type');
	
		xmlwriter_text($xw, 're');
	
		xmlwriter_end_element($xw);
	
		xmlwriter_start_element($xw, 'expression');
	
		xmlwriter_text($xw, $data );
	
		xmlwriter_end_element($xw);
		
	xmlwriter_end_element($xw);	
	
	$nome = "xml/ER_".date_format(date_create(), 'u').".xml";
	$arquivo = fopen( $nome , "w+");
	fwrite( $arquivo, xmlwriter_output_memory($xw) );
	fclose( $arquivo );
	
	echo $nome;
};

function salvar_AF(){
	echo "AF";	
};

function salvar_GR( $data ){
	$xw = xmlwriter_open_memory();
	
	xmlwriter_set_indent($xw, 1);
	
	$res = xmlwriter_set_indent_string($xw, ' ');

	xmlwriter_start_document($xw, '1.0', 'UTF-8');
	
	xmlwriter_start_element($xw, 'structure');
	
		xmlwriter_start_element($xw, 'type');
	
		xmlwriter_text($xw, 'grammar');
		
		xmlwriter_end_element($xw);
		
		foreach( $data as $vetor ){
			xmlwriter_start_element($xw, 'production');
				xmlwriter_start_element($xw, 'left');
					xmlwriter_text($xw, $vetor[0] );
				xmlwriter_end_element($xw);
				xmlwriter_start_element($xw, 'right');
					xmlwriter_text($xw, $vetor[1] );
				xmlwriter_end_element($xw);
			xmlwriter_end_element($xw);
		}
	xmlwriter_end_element($xw);
	
	$nome = "xml/GR_".date_format(date_create(), 'u').".xml";
	$arquivo = fopen( $nome , "w+");
	fwrite( $arquivo, xmlwriter_output_memory($xw) );
	fclose( $arquivo );
	
	echo $nome;
};

?>