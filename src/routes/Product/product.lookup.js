export const lookup_product = [
    {
        $lookup: {
            from: 'Category',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryDetails'
        }
    },
    {
        $lookup: {
            from: 'User',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails'
        }
    },
    {
        $addFields: {
            category: { $arrayElemAt: ['$categoryDetails', 0] },
            user: {
                name: { $arrayElemAt: ['$userDetails.name', 0] },
                surname: { $arrayElemAt: ['$userDetails.surname', 0] },
                fullname: {
                    $concat: [
                        { $arrayElemAt: ['$userDetails.name', 0] },
                        ' ',
                        { $arrayElemAt: ['$userDetails.surname', 0] }
                    ]
                },
                email: { $arrayElemAt: ['$userDetails.email', 0] }
            }
        }
    },
    {
        $project: {
            categoryDetails: 0,
            userDetails: 0,
            userId: 0
        }
    }
];

/**
 * Returns the aggregation pipeline for looking up product by ID.
 * @param {ObjectId} _id - The ID of the product
 * @returns {Array} The aggregation pipeline
 */
export const lookup_productById = (_id) => [
    {
        $match: { _id } // Filtra per l'ID specifico
    },
    {
        $lookup: {
            from: 'Category',          // Collection da cui fare la lookup
            localField: 'category',    // Campo nella collection 'Product'
            foreignField: '_id',       // Campo nella collection 'Category'
            as: 'categoryDetails'      // Nome del campo risultante
        }
    },
    {
        $lookup: {
            from: 'User',              // Collection da cui fare la lookup
            localField: 'userId',      // Campo nella collection 'Product'
            foreignField: '_id',       // Campo nella collection 'User'
            as: 'userDetails'          // Nome del campo risultante
        }
    },
    {
        $addFields: {
            category: { $arrayElemAt: ['$categoryDetails', 0] }, // Sostituisce il campo 'category' con il primo elemento di 'categoryDetails'
            user: {
                _id: { $arrayElemAt: ['$userDetails._id', 0] },
                name: { $arrayElemAt: ['$userDetails.name', 0] },
                surname: { $arrayElemAt: ['$userDetails.surname', 0] },
                fullname: { 
                    $concat: [
                        { $arrayElemAt: ['$userDetails.name', 0] },
                        ' ',
                        { $arrayElemAt: ['$userDetails.surname', 0] }
                    ]
                },
                email: { $arrayElemAt: ['$userDetails.email', 0] }
            }
        }
    },
    {
        $project: {
            categoryDetails: 0,  // Rimuove il campo 'categoryDetails'
            userDetails: 0,      // Rimuove il campo 'userDetails'
            userId: 0            // Rimuove il campo 'userId'
        }
    }
];

  