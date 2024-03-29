(function (window, $, xlog) {
  window.lfa = function(){        
    this.dts = {
      nfa: false,
      
      /* NUL AQUI SIGNIFICA EPSON */
      abto: ["0", "1", 'ε'],

      /* NULL AQUI SIGNIFICA QUE NAO VAI PARA DESTINO ALGUM */
      destinos: [
        [0, [0,1], null],
        [2, null, 2],
        [null, 3, null],
        [3, 3, null]
      ],
      start:0,
      finais: [3],
      steps:[[]]
    };

    this.getDT = function(){
      return this.dts;
    };    
      
    this.inAbto = function(chr){
      var chrIndex = this.dts.abto.indexOf(chr);

      if (chrIndex < 0){        
        var num = /[\d]/.test(chr);
        var alpha = /[a-zA-Z]/.test(chr);

        if (num){          
          chrIndex = this.dts.abto.indexOf('Δ');
        }else if (alpha){          
          chrIndex = this.dts.abto.indexOf('α');
        }

        if ( (chrIndex < 0) && (num || alpha) ){       
          chrIndex = this.dts.abto.indexOf('ω');
        }
      }   

      return chrIndex;
    };    

    this.match = function(dtsOuStr, str, callback){
      function inAbto(chr, dts){
        var chrIndex = dts.abto.indexOf(chr);

        if (chrIndex < 0){
          var num = /[\d]/.test(chr);
          var alpha = /[a-zA-Z]/.test(chr);

          if (num){
            chrIndex = dts.abto.indexOf('Δ');
          }else if (alpha){
            chrIndex = dts.abto.indexOf('α');
          }

          if ( (chrIndex < 0) && (num || alpha) ){
            chrIndex = dts.abto.indexOf('ω');
          }
        }   

        return chrIndex;
      }
      
      /*
       * ADICIONA UM ESTADO A UMA COLUNA (ST)
       * APENAS SE ELE JAH NAO TIVER SIDO INCLUIDO
       */
      function addST(dts, st, index, callback){
        /*
         * ADICIONA UM ESTADO (NUMERO) AO PASSO CUJO INDICE EH "INDEX"
         * APENAS SE ELE JAH NAO TIVER SIDO INCLUIDO
         */
        function add(dts, st, index, callback){
          if ((st !== null) && (typeof st === "number") && (st >= 0) && (dts.steps[index].indexOf(st) < 0)){
            dts.steps[index].push(st);

            if (typeof callback === "function"){
              callback(st, index);
            }
          }

          return dts;
        };

        if (st !== null){
          if ((Array.isArray(st)) && (st.length > 0)){            
            for (var i = 0; i < st.length; i++){
              dts = add(dts, st[i], index, callback);
            }

          }else{
            dts = add(dts, st, index, callback);
          }
        }

        return dts;
      };

      /*
       * PERCORRE A COLUNA (PASSO) ATUAL E, PARA CADA STADO QUE HOUVE UMA
       * TRANSICAO EPSON, ADICIONA O ESTADO DESTINO NA COLUNA (PASSO) ATUAL
       */
      function expandEpsilon(dts, callback){
        function callEp(st, index){          
          callback(null, index, i, null, destino, (dts.finais.indexOf(destino)>=0), 0);
        }

        /* VERIFICA SE EXISTE NO ALFABETO O UPSILON */
        var epsilonIndex = dts.abto.indexOf("ε");

        if (epsilonIndex >= 0){
          /* OBTEM A ULTIMA ETAPA PARA O EXPANDIR */
          var stepAtual = dts.steps.length-1;                              

          for (var i = 0; i < dts.steps[stepAtual].length; i++){
            /* SE EXISTIR AO MENOS UM DESTINO EM EPSILOON, ENTAO EH NFA
             * A VERIFICAO EH FEITA AQUI, PQ MESMO QUE O ALFABETO INCLUA O EPSSILON
             * SE NAO HOUVER USO DELE NAO NFA
             */            
            dts.nfa = true;            
            
            /* UM ESTADO A SER EXPANDIDO */
            var estado = dts.steps[stepAtual][i];

            /* OBTEM O DESTINO DA TRANSICAO UPSILON */
            var destino = dts.destinos[estado][epsilonIndex];

            /* SE HOUVER UM DESTINO VÁLIDO */
            xlog("@ EXPANDINDO EPSILONS:");
            dts = addST(dts, destino, stepAtual, callEp);            
          }
        }

        return dts;
      };

      /*
       * 1. CRIA UMA NOVA COLUNA (PASSO)
       * 2. VARRE A COLUNA (PASSO) ATUAL, PASSANDO POR CADA UM DOS ESTADOS E
       *    PARA CADA "ESTADO" EXISTENTE NA NOVA COLUNA, VERIFICA A TRANCICao
       *    "CHR" E ADICIONA OS ESTADOS DESTINOS NA NOVA COLUNA (PASSO)
       *
       * IGNORA AS TRANSICOES EPSON, JÁ QUE O PROCESSAMENTO DAS MESMAS DEVE SER
       * REALIZADO POR "expandEpsilon"
       */
      function processStep(chr, dts, callback){
        /* CALBACK DE RETORNO PARA DESTINO UNICO */
        function callbAdd(st, index){
          xlog("  - ADDED: q" + st);

          if (typeof callback === "function"){
             callback(chr, index, null, null, st, (dts.finais.indexOf(destino)>=0), 2);
          }
        };

        /* CALBACK DE RETORNO PARA DESTINO MULTIPLO */
        function callbAddMulti(st, index){
          xlog("  - ADDED-MULTI: q" + st);

          if (typeof callback === "function"){
             callback(chr, index, null, null, st, (dts.finais.indexOf(destino)>=0), 2);
          }
        };

        /* SE DIGITO FOR VALIDO ENTAO PROCESSA-LO */
        if ((chr!==null)&&(typeof chr === "string")&&(chr.length>0)){
          /* OBTEM O INDICE DA TRANSICAO NO ALFABETO */                    
          var chrIndex = inAbto(chr, dts);
        
          if (chrIndex >= 0){
            var stepAtual = dts.steps.length-1;

            dts.steps.push([]);
            var newStep = stepAtual + 1;

            xlog("PASSO =========== Atual: " + stepAtual + ", Novo: " + newStep + "  || Digito: " + chr);
            for (var i = 0; i < dts.steps[stepAtual].length; i++){
              var estado = dts.steps[stepAtual][i];
              xlog("# ORIGEM: q" + estado);

              if ((estado !== null) && (typeof estado === "number") && (estado >= 0)){
                /* OBTEM O DESTINO DA TRASICAO (chr) DESTE ESTADO */
                var destino = dts.destinos[estado][chrIndex];
                
                xlog("# DESTINO: q" + destino);

                if (destino !== null){
                  dts = addST(dts, destino, newStep, ((Array.isArray(destino))?callbAddMulti:callbAdd));
                }
              }else{
                throw "[ERRO] Estado invalido presente na sequencia.";
              }
            }
          }
        /* SE DIGITO FOR INVALIDO INICIALIZA */
        }else {
          xlog("Inicializando");
          dts.start = ((""+dts.start).length <= 0) ? 0 : parseInt(dts.start);

          if (dts.start >= dts.destinos.length){
            throw "[ERRO] o Estado Inicial selecionado ("+dts.start+") é superior ao estado amior ("+(dts.destinos.length-1)+")";
          }

          dts.steps = [[dts.start]];

          if (typeof callback === "function"){
             callback(null, 0, null, null, dts.start, (dts.finais.indexOf(dts.start)>=0), 2);
          }
        }

        return dts;
      };

      /*
       * PROCESSAMOS OS EPSILONS
       */
      function processEpsilons(c, dts, callback){
        /* EXPAND OS EPSON */
        dts = expandEpsilon(dts, (callback));

        if (typeof callback === "function"){
          callback(c, dts.steps.length-1, i, null, null, null, 1);
        }

        return dts;
      };

      /*
       * PROCESSAMOS O CARACTERE C, DOS DADOS "DTS" CHAMANDO CALLBACK
       * PARA O PROCESSAMENTO
       */
      function processChars(c, dts, callback){        
        this.dts = processStep(c, dts, callback);
        
        if (typeof callback === "function"){
          callback(c, dts.steps.length-1, i, null, null, null, 3);
        }

        return dts;
      };

      function iniciaDestinos(dts){
        var rg = /^(\s*[0-9]+(\s*[,\.\-]\s?[0-9]+)*\s*)?$/;

        for (var i = 0; i < dts.destinos.length; i++){
          for (var j = 0; j < dts.destinos[i].length; j++){
            var d = (""+dts.destinos[i][j]).replace(/[^0-9,\.\-]/g, '');

            if (!rg.test(d)){
              throw "[ERRO] O estado q"+i+" possui uma transicao ["+j+"] cujo destino nao é aceito '"+d+"'.";
            }

            if (d.length > 0){
              d =  (/^[0-9]$/.test(d)) ? parseInt(d) : JSON.parse("["+d.replace(/[\.\-]/g, ',')+"]");
            }else{
              d = null;
            }

            if ((typeof d === 'object') || (Array.isArray(d))){
              dts.nfa = true;
            }

            dts.destinos[i][j] = d;
          }
        }

        return dts;
      };
      
      this.nfa = false;

      /* INICIALIZANDO PARAMETROS */
      str       = ((typeof str === "string") && (str.length > 0)) ? str : dtsOuStr;
      this.dts  = processStep(null, iniciaDestinos((typeof dtsOuStr === "object") ? dtsOuStr : this.dts), (callback));            

      /* POR PADRAO CONSIDERA QUE NAO HAVERA DIGITOS INVALIDOS */
      var invalidDigit = false;

      /*
       * PERCORREMOS A STRING DIGITO POR DIGITO
       */
      for (var i = 0; i < str.length; i++) {
        /* EXPAND OS Epsilon DO PASSO ATUAL, ANTES DE PROCESSAR AS TRANSICOES */
        this.dts =  processEpsilons(str[i], this.dts, callback);

        /*
         * SE O DIGITO A SER ANALISADO NAO FOR UM DIGITO VALIDO NO ALFABETO
         * SIGMA ENTAO ABORDAMOS
         */
        if (inAbto(str[i], this.dts) < 0){
          invalidDigit = true;

          /* AQUI CRIAMOS O PROXIMO PASSO, QUE SERAH VAZIO, JAH QUE ABORTAMOS */
          this.dts.steps.push([]);

          break;
        }else{
          /* PROCESSANDO CARACTERE */
          this.dts =  processChars(str[i], this.dts, callback);
        }
      }

      /* EXPANCAO FINAL DOS Epsilon
       * NECESSARIO, UMA VEZ QUE UMA DAS ESPANCOES PODE SER FINAL
       */
      this.dts =  processEpsilons(str[i], this.dts, callback);

      /*
       * SE NAO HOUVE DIGITO INVALIDO VERIFICAMOS SE HA ALGUM ESTADO FINAL
       * NO PASSO FINAL
       */
      if (!invalidDigit){
        var final = false;
        for (var i = 0; i < this.dts.finais.length; i++){
          if (this.dts.steps[this.dts.steps.length-1].indexOf(this.dts.finais[i]) >= 0){
            final = true;

            break;
          }
        }
      }else{
        /* HOUVE DIGITO INVALIDO, APENAS DEVOLVEMOS */
        final = false;
      }

      xlog(":::::::");

      if (final){
        xlog("= String Aceita");
      }else{
        xlog("= String NÃO Aceita");
      }

      return final;
    };
  };
})(window, (typeof jQuery === "object" ? jQuery : Zepto), function(t){
  console.log(t);
});