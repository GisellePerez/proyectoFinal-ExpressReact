const self = {};
const axios=require('axios');

self.search= function(req, res, next){
    let query= req.query.search;
    console.log('linea 6 query',query)

    return axios
        .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
        .then(response => {
            return response.data.results
            //res.json(response.data.results)
        })
        .then(res => res.map(r => {
            return {    
                'id': r.id,
                'title': r.title,
                'price': {
                    'currency': r.currency_id == 'ARS' ? '$' : r.currency_id,
                    'amount': r.price,
                    'decimals': r.currency_id.decimal_places
                },
                'picture':r.thumbnail,
                'condition':r.condition,
                'free_shipping': r.shipping.free_shipping               
            }
            
        }))
        .then(data => {
            res.json({
                author:{
                    'name':'Giselle',
                    'lastname': 'Perez'
                },
                categories:['categ1','categ2','categ3'],
                items: data
            })
        })
        .catch(function(e){
            console.log('Error', e)
        })
}

self.productDetail = function(req,res,next){
    console.log('estoy en items/id');
    let query = req.query;
    let id = req.params.id;
    console.log('linea 6 query',query)

    return axios
        .get('https://api.mercadolibre.com/items/'+id)
        .then(response => {
            console.log('axios id',response.data)
            return response.data
        })
        .then(res => {
            return {
                'id': res.id,
                'title': res.title,
                'price':{
                    'currency': res.currency_id == 'ARS' ? '$' : res.currency_id,
                    'amount': res.price,
                    'decimals': res.currency_id.decimal_places
                },
                'picture':res.thumbnail,
                'condition':res.condition,
                'sold_quantity':res.sold_quantity
            }
        })
        .then(data => {
            console.log('objeto final:',data)
            res.json({
                author:{
                    'name':'Giselle',
                    'lastname': 'Perez'
                },
                items: data
            })
        })
        
        .catch(function(e){
            console.log('Error', e)
        })
}

module.exports = self;