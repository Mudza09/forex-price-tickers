function priceTicker(options) {
    this.defaults = {
        apiKey: '',                         // finnhub api key
        selector: '.forex-wrapper',         // selector that used display each forex prices
        childSelector: 'li',                // child selector used, 'li' or 'div' depend your parent selector
        pairs: [                            // currency pairs
            'XAUUSD', 
            'GBPUSD', 
            'EURUSD'
        ],
        upClass: 'price-up',                 // css class that used for bullish condition
        downClass: 'price-down',             // css class that used for bearish condition
        resolution: 'D',                     // candlestick interval '1, 5, 15, 30, 60, D, W, M'
        autoReload: false,                   // set auto reload data every interval time used
        interval: 60000                      // interval time in miliseconds (default is every 1 minutes)
    };

    // check if have settings by user, if none will use defaults
    this.options = {};
    for (let obj in this.defaults) {
        if (typeof(obj) !== 'undefined') {
            this.options[obj] = this.defaults[obj];
            if (options.hasOwnProperty(obj) && this.options.hasOwnProperty(obj))
                this.options[obj] = options[obj];
        }
    };

    // timestamp for forex url
    let subtract = 1;
    if (new Date().getDay() == 0 || new Date().getDay() == 1) subtract = 3
    let fromTime =  Math.trunc(new Date().setDate(new Date().getDate() - subtract)/1000);
    let toTime = Math.trunc(new Date()/1000);    

    // write currency pair list into DOM
    async function writePairlist() {
        const priceWrap = document.querySelector(this.options.selector);

        this.options.pairs.forEach(function(e) {
            const tickerPrice = document.createElement(this.options.childSelector);
            tickerPrice.innerHTML = `${e} <span class="uk-label">loading...</span>`;
    
            priceWrap.appendChild(tickerPrice);
        })
    };

    // get price data and insert into DOM function
    async function getPrice(pairsArray) {
        for (let i = 0; i < pairsArray.length; i++) {
            const pair = [pairsArray[i].substring(0,3), pairsArray[i].substring(3,6)];
            const forexUrl = `https://finnhub.io/api/v1/forex/candle?symbol=OANDA:${pair[0]}_${pair[1]}&resolution=${this.options.resolution}&from=${fromTime}&to=${toTime}&token=${this.options.apiKey}`;
            
            fetch(forexUrl)
            .then(response => response.json())
            .then(data => {
                const currentPrice = data['c'][data['c'].length - 1];
                const prevPrice = data['c'][0];

                // calculate percentage
                let percentage = (currentPrice - prevPrice)/currentPrice*100;
                percentage > 0
                    ? percentage = `+${percentage.toFixed(2)}%`
                    : percentage = `${percentage.toFixed(2)}%`;

                // up or down css conditional statement
                data['c'][0] < data['c'][data['c'].length - 1]
                    ? document.querySelectorAll('.uk-label')[i].classList.add(this.options.upClass) 
                    : document.querySelectorAll('.uk-label')[i].classList.add(this.options.downClass)

                // arrow up and down icons condition
                let arrow;
                data['c'][0] < data['c'][data['c'].length - 1]
                    ? arrow = '&#8599;' 
                    : arrow = '&#8600;'

                // insert current price and percentage into DOM
                document.querySelectorAll('.uk-label')[i].innerHTML = `${arrow} ${currentPrice} <small>${percentage}</small>`;
            });
        }
    };

    // remove up or down css condition function
    async function removeClass() {
        this.options.pairs.forEach(function(e, i) {
            document.querySelectorAll('.uk-label')[i].classList.remove(this.options.upClass)
            document.querySelectorAll('.uk-label')[i].classList.remove(this.options.downClass)
        })
    };

    // initialize all the functions
    writePairlist();
    getPrice(this.options.pairs);
    if (this.options.autoReload) setInterval(() => {
        removeClass();
        getPrice(this.options.pairs);
    }, this.options.interval);
};