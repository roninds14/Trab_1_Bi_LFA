<?php

require_once "GrafoListaAd.php";
require_once "GrafoMatrizAd.php";
require_once "BuscaLag.php";

class MostrarBuscaLag{

	static public function criarVertces( $b, $inv, $raiz ){
		
		$vertices = '';
		
		$arestas = '';
		
		$valores = '';
		
		$pontas = '';
		
		$qtd = $b->getVertices();
		
		$caminhos = BuscaLag::CaminhoT( $b, $raiz );
		
		for( $i = 0; $i <  $qtd; $i ++ ){
			$x = 300 + sin( ($i * pi() * 2 )/ $qtd ) * 166;
			$y = 250 - cos( ($i * pi() * 2 )/ $qtd ) * 166;
			
			foreach( $b->adj( $i ) as $k => $v ){
				$x2 = 300 + sin( ( $v[0] * pi() * 2 )/ $qtd ) * 166;
				$y2 = 250 - cos( ( $v[0] * pi() * 2 )/ $qtd ) * 166;
				
				$angulo = ( 2 * pi() ) - atan( ( ( $x2 - $x ) / ( $y2 - $y ) )  );
				
				if( $x2 < $x )
					$x3 = $x2 + abs( sin( $angulo ) ) * 30;
				else
					$x3 = $x2 - abs( sin( $angulo ) ) * 30;
				
				if( $y2 < $y )				
					$y3 = $y2 + abs(cos( $angulo )) * 30;
				else
					$y3 = $y2 - abs(cos( $angulo )) * 30;
				
				$arestas .= ' <line x1="'. $x .'" y1="'. $y .'" x2="'. $x2 .'" y2="'. $y2 .'" style="stroke:rgb(0,0,0);stroke-width:3" />';
				
				//$valores .= '<text x="'. ($x + $x2) / 2 .'" y="'. ($y + $y2) / 2 .'" fill="#FFF">'. $v[1] .'</text>';
				
				if( !$inv )
					$pontas .= '<circle cx="'. $x3 .'" cy="'. $y3 .'" r="5" fill="#000" />';
			}
			
			$vertices .= '<circle cx="'. $x .'" cy="'. $y .'" r="30" stroke="black" stroke-width="4"  fill="#ccc" />';
			
			$valores .= '<text x="'. $x .'" y="'. $y .'" fill="black">'. $i .'</text>';
			
			if( $caminhos[ $i ][ 0 ] == PHP_INT_MAX )
				$valores .= '<text x="'. intval( $x + 34 ) .'" y="'. intval( $y - 30 ) .'" fill="white">Não chega</text>';
			else{
				if( $caminhos[ $i ][ 0 ] == 0 )
					$valores .= '<text x="'. intval( $x + 34 ) .'" y="'. intval( $y - 30 ) .'" fill="white">Raiz</text>';
				else{
					$valores .= '<text x="'. intval( $x + 34 ) .'" y="'. intval( $y - 30 ) .'" fill="white">D: '. $caminhos[ $i ][ 0 ] .'</text>';
					
					$caminho = "C: ";
					
					for( $c = 1; $c < count( $caminhos[ $i ] ); $c++ )
						$caminho .= $caminhos[ $i ][ $c ] ." - ";
					
					$caminho .= $i;
						
					$valores .= '<text x="'. intval( $x + 34 ) .'" y="'. intval( $y - 10 ) .'" fill="white">'. $caminho .'</text>';	
				}			 
			}
		}
		
		echo '<h4>Busca em Largura</h4><svg width="600" height="500" style="margin: 0 auto">'. $arestas . $vertices . $pontas .  $valores . '</svg>';
		
		//print_r( $caminhos );
		
	}
	
}
?>