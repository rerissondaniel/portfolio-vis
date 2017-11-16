const specVolAnual = "/portfolio-vis//visualizations/lab1/volume_anual.json";
vegaEmbed('#visualicacao-volume-anual', specVolAnual, {"actions" : false}).catch(console.warn);
const specVolMensalRacio = "/portfolio-vis/visualizations/lab1/volume_mensal_2012_2017.json";
vegaEmbed('#visualicacao-volume-racionamento', specVolMensalRacio, {"actions" : false}).catch(console.warn);
const specMedVolMensal = "/portfolio-vis//visualizations/lab1/media_volume_mensal.json";
vegaEmbed('#visualicacao-media-volume-mensal', specMedVolMensal, {"actions" : false}).catch(console.warn);