module.exports = function(Bitcoins) {

  var async = require('async');
  var coinbase = require('coinbase');




  Bitcoins.getCoins = function(vehicle_vin,btc_amount,notes,cb) {

    var client = new coinbase.Client({
      'apiKey': 'JtqREi3ZJs0bZ9Fa',
      'apiSecret': 'VDnT2Fje8DHbYimYBFK5DUrQI2JBG3iZ',
      'baseApiUri': 'https://api.sandbox.coinbase.com/v1/'
    });

    var Account   = require('coinbase').model.Account;
    var myBtcAcct = new Account(client, {'id': '55f61d82b0e9d646fb000115'});

    var args = {
      "to": "moN5yVaCq4CVsFiQmqrcsdLZKtdHXuwjmi",
      "amount": "0.035",
      "notes": "First Car Transaction"
    };

      myBtcAcct.sendMoney(args, function(err, txn) {

        if(err)
          throw err;
          console.log('Calling send BTC and my txn id is: ' + txn.id);
          cb(null, 'Txn ID ' + txn.id);
      });

  }

  Bitcoins.remoteMethod(
      'getCoins',
      {
        accepts: [
          {arg: 'vehicle_vin', type: 'string'},
          {arg: 'btc_amount', type: 'string'},
          {arg: 'notes', type: 'string'}
        ],
        returns: {arg: 'txn_id', type: 'string'},
        http: {path: '/getCoins', verb: 'get'}
      }
  );

};
