<!DOCTYPE html>
<html lang="pt">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <link rel="stylesheet" href="assets/css/main.css"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style type="text/css">
    	#regExp, #regExpText{
			text-align:center;
			font-weight:700;
		}
		input{
			text-align:center;
		}						
    </style>

    <title>LFA Trab. B1</title>
</head>
<body style="background-color:#ddd">
    <nav class="navbar navbar-dark bg-dark justify-content-center mb-5 text-white">
        <h2>Trabalho 1º Bimestre</h2>
    </nav>

    <section class="container">
        <div id="accordion">
        	<div class="card">
        		<div class="card-header bg-dark text-center" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                	<h5 class="text-white">Expressão Regular</h5>
        		</div>
        
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <div class="row pl-5 pr-5">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="regExp">Expressão Regular</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                        	<span class="input-group-text"><strong>&circ;</strong></span>
                                        </div>
                                        <input type="text" class="form-control" id="regExp" aria-label="regExp">
                                        <div class="input-group-prepend">
                                        	<span class="input-group-text"><strong>$</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                            <div class="col-6">
                            	<div class="form-group">
                                    <label for="regExp">Texto</label>
                                    <input type="text" id="regExpText" class="form-control"/>
                                </div>                            
                            </div>
                            <div class="col-4 offset-4 justify-content-center">
                            	<div class="btn btn-success btn-block mb-3 salvar" data-tipo="ER">Salvar</div>
                                
                                <a id = "d_ER" class="btn btn-info btn-block mb-3 justify-content-center download" target="_blank" style="display:none">Download</a>
                            </div>
                            <div class="col-6 offset-3">
                            	<div class="form-group">
                                    <label for="expRegExp">Pré-definidos</label>
                                    <select id="expRegExp" class="form-control">
                                    	<option value="\w">Selecione</option>
                                        <option value="([1-9]|0[1-9]|[1,2][0-9]|3[0,1])/([1-9]|1[0,1,2])/\d{4}">Data (dd/mm/aaaa)</option>
                                        <option value="\d*[0-9](\.\d*[0-9])?">Numero Decimal</option>
                                        <option value="[a-zA-Z0-9-_\.]+\.(pdf|txt|doc|csv)">Arquivos Documentos</option>
                                        <option value="([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+">E-mail</option>
                                        <option value="#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?">Codigo Cor HTML</option>
                                        <option value="a-zA-Z0-9-_\.]+\.(jpg|gif|png)">Arquivo de Imagem</option>
                                        <option value="((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})">Endereco IP</option>
                                        <option value="[a-zA-Z0-9-_\.]+\.(swf|mov|wma|mpg|mp3|wav)">Arquivos Multimedia</option>
                                        <option value="\d{4}-(0[1-9]|1[0,1,2])-(0[1-9]|[1,2][0-9]|3[0,1])">Data Formato Mysql</option>
                                        <option value="\(?\d{2}\)?[\s-]?\d{4}-?\d{4}">Telefone (BR)</option>
                                        <option value="([A-Z][0-9]){3}">Codigo Postal (EUA)</option>
                                        <option value="([0-1][0-9]|[2][0-3])(:([0-5][0-9])){1,2}">Hora (HH:MM)</option>
                                        <option value="(http[s]?://|ftp://)?(www\.)?[a-zA-Z0-9-\.]+\.(com|org|net|mil|edu|ca|co.uk|com.au|gov|br)">URL</option>
                                        <option value="(([0-9]{1})*[- .(]*([0-9a-zA-Z]{3})*[- .)]*[0-9a-zA-Z]{3}[- .]*[0-9a-zA-Z]{4})+">Telefone Internacional</option>
                                    </select>
                                </div> 
                            </div>                                                      
                        </div>       
                    </div>
                </div>
            </div>
        	<div class="card">
        		<div class="card-header bg-dark text-center" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        			<h5 class="text-white">
       					Autômato finito não deterministico
        			</h5>
        		</div>
        		<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        			<div class="card-body">
        				<?php //require_once "parte_dois.php" ?>
                                                    <div class="row">
						<div class="col-5 offset-3">
							<div class="form-group">
								<label for="alfab">Alfabeto</label>
								<input type="text" id="alfab" class="form-control" placeholder="Sem espaço"/>
							</div> 
						</div>
						<div class="col-1 pt-4">
							<button type="button" id="gera_tabela" class="btn btn-outline-info">
								<i class="material-icons">send</i>
							</button>
						</div>
					</div>                       
					<div class="row justify-content-center" style="display:none">
						<div class="col-9 offset-3">
							 <label>Estados Autômatos</label>
						</div>  
						<table id="tb_estado" class="table w-75" style="margin:auto">
							<thead class="thead-dark">
								<tr>
									<th>Estado</th>
									<th>final</th>                                        
								</tr>
							</thead>
							<tbody>                                	
							</tbody>
						</table>
						<div class="col-12 text-center mt-2">
							<button id="add_estado" class="btn btn-primary">Adicionar Estado</button>
						</div>
                        <div class="col-12 text-center mt-2 mb-2">
                        	<button class="btn btn-success mt-2 mb-2 salvar" data-tipo="AF">Salvar</button>
                        </div>
					</div> 
					<div class="row" style="display:none">
						<div class="col-5 offset-3">
							<div class="form-group">
								<label for="string">String a ser avaliada</label>
								<input type="text" id="string" class="form-control"/>
							</div> 
						</div>
						<div class="col-1 pt-4">
							<button type="button" id="desenha" class="btn btn-outline-info">
								<i class="material-icons">send</i>
							</button>
						</div>
					   <div id="svg"></div>
					</div>                  
        			</div>
        		</div>
        	</div>
        	<div class="card">
        		<div class="card-header bg-dark text-center" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        			<h5 class="text-white">
                    	Gramáticas regulares
        			</h5>
        		</div>
        		<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                       <div class="row" >
                       		<div class="col-4">
                            	<div class="form-group">
                                    <label for="variaveis">Variáveis <small id="aviso_var" style="color:red"></small></label>
                                    <input type="text" id="variaveis" class="form-control" placeholder="Sem espaço"/>
                                </div> 
                            </div>
                            <div class="col-4">
                            	<div class="form-group">
                                    <label for="terminais">Terminais <small id="aviso_ter" style="color:red"></small></label>
                                    <input type="text" id="terminais" class="form-control" placeholder="Sem espaço"/>
                                </div> 
                            </div>
                            <div class="col-3">
                            	<div class="form-group">
                                    <label for="inicial">Inicial</label>
                                    <input type="text" id="inicial" class="form-control" placeholder="Sem espaço" maxlength="1"/>
                                </div> 
                            </div>
                            <div class="col-1 pt-4">
                            	<button type="button" id="btn_regras" class="btn btn-outline-info">
                                	<i class="material-icons">send</i>
                                </button>
                            </div>
                       </div>
                       <div class="row" style="display:none">
                       		<div class="col-8 offset-2">
                            </div>                            
                       </div>
                       <div class="row justify-content-center" style="display:none">
                       		<button class="btn btn-success salvar mt-3" data-tipo="GR">Salvar</button>
                           <div class="col-12"></div>
                            <a id = "d_GR" class="btn btn-info justify-content-center download mt-3" target="_blank" style="display:none">Download</a>
                       </div>
                       <div class="row mt-5" style="display:none">
                            <div class="col-7 offset-2">
                                <div class="form-group">
                                    <label for="string_gr">Digite uma string para validar</label>
                                    <input type="text" id="string_gr" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-1 pt-4">
                            	<button type="button" id="btn_valida_gr" class="btn btn-outline-info">
                                	<i class="material-icons">send</i>
                                </button>
                            </div>
                            <h4 class="col-12 text-center" id="resultado_gr"></h4>
                       </div>
        			</div>
        		</div>
        	</div>
        </div>    
    </section>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
    <script type="text/javascript" src="assets/js/lfa.min.js"></script>
    <script type="text/javascript" src="assets/js/draw.min.js"></script>
    <script type="text/javascript" src="assets/js/regex.min.js"></script>
    <script type="text/javascript" src="assets/js/main.min.js"></script>
    
    
    <script src="assets/js/script.js" type="text/javascript"></script>
</body>
</html>