import mongoose from 'mongoose'
import slugify from 'slugify'

const tagSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    slug: String
}, {
    timestamps: true
})

tagSchema.pre('save', async function (next) {
    this.slug = slugify(this.name);
    next();
 });

 const Tag = mongoose.model('tag', tagSchema)

 export default Tag