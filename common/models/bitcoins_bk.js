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


    /*async.waterfall([
      function(callback) {
        client.getAccounts(function(err, accounts) {
          accounts.forEach(function(acct) {
            console.log("acct.id-->"+acct.id);
            console.log("acct.balance.amount-->"+acct.balance.amount);
            if (acct.id === myBtcAcct.id) {
              console.log("account id matches");
              if (acct.balance.amount > 0.1) {
                  console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name + ' id ' + acct.id);
                  console.log('bal: ' + acct.balance.amount + ' currency: ' + acct.balance.currency);
                  callback(null, vehicle_vin,btc_amount,notes);
                }
              } else {
                //cb(null, 'No Sufficient Funds');
                return;
              }
            });
          });
        },

      function callback(vehicle_vin,btc_amount,notes) {
        console.log("vehicle_vin-->"+vehicle_vin);
        console.log("btc_amount-->"+btc_amount);
        console.log("notes-->"+notes);

        var args = {
          "to": "moN5yVaCq4CVsFiQmqrcsdLZKtdHXuwjmi",
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
    ], function (err, result) {
        // result now equals 'done'
        console.log("Going into final Callback");
        cb(null,"Transaction id="+result);
        console.log("After into final Callback");
    });*/
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
