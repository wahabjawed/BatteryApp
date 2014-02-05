$(document).ready(function () {
    $('.form-control').change(function () {
        var voc = $('#voc').val();
        var isc = $('#isc').val();
        var rating = $('#rating').val();
        var quantity = $('#quantity').val();
        var connection = $('#connection').val();
        var cableLength = $('#cableLength').val();
        var crossSection = $('#crossSection').val();
        var cableType = $('#cableType').val();
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
        $('#power').val(isNaN(power) ? "Rating Required" : power.toFixed(1));
        $('#maxVoltage').val(maxVoltage.toFixed(1));
        $('#maxCurrent').val(maxCurrent.toFixed(1));
        $('#minimumVoltage').val(minimumVoltage.toFixed(1));
        $('#minimumCurrent').val(minimumCurrent.toFixed(1));
        $('#pvLosses').val(isNaN(pvLosses)?"Above inputs are required":pvLosses.toFixed(1));
        $('#pvPercentLosses').val(isNaN(pvPercentLosses) ? "Above inputs are required" : pvPercentLosses.toFixed(1));
        $('#voltageRating').val(maxVoltage.toFixed(1))
        $('#fuseCurrent').val(fuseCurrent.toFixed(1))
    });
});
