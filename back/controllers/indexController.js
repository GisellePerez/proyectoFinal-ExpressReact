const self = {};
const axios=require('axios');

// function categories(array) {
//     let max = array[0]
//     //en teoria obtengo el mayor
//     for (var i = 0 ; array.length ; i++){
//         if(array[i] > max){
//             max = array[i];
//         }
//     }
//     return max
// }

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
    
    let categoriesArr = [];

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
                console.log ('CATEGORY',category.data.name);
                console.log('CATEGORY_TOTAL',category.data.total_items_in_this_category);

                //hacer un array con los totales
                categoriesArr.push(category.data.total_items_in_this_category);
                console.log('CATEGORIES',categoriesArr);   
                //recorrer el arreglo y sacar el mayor    

                //cuando tenga el mayor le saco el path from root
                //retornar ese path from root
                
                let categoria = category.data.name; //acá gurdar el mayor solo?
               //return categoria
               // itemObj.categories.push(categoria)
               return categoria
            }); 
            
        }    
    )

        return Promise.all(promesasCategorias)
    })    
    .then(categories => {
        itemObj.categories = categories
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