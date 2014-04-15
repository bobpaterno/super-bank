(function() {
  'use strict';

$(document).ready(initialize);

function initialize() {
  $('.button').click(updateBalance);
}

function updateBalance() {
  var type = this.textContent;
  var bal = getBalance();
  var amt = $('#amount').val() * 1;

  amt = (type === 'Withdraw') ? amt*-1 : amt;

  bal += amt;
  bal = (bal<0) ? bal-50 : bal;
  $('#display').text(bal.toFixed(2));

  // Update ledger with new row
  updateLedger(bal, amt, type);
}

function getBalance() {
  return $('#display').text() * 1;
}

function updateLedger(bal, amt, type) {
    var $td1 = $('<td>');
    var $td2 = $('<td>');
    var $td3 = $('<td>');
    var $td4 = $('<td>');
    var $tr = $('<tr>');

    amt = formatCurrency(amt);
    switch(type) {
    case 'Deposit':
        $td2.text(amt);
        $td2.addClass('deposit-amt');
        break;
      case 'Withdraw':
        $td3.text(amt);
        $td3.addClass('withdraw-amt');
    }

    $td4.text(formatCurrency(bal));
    $td4.addClass('balance');
    if (bal < 0) {
      $td1.text(50);
      $td1.addClass('fee-amt');
    }

    $tr.append($td1,$td2,$td3,$td4);
    $('#ledger > tbody').append($tr);
}

function formatCurrency(num) {
  num = num.toFixed(2);
  return (num<0)? '$(' + num + ')': '$' + num;
}

})();
