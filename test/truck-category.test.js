/**
 * Created by t_millal on 10/8/16.
 */




const TruckCategory = require('../moover/truck-category');

const truckCategory = new TruckCategory({

    categoryName: 'x-small',

    dimensions:{
        minHeight:30,
        maxHeight:50,

    }

});


console.log(truckCategory.validate());