var watts=0;
var hrs=0;

var totdaiwat=0;
var totmonwat=0;

var onedone=0;
var twodone=0;

var id=0;


$(document).ready(function(){
    
    $('.form-control').change(function () {
        ///////////////////////////////////////////////////////////////////////////////////
        var total_daily = $('#hoursOfSunPerDay').val() * $('#panel').val();
        var total_monthly=total_daily * 30;
		
        $('#solarDailyWattHours').val(total_daily);
        $('#solarMonthlyWattHours').val(total_monthly);
        if (onedone==1)
        {
            var percent = ($('#solarMonthlyWattHours').val() / $('#loadMonthlyWattHours').val()) * 100;
            var info = "";
            if (percent<100)
            {
                info="<p align=center>Your solar power system will power "+CurrencyFormatted(percent)+"% of your appliances.</p>";
            }
            else if (percent==100)
            {
                info="<p align=center>Your solar system will just power your appliances.</p>";
            }
            else
            {
                info="<p align=center>Congratulations, your solar power system is producing "+CurrencyFormatted(percent-100)+"% more than your appliances use.  You can sell the excess energy back to your power supplier.</p>";
            }
        }
        $('#information').html("");
        $('#information').append(info);
        twodone = 1;
        ///////////////////////////////////////////////////////////////////////////////////
        var watt_hour = eval($('#loadDailyWattHours').val() * 1);
        var battery_volt = eval($('#battery').val() * 1);
        var bank_size = (watt_hour / battery_volt) * 1.35;
        $('#requiredBatterySize').val(CurrencyFormatted(bank_size));
        ///////////////////////////////////////////////////////////////////////////////////
        watts = $('#maxExpectedLoad').val();
        hrs = $('#hours').val();
        $('#loadDailyWattHours').val(watts * hrs);
        $('#loadMonthlyWattHours').val(watts * hrs * 30);

        if (twodone == 1) {
            var percent = ($('#solarMonthlyWattHours').val() / $('#loadMonthlyWattHours').val()) * 100;
            var info = "";
            if (percent < 100) {
                info = "<div class='alert alert-danger'>Your solar power system will power " + CurrencyFormatted(percent) + "% of your appliances.</p>";
            }
            else if (percent == 100) {
                info = "<div class='alert alert-info'>Your solar system will just power your appliances.</div>";
            }
            else {
                info = "<div class='alert alert-success'>Congratulations, your solar power system is producing " + CurrencyFormatted(percent - 100) + "% more than your appliances use.  You can sell the excess energy back to your power supplier.</div>";
            }
        }
        $('#information').html("");
        $('#information').append(info);
        onedone = 1;
        ////////////////////////////////////////////////////////////////////////////////////
    });

});

// round down to 2 decimal places function
function CurrencyFormatted(amount)
{
    var i = parseFloat(amount);
    if(isNaN(i)) { i = 0.00; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if(s.indexOf('.') < 0) { s += '.00'; }
    if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
}

