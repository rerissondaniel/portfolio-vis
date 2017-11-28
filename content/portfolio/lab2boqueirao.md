+++ 
showonlyimage = false 
draft = false
image = "/portfolio-vis/static/img/portfolio/visualizacao_anual.png" 
date = "2017-11-29T18:25:22+05:30" 
title = "Lab 2 Visualização da Informação 2017.2" 
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

    function desenhaGrafico(dados) {
       var alturaSVG = 400, larguraSVG = 900;
       var	margin = {top: 10, right: 20, bottom:30, left: 45}, // para descolar a vis das bordas do grafico
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

        var alturaCirculos = alturaVis / 2;

          var grafico = d3.select('#chart')
              .append('svg')
                .attr('height', alturaSVG)
                .attr('width', larguraSVG)
              .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.right})`);


      /*
       * As escalas
       */
      var x = d3.scaleLinear().domain([0, 12]).rangeRound([0, larguraVis]);
 
      var rDezPercentil = d3.scaleLinear().domain([0, d3.max(dados, (d) => d['dez_percentil'])]).range([1, larguraVis / 12]);
      var rNovPercentil = d3.scaleLinear().domain([0, d3.max(dados, (d) => d['noventa-percentil'])]).range([1, larguraVis / 12]);

    /* As marcas*/
      grafico.selectAll('g')
              .data(dados)
              .enter()
                .append('circle')//Círculo do noventa percentil
                  .attr('cx', d => x(d.mes)) 
                  .attr('cy', d => alturaCirculos)
                  .attr('r', (d) => rNovPercentil(d))
                .append('circle')//Círculo do dez percentil
                  .attr('cx', d => x(d.mes))
                  .attr('cy', d => alturaCirculos)
                  .attr('r', (d) =>  rDezPercentil(d));

      /*
      //  * As marcas
      //  */
      // grafico.selectAll('g')
      //         .data(dados)
      //         .enter() 
      //           .append('circle')
      //             .attr('x', d => x(d.letra))   // usando a escala definida acima
      //             .attr('width', x.bandwidth()) // largura da barra via escala
      //             .attr('y', d => y(d.valor))
      //             .attr('height', (d) => alturaVis - y(d.valor)); // de cabeca para baixo

      /*
       * Os eixos
       */
      grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(x)); // magica do d3: gera eixo a partir da escala

      // grafico.append("text")
      //   .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
      //   .text("Frequencia");
    }

    d3.json('/portfolio-vis/static/data/boqueirao-por-mes.json', function(dados) {
      desenhaGrafico(dados);
    });
  </script>