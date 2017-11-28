+++ 
showonlyimage = false 
draft = false
image = "/portfolio-vis/static/img/portfolio/visualizacao_anual.png" 
date = "2017-11-14T18:25:22+05:30" 
title = "Lab 1 Visualização da Informação 2017.2" 
weight = 0 
+++

<script src="https://d3js.org/d3.v4.min.js"></script>

<div class="container">
    <div class="row">
      <h2>Barras com dados vindos de uma url</h2>
    </div>
    <div class="row mychart" id="chart">
    </div>
</div>

<style>
.mychart rect {
    fill: steelblue;
}

.mychart rect:hover {
    fill: goldenrod;
}

.mychart text {
    font: 12px sans-serif;
    text-anchor: left;
}
</style>

<script type="text/javascript">
    "use strict"

    function desenhaBarras(dados) {
       var alturaSVG = 400, larguraSVG = 900;
       var	margin = {top: 10, right: 20, bottom:30, left: 45}, // para descolar a vis das bordas do grafico
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

          var grafico = d3.select('#chart')
              .append('svg')
                .attr('height', alturaSVG)
                .attr('width', larguraSVG)
              .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.right})`);


      /*
       * As escalas
       */
      var x = d3.scaleBand().domain(dados.map((dado) => dado.letra)).rangeRound([0, larguraVis]).padding(0.2);

      var y = d3.scaleLinear().domain([d3.max(dados.map((dado) => dado.valor)), 0]).rangeRound([0, alturaVis]);

      /*
       * As marcas
       */
      grafico.selectAll('g')
              .data(dados)
              .enter()
                .append('rect')
                  .attr('x', d => x(d.letra))   // usando a escala definida acima
                  .attr('width', x.bandwidth()) // largura da barra via escala
                  .attr('y', d => y(d.valor))
                  .attr('height', (d) => alturaVis - y(d.valor)); // de cabeca para baixo

      /*
       * Os eixos
       */
      grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(x)); // magica do d3: gera eixo a partir da escala

      grafico.append('g')
              .attr('transform', 'translate(0,0)')
              .call(d3.axisLeft(y))  // gera eixo a partir da escala

      grafico.append("text")
        .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
        .text("Frequencia");
    }

    d3.json('/portfolio-vis/static/data/boqueirao-por-mes.json', function(dados) {
      desenhaGrafico(dados);
    });
  </script>