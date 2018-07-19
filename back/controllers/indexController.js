const self = {};
const axios=require('axios');

// self.items = function(req,res,next){
//     let query = req.query;
//     console.log(query);
//     fetch('https://api.mercadolibre.com/sites/MLA/search?q='+query)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(myJson) {
//             console.log(myJson);
//         })
//         .catch(function(error){
//             console.log('error')
//         });
// }

self.search= function(req, res, next){
    let query= req.query.q;
    console.log(query)

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
}

module.exports = self;