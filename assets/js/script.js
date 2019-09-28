// JavaScript Document
var tamanho, centro, letras, transicoes = [], gr_regras = [];

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
		letras = $("#alfab").val().split("");
		
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
	
	$("body").on("keyup",".num_virg",function(e){
		var qtd = $("#tb_estado").children("tbody").children("tr").length;
			
		if(  qtd && $("#string").val() )
			desenhar( qtd );
	});
	
	$(document).on("click","#desenha",function(){
		var qtd = $("#tb_estado").children("tbody").children("tr").length;
		
		if(  qtd && $("#string").val() )
			desenhar( qtd );	
	});
	
	$(document).on("keydown", "#variaveis", function(e){
		if( /^[A-Z]$/.test( e.key ) || e.keyCode==8 || e.keyCode==46 || e.keyCode==37 || e.keyCode == 39){
			$("#aviso_var").html("");
			
			if( $(this).val().search( e.key ) != -1  )
				return false;
		}
		else{ 
			$("#aviso_var").html("Maiscúlas apenas!");
			
			return false;
		}
		
	});
	
	
	$(document).on("keydown", "#terminais", function(e){
		if( /^[a-z]$/.test( e.key ) || e.keyCode==8 || e.keyCode==46 || e.keyCode==37 || e.keyCode == 39){
			$("#aviso_ter").html("");
			
			if( $(this).val().search( e.key ) != -1  )
				return false;
		}
		else{ 
			$("#aviso_ter").html("Minúsculas apenas!");
			
			return false;
		}
		
	});
	
	$(document).on("keydown", "#inicial", function(e){
		if( /^[A-Z]$/.test( e.key ) ){
			if( $("#variaveis").val().search( e.key ) == -1  || $(this).val().search( e.key ) != -1 )
				return false;
		}
		else if(e.keyCode==8 || e.keyCode==46 || e.keyCode==37 || e.keyCode == 39)
			return true;
		else{ 
			return false;
		}
		
	});
	
	$(document).on("click", "#btn_regras", function(){
		if( $("#variaveis").val()!="" && $("#terminais").val()!="" && $("#inicial").val()!="" ){
			$(this).parent().parent().next().css("display","flex");
			$(this).parent().parent().next().next().css("display","flex");
			
			$(this).parent().parent().next().children().empty();
			
			$(this).parent().parent().next().children().append('<h4>Regras <small>(separe por \'|\')</small></h4>');
			
			for( var i = 0; i < $("#variaveis").val().length; i++ )
				$(this).parent().parent().next().children().append('<div class="input-group mt-1"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">'+$("#variaveis").val()[i]+'</span></div><input type="text" class="form-control regras" placeholder="separe por \'|\'"></div>');
		
		
		}
	});
	
	$(document).on("keydown", ".regras", function(e){
		if( /^[a-zA-Z]$/.test( e.key ) ){
			if( $("#variaveis").val().search( e.key ) == -1  && $("#terminais").val().search( e.key ) == -1 )
				return false;
		}
		else if(e.keyCode==8 || e.keyCode==46 || e.keyCode==37 || e.keyCode == 39 || e.keyCode == 226 )
			return true;
		else{ 
			
			return false;
		}
		
	});
	
	$(document).on("click", "#btn_valida_gr",function(){
		if( $("#string_gr").val()!="")
			if( validar() )
				$("#resultado_gr").html("String ACEITA!");
			else
				$("#resultado_gr").html("String REJEITADA!");
	});
	
});

function desenhar( qtd ){	
 	$("#svg").css({"width": tamanho+"px","height":tamanho+"px","margin":"0 auto"});
	
	$("#svg").empty();
	
	var svg = "<svg width='"+tamanho+"px' height='"+tamanho+"px'>";
	
	var circulos, texto;
	
	transicoes = [];
	
	var linha = "";
	
	for( var i = 0; i <  qtd; i ++ ){
			transicoes[i] = [];
			
			for( var j = 0; j < letras.length; j++){
				var local = "#trans_"+i+"_"+(parseInt(j+3));
				
				transicoes[i][j] = $(local).val();
				
				var final = ($(local).val()).split(",");			
				
				for( var k = 0; k < final.length; k++ ) {
					if( /\d/.test( final[k] ) && parseInt( final[k] )< parseInt( qtd ) ){
						var x1 = centro + Math.sin( (i * Math.PI * 2 )/ qtd ) * 150;
						var y1 = centro - Math.cos( (i * Math.PI * 2 )/ qtd ) * 150;
						
						var x2 = centro + Math.sin( (final[k] * Math.PI * 2 )/ qtd ) * 150;
						var y2 = centro - Math.cos( (final[k] * Math.PI * 2 )/ qtd ) * 150;
						
						if ( parseInt(x2-x1) )
							linha += '<path d="M '+parseInt(x1)+' '+parseInt(y1)+' q 150 100 '+parseInt(x2-x1)+' '+parseInt(y2-y1)+'" stroke="blue" stroke-width="1" fill="none" />';
						else
							linha += '<circle cx="'+parseInt(x1+20)+'" cy="'+parseInt(y1-30)+'" r="'+(j+1)*10+'" stroke="blue" stroke-width="1" fill="rgba(0,0,0,0)" />'
							
							linha += '<text x="'+parseInt(x2+((j+1)*20))+'" y="'+parseInt(y2-20)+'" fill="red">'+letras[j]+'</text>';
						
					}
				}
			}
		
			var x = centro + Math.sin( (i * Math.PI * 2 )/ qtd ) * 150;
			var y = centro - Math.cos( (i * Math.PI * 2 )/ qtd ) * 150;			
			
			circulos += '<circle cx="'+x+'" cy="'+y+'" r="30" stroke="black" stroke-width="1" fill="#ccc" />'
			
			texto += '<text x="'+(x-10)+'" y="'+parseInt(y+5)+'" fill="black">q'+i+'</text>';
	}
	
	$("#svg").append( svg+linha+circulos+texto+"</svg>");	
	
}

function validar(){
	var i = 0;
	
	gr_regras = [];
	
	$(".regras").each(function(){
		gr_regras[i] = [];
		
		var regras = $(this).val().split("|");
		
		gr_regras[i][0] = $(this).prev().children().html();
		
		for( var j = 1; j <= regras.length; j++ ){
			regras[j-1] = regras[j-1].trim();
			
			gr_regras[i][j] = regras[j-1];
		}
		
		i++;
	});
	
	return false;
};