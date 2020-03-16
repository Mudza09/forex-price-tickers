// let pairCode = "GBPUSD"
let pairCode = $(".pair").text()
let prefixCode = pairCode.slice(0,-3)
let suffixCode = pairCode.slice(3)
let recentPrice = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol="+prefixCode+"&to_symbol="+suffixCode+"&apikey=61P3146SAX7BJHRW";

function fetchData(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            // fetch price value
            let lastRefreshed = data['Meta Data']['5. Last Refreshed'].slice(0,-9)
            let closePrice = data['Time Series FX (Daily)'][lastRefreshed]['4. close']
            let openPrice = data['Time Series FX (Daily)'][lastRefreshed]['1. open']

            // percent calculation                
            let changePercent = 100 - (openPrice * 100 / closePrice);
            let roundPercent = changePercent.toString().substr(0, changePercent.toString().length - 14);
            
            if (closePrice > openPrice) {
                $('.uk-label').addClass('price-up')
                $('.percent').html(roundPercent).prepend('(','+').append("%",")")
            } else if (closePrice < openPrice) {
                $('.uk-label').addClass('price-down')
                $('.percent').html(roundPercent).prepend('(' ).append("%",")")
            } else {
                $('.percent').html(roundPercent).prepend('(','0').append( "%",")" )
            }

            $('.pair').html(pairCode);
            $('.price').html(closePrice);
        }
    });
}

$(document).ready(function () {
    $(".currency-price").show();
        fetchData(recentPrice);    
});