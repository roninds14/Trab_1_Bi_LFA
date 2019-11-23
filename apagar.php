<?php

$pasta = "xml/";

if(is_dir($pasta)){
	$diretorio = dir($pasta);

	while($arquivo = $diretorio->read())
		if(($arquivo != '.') && ($arquivo != '..'))
			unlink($pasta.$arquivo);			

	$diretorio->close();
}

echo "Arquivos apagados";
?>