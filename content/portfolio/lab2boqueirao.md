+++ 
showonlyimage = false 
draft = false
image = "/portfolio-vis/static/img/portfolio/visualizacao_anual.png" 
date = "2017-11-14T18:25:22+05:30" 
title = "Lab 2 Visualização da Informação 2017.2" 
weight = 0 
+++

<script src="https://d3js.org/d3.v4.min.js"></script>

<div class="container">
    <div class="row">
      <h2>Pontos com dados vindos de uma url</h2>
    </div>
    <div class="row mychart" id="chart">
    Pontos Azuis: Meses chuvosos<br/>
    Pontos dourados: Meses não chuvosos
    (tentei usar labels que apareciam com hover como pode ser visto no código, mas não consegui.)
    </div>
</div>

<style>
.chuvoso {
    fill: steelblue;
}

.nao-chuvoso {
    fill: goldenrod;
}

.mychart rect:hover {
    fill: goldenrod;
}

.mychart text {
    font: 12px sans-serif;
    text-anchor: left;
}

.label-meses {
  display: none;
}

.label-meses:hover {
  display: inline-block;
  font: 12px sans-serif;
  text-anchor: left;
}

</style>

<script type="text/javascript">
    "use strict"

    function desenhaGrafico(dados) {
       var alturaSVG = 400, larguraSVG = 900;
       var	margin = {top: 10, right: 20, bottom:30, left: 45},
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

          var grafico = d3.select('#chart')
              .append('svg')
                .attr('height', alturaSVG)
                .attr('width', larguraSVG)
              .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.right})`);

          var alturaCirculos = alturaVis / 2;
      const FEVEREIRO = 2, AGOSTO = 8;

      /*
       * As escalas
       */
      const noventaPercentis = dados.map((dado) => dado['noventa-percentil']);
      var x = d3.scaleLinear().domain([d3.min(noventaPercentis), d3.max(noventaPercentis)]).range([0, larguraVis]);

      const dezPercentis = dados.map((dado) => dado['dez_percentil']);
      var y = d3.scaleLinear().domain([d3.max(dezPercentis), d3.min(dezPercentis)]).range([0, alturaVis]);

      var containerCirculos = grafico.selectAll('g')
               .data(dados)
               .enter().append('g');

      containerCirculos.append('circle')
                   .attr('cx', d => x(d['noventa-percentil'])) 
                   .attr('cy', d => y(d['dez_percentil']))
                   .attr('r', 5)
                   .attr('class', d => d.mes >= FEVEREIRO && d.mes <= AGOSTO? 'chuvoso' : 'nao-chuvoso');

      containerCirculos.append('text')
              .attr('dx', d => x(d['noventa-percentil']))
              .attr('dy', d =>y(d['dez_percentil']))
              .attr('class', 'label-meses')
              .text(d=>d.mes >= FEVEREIRO && d.mes <= AGOSTO? 'Mês chuvoso' : 'Mês não chuvoso');

      grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(x)); 

      grafico.append('g')
              .attr('transform', 'translate(0,0)')
              .call(d3.axisLeft(y))

      grafico.append("text")
        .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
        .text("Dez-percentil");

      grafico.append("text")
        .attr("transform", `translate(${(larguraVis + margin.left + margin.right)/2}, ${alturaVis})`)
        .text("Noventa-percentil");
    }

    d3.json('/portfolio-vis/static/data/boqueirao-por-mes.json', function(dados) {
      desenhaGrafico(dados);
    });
  </script>
