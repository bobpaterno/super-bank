(function() {
  'use strict';

$(document).ready(initialize);

function initialize() {
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
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

    switch(type) {
      case 'deposit':
        $td2.text(amt);
        $td2.addClass('deposit-amt');
        break;
      case 'withdraw':
        $td2.text(amt);
        $td2.addClass('deposit-amt');
        break;
      case 'fee':
        $td1.text(amt);
        $td1.addClass('fee-amt');
    }

    $td4.text(bal);
    $td4.addClass('pos-balance');
    $tr.append($td1,$td2,$td3,$td4);
    $('#ledger > tbody').append($tr);
}

function deposit() {
  var amt, bal;
  amt = $('#amount').val() * 1;
  $('#amount').val('');

  // Calculate balance
  bal = getBalance();
  bal += (Math.abs(amt));
  $('#display').text(bal);

  // Update ledger with new row
  updateLedger(bal, amt, 'deposit');
}

function withdraw() {
  var amt, bal;
  amt = $('#amount').val() * 1;
  $('#amount').val('');

  // Calculate balance
  bal = getBalance();
  bal -= (Math.abs(amt));
  $('#display').text(bal);

  // Update ledger with new row
  updateLedger(bal, amt, 'withdraw');
  if(bal < 0) {
    updateLedger(bal, 50, 'fee');
  }
}



})();
