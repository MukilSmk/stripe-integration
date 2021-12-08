const express = require('express')
const stripe = require('stripe')('sk_test_51K2YKWSBKm7ds0Nr4hLleQlMvlxEQvjorjmwi3S63sm9ZrNw00ff4PDbRIQUQF2veSu5TD7Ewf7Ua21SYaEYbZcQ00Jb3LnC9J')
const app = express()


app.listen(3000, function(){
    console.log('Server running')
})


const createCustomer = function() {
    var param = {}
    param.email = "mike@gmail.com",
    param.name = "Mike"
    param.description = "from node"

    stripe.customers.create(param, function(err, customer){
        if(err){
            console.log("err:"+err )
        }
        if(customer){
            console.log("success:"+customer)
        } else{
            console.log("Something wrong")
        }
    })
}

// createCustomer()

var retrieveCustomer = function (){
    stripe.customers.retrieve("cus_KjUlwK0FFeV4SY", function(err, customer){
        if(err){
            console.log("err:"+err )
        }
        if(customer){
            console.log("success:"+JSON.stringify(customer, null, 2))
        } else{
            console.log("Something wrong")
        }
    })
}

    // retrieveCustomer();


    var createToken = function(){
        var param = {}
        param.card = {
            // number: '4242 4242 4242 4242',
            number: '4111111111111111',
            exp_month: 04,
            exp_year: 2023,
            cvc: '045'
        }


        stripe.tokens.create(param, function(err, token){
            if(err){
                console.log("err:"+err )
            }
            if(token){
                console.log("success:"+JSON.stringify(token, null, 2))
            } else{
                console.log("Something wrong")
            }
        })  
    }

    // createToken()


    var addCardToCustomer = function(){
        stripe.customers.createSource("cus_KjUlwK0FFeV4SY",{source: "tok_1K4KWoSBKm7ds0NrUsLhLE0I"}, function(err, card){
            if(err){
                console.log("err:"+err )
            }
            if(card){
                console.log("success:"+JSON.stringify(card, null, 2))
            } else{
                console.log("Something wrong")
            }
        })

    }

    // addCardToCustomer()


    var chargeCustomerThroughCustomerID = function(){
        var param = {
            amount: '2000',
            currency: 'inr',
            description: 'First payment',
            customer: 'cus_KjUlwK0FFeV4SY',
        }
        stripe.charges.create(param, function(err, charge){
            if(err){
                console.log("err:"+err )
            }
            if(charge){
                console.log("success:"+JSON.stringify(charge, null, 2))
            } else{
                console.log("Something wrong")
            }
        })  
    }


    // chargeCustomerThroughCustomerID( )

    var chargeCustomerThroughTokenID = function(){
        var param = {
            amount: '2000',
            currency: 'inr',
            description: 'First payment',
            source: 'tok_1K4I2NSBKm7ds0NrvdLpuh7T',
        }
        stripe.charges.create(param, function(err, charge){
            if(err){
                console.log("err:"+err )
            }
            if(charge){
                console.log("success:"+JSON.stringify(charge, null, 2))
            } else{
                console.log("Something wrong")
            }
        })  
    }
    // chargeCustomerThroughTokenID()

    var getAllCustomers = function(){
      
        stripe.customers.list( {limit: 2},function(err, customers){
            if(err){
                console.log("err:"+err )
            }
            if(customers){
                console.log("success:"+JSON.stringify(customers.data, null, 2))
            } else{
                console.log("Something wrong")
            }
        })  
    }

    // getAllCustomers()

    const deletedCardDetails = function(){
        stripe.customers.deleteSource(
            'cus_KjUlwK0FFeV4SY',
            'card_1K43RXSBKm7ds0NrA1Yk4ERj'
          );
    } 

    //   deleted()


    const updateDefaultCard =  stripe.accounts.updateExternalAccount(
        'acct_1032D82eZvKYlo2C',
        'card_1K4Ki52eZvKYlo2Cm0jxQvVJ',
        {metadata: {order_id: '6735'}}
      )