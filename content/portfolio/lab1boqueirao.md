+++ 
showonlyimage = false 
draft = false
image = "/static/img/portfolio/visualizacao_anual.png" 
date = "2016-11-05T18:25:22+05:30" 
title = "Lab 1 Visualização da Informação 2017.2" 
weight = 0 
+++

<div>
	
</div>

<div id="visualicacao-volume-anual" width=300></div>
<div id="visualicacao-volume-racionamento" width=300></div>
<div id="visualicacao-media-volume-mensal" width=300></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>

<script>
    const specVolAnual = "/visualizations/lab1/volume_anual.json";
  	vegaEmbed('#visualicacao-volume-anual', specVolAnual, {"actions" : false}).catch(console.warn);
  	const specVolMensalRacio = "/visualizations/lab1/volume_mensal_2012_2017.json";
  	vegaEmbed('#visualicacao-volume-racionamento', specVolMensalRacio, {"actions" : false}).catch(console.warn);
  	const specMedVolMensal = "/visualizations/lab1/media_volume_mensal.json";
  	vegaEmbed('#visualicacao-media-volume-mensal', specMedVolMensal, {"actions" : false}).catch(console.warn);
 </script>