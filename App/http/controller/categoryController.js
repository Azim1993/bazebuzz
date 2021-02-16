import Category from '@models/category'
import {categoryValidation} from '@requests/categoryRequest'

function createCategories(categories, parentID = null) {
    const categoryList = []
    let category = parentID ?
     categories.filter(cat => String(cat.parentID) == String(parentID)) :
     categories.filter(cat => cat.parentID == null)

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            child: createCategories(categories, cat._id)
        })
    }
    return categoryList
}


const index = async (req, res) => {
    const categories = await Category.find()
    return res.send({
        message: 'Categoy list',
        data: createCategories(categories)
    })
}

const store = async (req, res) => {
    const {error} = categoryValidation(req.body)
    if (error) return res.status(422).send(error.details[0].message)

    try {
        let newCategory = await new Category({
            name: req.body.name,
            parentID: req.body.parentID ? req.body.parentID : null
        }).save();
        
        res.status(201).send({
            message: 'Category created successfully',
            data: newCategory
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

const show = async (req, res) => {
    try {
        const categories = await Category.find({ slug: req.params.slug })
        .select({
            "_id": false, 
            "name": true,
            "ancestors.slug": true,
            "ancestors.name": true 
        }).exec()
        res.status(201).send({
            message: 'Categoy list',
            data: categories
        })
   } catch (err) {
       res.status(500).send(err);
   }
}

export default {
    index,
    store,
    show
}