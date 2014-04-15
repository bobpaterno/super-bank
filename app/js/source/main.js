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

  updateLedger(bal, amt, type);
}

function getBalance() {
  return $('#display').text() * 1;
}

function updateLedger(bal, amt, type) {
    var $tdFee = $('<td>');
    var $tdDep = $('<td>');
    var $tdWith = $('<td>');
    var $tdBal = $('<td>');
    var $tr = $('<tr>');

    amt = formatCurrency(amt);
    switch(type) {
    case 'Deposit':
        $tdDep.text(amt);
        $tdDep.addClass('deposit-amt');
        break;
      case 'Withdraw':
        $tdWith.text(amt);
        $tdWith.addClass('withdraw-amt');
    }

    $tdBal.text(formatCurrency(bal));
    $tdBal.addClass('balance');
    if (bal < 0) {
      $tdFee.text('-$50');
      $tdFee.addClass('fee-amt');
      $tdBal.addClass('neg-balance');
    }

    $tr.append($tdFee,$tdDep,$tdWith,$tdBal);
    $('#ledger > tbody').append($tr);
}

function formatCurrency(num) {
  num = num.toFixed(2);
  return (num<0)? '$(' + num*-1 + ')': '$' + num;
}

})();
