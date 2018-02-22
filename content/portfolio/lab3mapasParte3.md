+++ 
showonlyimage = false 
draft = false
image = "/portfolio-vis/static/img/portfolio/nov_dez_percentil.png" 
date = "2017-11-14T18:25:22+05:30" 
title = "Lab 3 Parte 3 - Crescimento do aprendizado Entre 2011 e 2013" 
weight = 0 
+++

<style>

.cidades {
  fill: none;
  stroke: #fff;
  stroke-linejoin: round;
}

path:hover, path.highlighted {
  fill: tomato;
}

div.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  color: black;
  font-family:"avenir next", Arial, sans-serif;
  padding: 4px 8px;
  display: none;
}

</style>

<div class="container">
	<div id="content">
  		<svg width="1000" height="600"></svg>
  	</div>
  <p>
    Comparando os dados dessa visualização com a anterior, podemos perceber a adequação do aprendizado é mais uniforme no <br>
    estado da Paraíba, estando entre 20 e 30% em grande parte das regiões. Essa uniformidade pode ser causada pela escala <br>
    utilizada na visualização original. Já o crescimento entre 2011 e 2013 apresenta menor uniformidade, o que talvez também <br>
    seja causado pela escala utilizada. É possível notar que as cidades que tiveram maior crescimento no período citado possuem <br>
    maior adequação do aprendizado.
  </p>
</div>


<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://d3js.org/topojson.v2.min.js"></script>
<script src="/portfolio-vis/static/js/legenda-d3-cor.js"></script>
<script>

const crescMin = -27.47;
const crescMax = 52.8;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var path = d3.geoPath();

// a escala de cores
const color = d3.scaleSequential(d3.interpolateRdYlBu).domain([crescMin,  crescMax]);

// função aux definida em legenda-d3-cor.js
desenhaLegendaDivergente(crescMin, crescMax, 0.01, color, "Crescimento entre 2011 e 2013 (pp*)")

d3.queue()
    .defer(d3.json, "/portfolio-vis/static/data/geo4-municipios-e-aprendizado-simplificado.json")
    .await(ready);

function ready(error, dados) {
  if (error) throw error;

  var cidades = dados.features;

  svg.append("g")
      .attr("class", "cidades")
    .selectAll("path")
    .data(cidades)
    .enter()
    .append("path")
      .attr("fill", d => {valor = d.properties["Crescimento entre 2011 e 2013 (pp*)"]; return valor === "NA" ? '#e0e0eb' : color(valor)})
      .attr("d", path)
      .on("mouseover",showTooltip)
      .on("mousemove",moveTooltip)
      .on("mouseout",hideTooltip)
}

// ZOOM

//create zoom handler
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

//specify what to do when zoom event listener is triggered
function zoom_actions(){
 d3.selectAll("path").attr("transform", d3.event.transform);
}

//add zoom behaviour to the svg element
//same as svg.call(zoom_handler);
zoom_handler(svg);


// TOOLTIP

//Create a tooltip, hidden at the start
var tooltip = d3.select("#content").append("div").attr("class","tooltip");
//Position of the tooltip relative to the cursor
var tooltipOffset = {x: 5, y: -25};

function showTooltip(d) {
  moveTooltip();

  var text = d.properties.Cidade;
  if(!d.properties["Crescimento entre 2011 e 2013 (pp*)"] || d.properties["Crescimento entre 2011 e 2013 (pp*)"] === 'NA') text = "Sem dados";
  else text += ": " + d.properties["Crescimento entre 2011 e 2013 (pp*)"] + "%";

  tooltip.style("display","block")
      .text(text);
}

//Move the tooltip to track the mouse
function moveTooltip() {
  tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
      .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
  tooltip.style("display","none");
}

</script>