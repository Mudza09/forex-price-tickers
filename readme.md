Forex rates
=========

Javascript plugin for display current forex rates into the DOM, data provided from finnhub.io\
See demo : [https://mudza09.github.io/forex-rates/](https://mudza09.github.io/forex-rates/)

### HTML markup

Simply create an element that includes the class `forex-rates`

``` html
<ul class="forex-rates"></ul>
```
### CSS

Define the styling for up and down conditions

``` css
.forex-rates .price-up {
    color: green;
}
.forex-rates .price-down {
    color: red;
}
```

### JavaScript

Include this script tag into your HTML, get finnhub api key here : [https://finnhub.io/](https://finnhub.io/)

``` html
<script src='forex-rates.js'></script>
<script>
    forexRates({
        apiKey: 'yourfinnhubapikey',
        pairs: ['XAUUSD', 'GBPUSD', 'EURUSD']
    });
</script>
```

### Options

The options you can customize

``` js
forexRates({
    apiKey: 'yourfinnhubapikey',        // finnhub api key
    selector: '.forex-rates',           // selector that used display each forex prices
    childSelector: 'li',                // child selector used, 'li' or 'div' depend your parent selector
    pairs: [                            // currency pairs
        'XAUUSD', 
        'GBPUSD', 
        'EURUSD', 
        'AUDUSD', 
        'USDCAD', 
        'USDJPY',
        'USDCHF',
        'EURGBP'
    ],
    upClass: 'price-up',                 // css class that used for bullish condition
    downClass: 'price-down',             // css class that used for bearish condition
    resolution: 'D',                     // candlestick interval '1, 5, 15, 30, 60, D, W, M'
    autoReload: false,                   // set auto reload data every interval time used
    interval: 60000                      // interval time in miliseconds (default is every 1 minutes)
});
```