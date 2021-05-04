// const { default: Web3 } = require("web3");
// const Web3 = require("web3")
// import Web3 from './node_modules/web3';
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// var accounts = new Accounts('http://localhost:8545');
// console.log(accounts);
$( document ).ready(function() {
    console.log( "ready!" );
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {

        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // var address = web3.eth.accounts[0];
    // var account = web3.eth.accounts[0];
    // console.log(address);
    web3.eth.getAccounts(function(error, accounts) {
        if(error) {
            console.log(error);
        }
        
        $('#accountIn').val(accounts[0]);
        web3.eth.getBalance(accounts[0]).then(function(result){
            console.log( "Balance : " ,web3.utils.fromWei(result, 'ether'));
            $('#balanceIn').val(web3.utils.fromWei(result, 'ether'));
        });
    });
    
    $('#balanceBtn').click(function() {
        var _account = $('#accountIn').val();
        web3.eth.getBalance(_account).then(function(result){
            console.log( "Balance : " ,web3.utils.fromWei(result, 'ether'));
            $('#balanceIn').val(web3.utils.fromWei(result, 'ether'));
        });
    });
    
    
    $('#perevesti').click(function() {
        $('#tranHash').text('');
        var _from = $('#From').val();
        var _to = $('#To').val();
        var _Amount = $('#Amount').val();
        var txnObject = {
            "from":_from,
            "to": _to,
            "value": web3.utils.toWei(_Amount,'ether'),
        }
    
        web3.eth.sendTransaction(txnObject, function(error, result){
            if(error){
                console.log( "Transaction error" ,error);
            }
            else{
                var txn_hash = result;
                $('#tranHash').text(txn_hash);
            }
        });
        
    });
    web3.eth.getAccounts(function(error, accounts) {
        if(error) {
            console.log(error);
        }
            Account = accounts[0];
        var content = accounts;
        console.log(content);

        // var gggg = web3.eth.accounts.sign("hello","193cf571ff0233debbbb1438d346f8b0cbd76eab2077715a57c6ccd2f15ecedf");	
        // console.log(web3.eth.accounts.recover(gggg));
    });
    var messageHash, Signature, Message, Account;
    $('#signIn').click(function() {
        console.log($('#message').val());
        Message = $('#message').val();
        messageHash = web3.eth.accounts.hashMessage($('#message').val())
        console.log(messageHash);
        
        Signature = web3.eth.accounts.sign(Message, '193cf571ff0233debbbb1438d346f8b0cbd76eab2077715a57c6ccd2f15ecedf');
        // console.log(Account);
        // console.log(web3.eth.accounts.sign(Message, '193cf571ff0233debbbb1438d346f8b0cbd76eab2077715a57c6ccd2f15ecedf'));	
            $('#msg').text(messageHash);
            $('#signature').text(Signature.signature);
            $('#noneIn').css("display","block");
            
    });
    

    $('#verifyIn').click(function(){
        console.log(web3.eth.accounts.recover(Signature));
    });
});

