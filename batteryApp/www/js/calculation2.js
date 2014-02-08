$(document).ready(function () {
    $('.form-control').keyup(function () {
        calculate();
    });
    $('.form-control').change(function () {
        calculate();
    });
});
function calculate() {
    var voc = $('#voc').val().replace(',', '');
    var isc = $('#isc').val().replace(',', '');
    var rating = $('#rating').val().replace(',', '');
    var quantity = $('#quantity').val().replace(',', '');
    var connection = $('#connection').val().replace(',', '');
    var cableLength = $('#cableLength').val().replace(',', '');
    var crossSection = $('#crossSection').val().replace(',', '');
    var cableType = $('#cableType').val().replace(',', '');
    var power = rating * (connection == 1 ? quantity : 1);
    var maxVoltage = 1.2 * voc * (connection == 1 ? 1 : quantity);
    var maxCurrent = 1.25 * isc * (connection == 1 ? quantity : 1);
    var minimumVoltage = maxVoltage + 6;
    var minimumCurrent = maxCurrent + 2;
    var pvLosses = 0;
    var pvPercentLosses = 0;
    pvLosses = (2 * cableLength * maxCurrent * maxCurrent) / ((cableType==1?56:38) * crossSection);
    pvPercentLosses = (pvLosses * 100 / power);
    var fuseCurrent = 1.4 * maxCurrent;
    $('#power').val(isNaN(power) ? "Rating Required" : format(power.toFixed(1)));
    $('#maxVoltage').val(format(maxVoltage.toFixed(1)));
    $('#maxCurrent').val(format(maxCurrent.toFixed(1)));
    $('#minimumVoltage').val(format(minimumVoltage.toFixed(1)));
    $('#minimumCurrent').val(format(minimumCurrent.toFixed(1)));
    $('#pvLosses').val(isNaN(pvLosses) ? "Above inputs are required" : format(pvLosses.toFixed(1)));
    (pvLosses > 22.6) ? $('#pvLosses').css('background-color', '#f2dede') : $('#pvLosses').css('background-color', '#eee');
    $('#pvPercentLosses').val(isNaN(pvPercentLosses) ? "Above inputs are required" : format(pvPercentLosses.toFixed(1)));
    (pvPercentLosses > 1) ? $('#pvPercentLosses').css('background-color', '#f2dede') : $('#pvPercentLosses').css('background-color', '#eee');
    $('#voltageRating').val(format(maxVoltage.toFixed(1)));
    $('#fuseCurrent').val(format(fuseCurrent.toFixed(1)));
}
function format(amount)
{ return String(amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); }
