+++ 
showonlyimage = false 
draft = false
image = "/portfolio-vis/static/img/portfolio/nov_dez_percentil.png" 
date = "2017-11-14T18:25:22+05:30" 
title = "Um retrato do gênero dos Ocupantes do Açude Velho" 
weight = 0 
+++

<script src="https://d3js.org/d3.v4.min.js"></script>

<div class="container">
    <div class="row mychart" id="chart-gen-hor">
    
    </div>
    
    <div class="row mychart" id="chart-gen-meio-transporte">
        
    </div>
    
</div>

<style>

.linha-homem{
    stroke: green;
    stroke-width: 2;
    fill: none;
}

.linha-mulher{
    stroke: red;
    stroke-width: 2;
    fill: none;
}
</style>

<script type="text/javascript">
    "use strict"

    function desenhaBarrasGenTransp(dados){
        var alturaSVG = 400, larguraSVG = 900;
        var  margin = {top: 10, right: 20, bottom:30, left: 45},
            larguraVis = larguraSVG - margin.left - margin.right,
            alturaVis = alturaSVG - margin.top - margin.bottom;

        var grafico = d3.select('#chart-gen-meio-transporte')
            .append('svg')
              .attr('height', alturaSVG)
              .attr('width', larguraSVG)
            .append('g')
              .attr('transform', `translate(${margin.left}, ${margin.right})`);

        function processaDados(dados){
          var resultado = [0, 0, 0, 0];
          dados.forEach(dado => {
            //0 = mulheres ciclistas
            resultado[0] += Number(dado.mulheres_ciclistas);
            //1 = mulheres pedestres
            resultado[1] += Number(dado.mulheres_pedestres);
            //2 = homens ciclistas
            resultado[2] += Number(dado.homens_ciclistas);
            //3 = homens pedestres
            resultado[3] += Number(dado.homens_pedestres);
          });

          return resultado;
        }

        const dados = processaDados(dados);

        const x = d3.scaleBand().domain(['Homens Ciclistas', 'Mulheres Ciclistas', 'Homens Pedestres', 'Mulheres Pedestres']).rangeRound([0, larguraVis]).padding(1);
        const y = d3.scaleLinear(dados).domain();
    }

    function desenhaGraficoGeneroHorario(dados) {
       var alturaSVG = 400, larguraSVG = 900;
       var	margin = {top: 10, right: 20, bottom:30, left: 45},
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

      var grafico = d3.select('#chart-gen-hor')
          .append('svg')
            .attr('height', alturaSVG)
            .attr('width', larguraSVG)
          .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.right})`);
        
        

      function unique(a){
        return a.filter(function(item, i, ar){ return ar.indexOf(item) === i});      
      }

      function processaDados(dados){
        const horarios = unique(dados.map(dado => dado.horario_final));
        const result = [];
        horarios.forEach(function(horario){
            const dadosComHorario = dados.filter((item) => item.horario_final === horario);
            let dadoProcessado = {
                horario: horario,
                homens: 0,
                mulheres: 0            
            };
            dadosComHorario.forEach((dado)=> {
                 dadoProcessado.homens += (parseInt(dado.homens_ciclistas) + parseInt(dado.homens_pedestres));
                 dadoProcessado.mulheres += (parseInt(dado.mulheres_ciclistas) + parseInt(dado.mulheres_pedestres)); 
            });
            result.push(dadoProcessado);
        });
        
        return result;
      }
      
      dados = processaDados(dados);
      
      function apenasHoras(a){
        return a.filter((item) => item.endsWith("00"));
      };
      
      function horaComoInt(h){
        return parseInt(h.replace(':', ''));
      }
      
      const horasComoInt = dados.map((dado) => horaComoInt(dado.horario));
      const x = d3.scaleLinear().domain([d3.min(horasComoInt), d3.max(horasComoInt)]).rangeRound([0, larguraVis]).clamp(true);
      
      const homens = dados.map((dado) => dado.homens);
      const yHomem = d3.scaleLinear().domain([d3.max(homens), d3.min(homens)]).range([0, alturaVis]);
      
      const mulheres = dados.map((dado) => dado.mulheres);
      const yMulher = d3.scaleLinear().domain([d3.max(mulheres), d3.min(mulheres)]).range([0, alturaVis]);


      const containerCirculos = grafico.selectAll('g')
               .data(dados)
               .enter().append('g');
                   
      grafico.append('path')
                         .attr('d', d3.line().x((d) =>x(horaComoInt(d.horario))).y((d) => yHomem(d.homens))(dados)) 
                         .attr('class', 'linha-homem');
      
      grafico.append('path')
                          .attr('d', d3.line().x((d) =>x(horaComoInt(d.horario))).y((d) => yMulher(d.mulheres))(dados)) 
                          .attr('class', 'linha-mulher');
        
      const horas = apenasHoras(dados.map((dado) => (dado.horario)));
      const horasEixo = d3.scaleBand().domain(horas).rangeRound([0, larguraVis]);
      grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(horasEixo)); 
      
      const qtdEixo = d3.scaleLinear().domain([d3.max(homens.concat(mulheres)), d3.min(homens.concat(mulheres))]).range([0, alturaVis]);
      grafico.append('g')
              .attr('transform', 'translate(0,0)')
              .call(d3.axisLeft(qtdEixo))

      grafico.append("text")
        .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
        .text("Quantidade");
    }

    d3.csv('/portfolio-vis/static/data/acude-velho.csv', function(dados) {
      desenhaGraficoGeneroHorario(dados);
      desenhaBarrasGenTransp(dados);
    });
  </script>
