const self = {};
const axios=require('axios');

self.search= function(req, res, next){
    let query= req.query.search;
    console.log('linea 6 query',query)

    return axios
        .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
        .then(response => {
            console.log(response.data)
            res.json(response.data.results)
        })
        // .then(res => res.map(r=>{
        //     return {
        //         'id': r.id,
        //         'title': r.title,
        //         'price':{}
        //     }
        // }))
        .catch(function(e){
            console.log('Error', e)
        })
}

self.productDetail = function(req,res,next){
    console.log('estoy en items/id');
    let query= req.query;
    console.log('linea 6 query',query)

    return axios
        .get(`https://api.mercadolibre.com/items/${query}`)
        .then(response => {
            console.log(response.data)
            res.json(response.data.results)
        })
        .catch(function(e){
            console.log('Error', e)
        })
}

module.exports = self;