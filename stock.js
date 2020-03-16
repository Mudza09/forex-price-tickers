$(document).ready(function () {
    $(".currency-price").show();
    $(".pair-currency").each(function(e) {
        var pairItem = $(this);
        var pairCode = pairItem.find(".pair").text();
        
        // loop and retrive data 
        fetchData( pairItem, pairCode );
    });
});

// fetch data function
function fetchData(pairItem, pairCode) {
    var prefixCode = pairCode.slice(0,-3);
    var suffixCode = pairCode.slice(3);
    var url = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol="+ prefixCode +"&to_symbol="+ suffixCode +"&apikey=61P3146SAX7BJHRW";

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
                pairItem.find('.uk-label').addClass('price-up')
                pairItem.find('.percent').html(roundPercent).prepend('(','+').append("%",")")
            } else if (closePrice < openPrice) {
                pairItem.find('.uk-label').addClass('price-down')
                pairItem.find('.percent').html(roundPercent).prepend('(' ).append("%",")")
            } else {
                pairItem.find('.percent').html(roundPercent).prepend('(','0').append( "%",")" )
            }

            pairItem.find('.pair').html(pairCode);
            pairItem.find('.price').html(closePrice);
        }
    });
}