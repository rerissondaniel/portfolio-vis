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
      <div id="chart-gen-hor"></div>
      Como podemos perceber, o horário de pico de ambos os sexos são entre as 7:00 - 8:00 da manhã e 17:00 - 18:00 da tarde, horários em que é comum a prática de exercícios físicos. Clique na linha que quer destacar. Para restaurar o gráfico, clique com o botão direito sobre o mesmo.
      <div id="chart-gen-meio-transporte"></div>
      Aqui percebemos que a maior parte das mulheres que estiveram no açude estavam a pé, assim como os homens. Apesar disso, é possível também enxergar uma grande discrepância entre o número de mulheres ciclistas e pedestres, algo que ocorre em menor escala quando comparamos os homens.

      <div id="chart-gen-lugar"></div>
</div>

<style>

#chart-gen-hor{
  overflow: hidden;
}

.linha-homem{
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}

.linha-homem:hover{
    pointer-events: visible;
    cursor: pointer;
}

.linha-mulher:hover{
    pointer-events: visible;
    cursor: pointer;
}

.linha-mulher{
    stroke: purple;
    stroke-width: 2;
    fill: none;
}

.barra-homem{
  fill: steelblue;
}

.barra-mulher{
  fill: purple;
}

.line-tooltip-holder{
  opacity: 0.3;
}

div.tooltip {
  position: absolute;
  text-align: center;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
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

        dados = processaDados(dados);
        const labels = ['Mulheres Ciclistas',  'Mulheres Pedestres', 'Homens Ciclistas', 'Homens Pedestres'];

        const x = d3.scaleBand().domain(labels).rangeRound([0, larguraVis]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(dados)]).range([0, alturaVis]);

        grafico.selectAll('g')
              .data(dados)
              .enter()
                .append('rect') 
                  .attr('x', (d, i) => x(labels[i]))
                  .attr('width', x.bandwidth())
                  .attr('y', d => alturaVis - y(d))
                  .attr('height', (d) => y(d))
                  .attr('class', (d, i) => i < 2 ? 'barra-mulher' : 'barra-homem');

        grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(x));

        const qtdEixo = d3.scaleLinear().domain([d3.max(dados), d3.min(dados)]).range([0, alturaVis]);
        grafico.append('g')
              .attr('transform', 'translate(0,0)')
              .call(d3.axisLeft(qtdEixo))


    }

    function desenhaGraficoGeneroHorario(dados) {
       var alturaSVG = 400, larguraSVG = 900;
       var	margin = {top: 10, right: 20, bottom:30, left: 45},
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

      const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', function(){
              svg.attr('transform', d3.event.transform);
            });

      var svg =  d3.select('#chart-gen-hor')
          .append('svg')
            .attr('height', alturaSVG)
            .attr('width', larguraSVG)
            .call(zoom).on('contextmenu', () => {
                d3.event.preventDefault();
                mostraElementosHomem();
                mostraElementosMulher();
                svg.transition()
                  .duration(750)
                  .call(zoom.transform, d3.zoomIdentity);

            });

      var grafico = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.right})`)
        
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

      function esconderElementosMulher(){
        d3.select('.linha-mulher').attr('display', 'none');
        d3.selectAll('.circulo-mulher').attr('display', 'none');
      }

      function esconderElementosHomem(){
        d3.select('.linha-homem').attr('display', 'none');
        d3.selectAll('.circulo-homem').attr('display', 'none');
      }

      function mostraElementosHomem(){
        d3.select('.linha-homem').attr('display', 'inline');
        d3.selectAll('.circulo-homem').attr('display', 'inline');
        
      }

      function mostraElementosMulher(){
        d3.select('.linha-mulher').attr('display', 'inline');
        d3.selectAll('.circulo-mulher').attr('display', 'inline');
      }
      
      var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      const horasComoInt = dados.map((dado) => horaComoInt(dado.horario));
      const x = d3.scaleLinear().domain([d3.min(horasComoInt), d3.max(horasComoInt)]).rangeRound([0, larguraVis]).clamp(true);
      
      const homens = dados.map((dado) => dado.homens);
      const yHomem = d3.scaleLinear().domain([d3.max(homens), d3.min(homens)]).range([0, alturaVis]);
      
      const mulheres = dados.map((dado) => dado.mulheres);
      const yMulher = d3.scaleLinear().domain([d3.max(mulheres), d3.min(mulheres)]).range([0, alturaVis]);


      var containerCirculos = grafico.selectAll('g')
               .data(dados)
               .enter().append('g');

      //Círculos para os tooltips dos homens
      containerCirculos.append('circle')
                         .attr('r', 5)
                         .attr('cx', (d) =>x(horaComoInt(d.horario)))
                         .attr('cy', (d) => yHomem(d.homens))
                         .attr('class', 'line-tooltip-holder circulo-homem')
                         .on('mouseover', (d) => {
                            div.transition()
                              .duration(50)
                              .style('opacity', .9)
                              .style('background', 'lightsteelblue');
                            div.html((d.horario) + "<br/>" + d.homens + ' homens')
                              .style('left', (d3.event.pageX) + 'px')
                              .style('top', (d3.event.pageY - 28) + 'px');
                          }).on('mouseout', function(d) {   
                             div.transition()    
                              .duration(300)    
                              .style("opacity", 0); 
                          });

      //Círculos para os tooltips das mulheres
      containerCirculos.append('circle')
                         .attr('r', 5)
                         .attr('cx', (d) =>x(horaComoInt(d.horario)))
                         .attr('cy', (d) => yMulher(d.mulheres))
                         .attr('class', 'line-tooltip-holder circulo-mulher')
                         .on('mouseover', (d) => {
                            div.transition()
                              .duration(50)
                              .style('opacity', .9)
                              .style('background', '#ba00db');
                            div.html((d.horario) + "<br/>" + d.homens + ' mulheres')
                              .style('left', (d3.event.pageX) + 'px')
                              .style('top', (d3.event.pageY - 28) + 'px');
                          }).on('mouseout', function(d) {   
                             div.transition()    
                              .duration(300)    
                              .style("opacity", 0); 
                          });

      grafico.append('path')
                         .attr('d', d3.line().x((d) =>x(horaComoInt(d.horario))).y((d) => yHomem(d.homens))(dados)) 
                         .attr('class', 'linha-homem')
                         .on('mousedown', esconderElementosMulher);
      
      grafico.append('path')
                          .attr('d', d3.line().x((d) =>x(horaComoInt(d.horario))).y((d) => yMulher(d.mulheres))(dados)) 
                          .attr('class', 'linha-mulher')
                          .on('mousedown', esconderElementosHomem);
        
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
