const self = {};
const axios=require('axios');

self.search= function(req, res, next){
    let query= req.query.search;
    console.log('linea 6 query',query)
    
    let itemObj = {
        author:{
            'name':'Giselle',
            'lastname': 'Perez'
        },
        categories:[],
        items: []
    }
    
    return axios
        .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
        .then(response => response.data.results)
        .then(resp => {
            let promesasCategorias = resp.map(r => {
            let items_list = {    
                'id': r.id,
                'title': r.title,
                'price': {
                    'currency': r.currency_id == 'ARS' ? '$' : r.currency_id,
                    'amount': r.price,
                    'decimals': r.currency_id.decimal_places
                },
                'picture':r.thumbnail,
                'condition':r.condition,
                'free_shipping': r.shipping.free_shipping,
                'location':r.address.state_name
            }
            
            itemObj.items.push(items_list)

            return axios
            .get(`https://api.mercadolibre.com/categories/${r.category_id}`)
            .then(category => {
                let categoria = {
                    name:category.data.name,
                    total: category.data.total_items_in_this_category,
                    path: category.data.path_from_root.map(c => name = c.name ) //recorro path y obtengo los nombres de cada una de las categorias
                }
                // console.log('CATEGORIA: ',categoria)
                return categoria
            });
        })
        return Promise.all(promesasCategorias) //promise.all para esperar a las categorías antes de mandar el item a la siguiente promesa 
    })    
    .then(categories => {
        categories.sort(function(a, b){ //ordeno de mayor a menor 
            return b.total-a.total
        })
        // console.log('THIS IS CATEGORIES SORTED: ',categories);        
        // console.log(categories[0].path)
        itemObj.categories = categories[0].path
        return itemObj
    })
    .then(data => {
        console.log('ESTO ES DATA',data);
        return res.json(data)            
    })
    .catch(function(e){
        console.log('Error', e)
    })   
}

self.item = function(req,res,next){    
    
    let id = req.params.id;

    return axios
        .get('https://api.mercadolibre.com/items/'+id)
        .then(response => {
            console.log('axios id',response.data)
            return response.data
    })
    .then(res => {
        item_final = {
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
        return item_final
    })
    .then(detail => {
        return axios 
        .get('https://api.mercadolibre.com/items/'+id+'/description')
        .then(respuesta => respuesta.data)
        .then(rta => {
            item_final.description = rta.plain_text;
            return item_final
        })
    })
    .then(data => {
        console.log('objeto final:',data)
        res.json({
            author:{
                'name':'Giselle',
                'lastname': 'Perez'
            },
            items: item_final
        })
    
    })
    
    .catch(function(e){
        console.log('Error', e)
    })
}

module.exports = self;