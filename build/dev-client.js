/**
 * Created by damingming on 2017/11/1.
 */
var hotClient = require('webpack-hot-middleware/client');

hotClient.subscribe(function(event){
    if(event.action === 'reload'){
        window.location.reload(true);
    }
})