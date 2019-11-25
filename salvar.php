<?php 

$tipo = $_REQUEST["tipo"];
$data = $_REQUEST["data"];

switch ( $tipo ){
case "ER":
	salvar_ER( $data );
	break;
case "AF":
	salvar_AF( $data );
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

function salvar_AF( $data ){
	$xw = xmlwriter_open_memory();
	
	xmlwriter_set_indent($xw, 1);
	
	$res = xmlwriter_set_indent_string($xw, ' ');

	xmlwriter_start_document($xw, '1.0', 'UTF-8');
	
	xmlwriter_start_element($xw, 'structure');
	
		xmlwriter_start_element($xw, 'type');
		
		xmlwriter_text($xw, 'fa');
		
		xmlwriter_end_element($xw);
		
		xmlwriter_start_element($xw, 'automaton');
		
		for( $i = 0; $i < $data[0]; $i++ ){
			xmlwriter_start_element($xw, 'state');
			
			xmlwriter_start_attribute($xw, 'id');
			xmlwriter_text($xw, $i );
			xmlwriter_end_attribute($xw);
			
			xmlwriter_start_attribute($xw, 'name');
			xmlwriter_text($xw, 'q'.$i );
			xmlwriter_end_attribute($xw);
			
				xmlwriter_start_element($xw, 'x');
				$x = 150 + sin( ($i * M_PI * 2 )/ $data[0] ) * 150;
				xmlwriter_text($xw, $x );				
				xmlwriter_end_element($xw);
				
				xmlwriter_start_element($xw, 'y');
				$y = 150 - cos( ($i * M_PI * 2 )/ $data[0] ) * 150;
				xmlwriter_text($xw, $y );				
				xmlwriter_end_element($xw);
				
				if( !$i ){
					xmlwriter_start_element($xw, 'initial');				
					xmlwriter_end_element($xw);
				}
				
				if( strpos( "$data[1]", "$i", 1 ) ){									
					xmlwriter_start_element($xw, 'final');				
					xmlwriter_end_element($xw);
				}					
			
			xmlwriter_end_element($xw);						
		}
		
		for( $i = 2; $i < count( $data ); $i++ ){
			if( !empty( $data[$i][1] ) or $data[$i][1] == "0" ){
				xmlwriter_start_element($xw, 'transition');
					xmlwriter_start_element($xw, 'from');
					xmlwriter_text($xw, $data[$i][0] );
					xmlwriter_end_element($xw);
					
					xmlwriter_start_element($xw, 'to');
					xmlwriter_text($xw, $data[$i][1] );
					xmlwriter_end_element($xw);
					
					xmlwriter_start_element($xw, 'read');
					xmlwriter_text($xw, $data[$i][2] );
					xmlwriter_end_element($xw);
				xmlwriter_end_element($xw);
			}
		}
		
		xmlwriter_end_element($xw);
	
	xmlwriter_end_element($xw);
	
	$nome = "xml/AF_".date_format(date_create(), 'u').".xml";
	$arquivo = fopen( $nome , "w+");
	fwrite( $arquivo, xmlwriter_output_memory($xw) );
	fclose( $arquivo );
	
	echo $nome;
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