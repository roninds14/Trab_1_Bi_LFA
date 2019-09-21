<div class="enclausurebody enclausure pagebody">
  <section class="sectionwrapper">        
    <div class="clearfix contentwrapper no-js">
      <section class="principal">
        <div>
          <div class="sigma">
            <h4>Alfabeto</h4>            
            <input class="main" type="text" name="alfabeto" placeholder="Sem espaco" value="" />               
            <div class="sigmago">Criar</div>
          </div>

          <div class="tbl" style='display: none;'>
            <h4>Estados do Autômato</h4>
            
            <div class="starterq">                  
            </div>

            <div>
              <table cellpadding="0" cellspacing="0" border="0" id="estados"></table>
              <button class="btn btn-dark">Adicionar Estado</button>
            </div>
          </div>

          <div class="avaliar" style="display: none;">
            <h4>String a ser Avaliada</h4>
            <input class="main" type="text" name="strvalidate" placeholder="String a ser Verificada" />
            <div class="string">Verificar</div>
          </div>
        </div>

        <div class='resultado'></div>

        <div class='automato' style="display: none;">
          <canvas></canvas>

          <div class="passo">
            <button class="passos prev btn btn-dark"> Passo Anterior</button>
            <button class="passos next btn btn-dark">Proximo Passo </button>
          </div>
        </div>

        <article></article>            
      </section>
    </div>
  </section>      
</div>