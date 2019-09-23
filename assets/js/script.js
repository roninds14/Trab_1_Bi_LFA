// JavaScript Document
var tamanho, centro;

$(document).ready(function(){
	tamanho = window.innerWidth / 4;
	centro = tamanho / 2;
	
	$("svg").attr("width", tamanho + "px");
	$("svg").attr("height", tamanho + "px");
	
	
	$('.collapse').collapse();
	
	$('body').on("keyup", "#regExpText",function(){
		var regExp = new RegExp("^"+ $("#regExp").val() +"$");
		
		var texto = $(this).val();	
		
		if( regExp.test(texto) ) 
			$(this).css("background-color","#0F0");
		else
			$(this).css("background-color","#f00");
		
	});
	
	$('body').on("keyup", "#regExp",function(){
		var regExp = new RegExp("^"+ $(this).val() +"$");
		
		var texto = $("#regExpText").val();	
		
		if( regExp.test(texto) ) 
			$("#regExpText").css("background-color","#0F0");
		else
			$("#regExpText").css("background-color","#f00");
		
	});
	
	$('body').on("change","#expRegExp",function(){
		$("#regExp").val( $(this).val() );
		
		var texto = $("#regExpText").val();	
		
		if( regExp.test(texto) ) 
			$("#regExpText").css("background-color","#0F0");
		else
			$("#regExpText").css("background-color","#f00");
	});
	
	$('body').on("click","#gera_tabela",function(){
		var letras = $("#alfab").val().split("");
		
		letras = letras.filter(function(este, i) {
			return letras.indexOf(este) === i; 
		});
		
		if( !( letras.length > 1 ) )
			return false;
		
		$("#tb_estado").children("thead").empty();
		
		$("#tb_estado").children("thead").append('<tr><th>Estado</th><th>final</th></tr>');
		
		for( var i = 0; i < letras.length; i++ ){
			
			$("#tb_estado").children("thead").children("tr").append("<th class='text-center'>"+letras[i]+"</th>");
		}	
		
		$(this).parent("div").parent("div").siblings("div").css("display","flex");
		
		$("#tb_estado").children("tbody").empty();
		
	});
	
	$('body').on("click","#add_estado",function(){
		var linha = $( "#tb_estado" ).children("tbody").children("tr").length;
		
		var letras = $("#alfab").val().split("");
		
		letras = letras.filter(function(este, i) {
			return letras.indexOf(este) === i; 
		});
		
		var str = '<tr><td class="col_1">q'+linha+'</td><td class="text-center check col_2"><input type="checkbox" id="check_'+linha+'" /></td>';
		
		for(var i = 0; i < letras.length; i++ )
			str += '<td class="col_'+(i+3)+'"><input type="text" id="trans_'+linha+'_'+(i+3)+'" class="form-control num_virg"/></td>';
			
		str += '<td class="col_'+ (i+3) +'"><button type="button" class="btn btn-danger remove_estado">-</button></td></tr>';
		
		$( "#tb_estado" ).children("tbody").append( str );
		
		var qtd = $("#tb_estado").children("tbody").children("tr").length;
			
		if(  qtd && $("#string").val() )
			desenhar( qtd );	
	});
	
	$('body').on("click",".remove_estado",function(){
		
		var check = $(this).parent().siblings(".check").children("input").attr("id");
		
		check = check.split("_");
		
		var linha = parseInt( check[1] );
		
		var local = $(this).parent().parent().next();
		
		for( var i = linha; i < $( "#tb_estado" ).children("tbody").children("tr").length; i++){
			$( $(local)[0] ).children(".col_1").html("q"+i );
			$( $(local)[0] ).children(".col_2").children().attr("id","check_"+i);
			
			var j = 3;
			
			for(; j < $( $(local)[0] ).children().length; j++ ){
				var coluna =  $( $(local)[0] ).children(".col_"+j).children().attr("id").split("_");
				
				$( $(local)[0] ).children(".col_"+j).children().attr("id","trans_"+i+"_"+j);
			}			
			
			local = $( $(local)[0] ).next();	
			
		}
		
		$(this).parent().parent().remove();	
		
		var qtd = $("#tb_estado").children("tbody").children("tr").length;
			
		if(  qtd && $("#string").val() )
			desenhar( qtd );
	});
	
	$("body").on("keydown",".num_virg",function(e){
		if( !/\d/.test(e.key) && !/,/.test(e.key) && e.keyCode!=8 && e.keyCode!=46 && e.keyCode!=37 && e.keyCode != 39 )
			return false;
	
	});
	
	$(document).on("click","#desenha",function(){
		var qtd = $("#tb_estado").children("tbody").children("tr").length;
		
		if(  qtd && $("#string").val() )
			desenhar( qtd );	
	});
});

function desenhar( qtd ){	
 	$("#svg").css({"width": tamanho+"px","height":tamanho+"px","margin":"0 auto"});
	
	$("#svg").empty();
	
	var svg = "<svg width='"+tamanho+"px' height='"+tamanho+"px'>";
	
	var circulos, texto;
	
	for( var i = 0; i <  qtd; i ++ ){
			var x = centro + Math.sin( (i * Math.PI * 2 )/ qtd ) * 150;
			var y = centro - Math.cos( (i * Math.PI * 2 )/ qtd ) * 150;
			
			circulos += '<circle cx="'+x+'" cy="'+y+'" r="30" stroke="black" stroke-width="1" fill="#ccc" />'
			
			texto += '<text x="'+(x-10)+'" y="'+parseInt(y+5)+'" fill="black">q'+i+'</text>';
	}
	
	$("#svg").append( svg+circulos+texto+"</svg>");
	
}