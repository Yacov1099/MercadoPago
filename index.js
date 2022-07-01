let express = require('express')
let MercadoPago = require('mercadopago')
let app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-5462596460932511-063014-adb8a7cbcc5fc485e09db1437b3c1070-499761707"
})



app.get('/', (req, res) => {
    res.send('Ola mundo')
})


app.get('/pay', async(req, res) => {
    let id = "" + Date.now()
    let email = "nehomeuemail@mail.com"

    let datas = {
        items: [
            item = {
                id: id,
                title: "3x cadeiras de rodas; 2x hamburguers",
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(150)
            },
        ],
        payer: {
            email: email
        },
        external_reference: id

    }

    try {
        let pay = await MercadoPago.preferences.create(datas)
        console.log(pay)
        //Banco.SalvarPagamento({id: id, pagador: email})
        return res.redirect(pay.body.init_point)
    } catch (err) {
        return res.send(err.message)
    }

})


app.listen(3000, (req, res) => {
    console.log('Server is running in http://localhost:3000/')
})
