module.exports = function(Bitcoins) {
  var coinbase = require('coinbase');
  Bitcoins.getCoins = function(vehicle_vin,to_public_address,btc_amount,notes,cb) {

    var client = new coinbase.Client({
      'apiKey': 'JtqREi3ZJs0bZ9Fa',
      'apiSecret': 'VDnT2Fje8DHbYimYBFK5DUrQI2JBG3iZ',
      'baseApiUri': 'https://api.sandbox.coinbase.com/v1/'
    });

    var Account   = require('coinbase').model.Account;
    var myBtcAcct = new Account(client, {'id': '55f61d82b0e9d646fb000115'});
    //var address = "moN5yVaCq4CVsFiQmqrcsdLZKtdHXuwjmi";
    var args = {
      "to": to_public_address,
      "amount": btc_amount,
      "notes": notes
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
          {arg: 'to_public_address', type: 'string'},
          {arg: 'btc_amount', type: 'string'},
          {arg: 'notes', type: 'string'}
        ],
        returns: {arg: 'txn_id', type: 'string'},
        http: {path: '/getCoins', verb: 'get'}
      }
  );

};
