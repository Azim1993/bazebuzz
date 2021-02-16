import mongoose from 'mongoose'
import slugify from 'slugify'

const categorySchema = new mongoose.Schema({
    name: String,
    slug: {
        type: String,
        index: true
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'category'
    }
})

categorySchema.pre('save', async function (next) {
    this.slug = slugify(this.name);
    next();
 });

const Category = mongoose.model('category', categorySchema)

export default Category