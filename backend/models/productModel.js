import mongoose from 'mongoose'

 const reviewSchema = mongoose.Schema(
   {
     name: { type: String, required: true },
     rating: { type: Number, required: true },
     comment: { type: String, required: true },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
            },
    },
   {
     timestamps: true,
   }
 )

 const productSchema = mongoose.Schema(
   {
     name: {
       type: String,
       required: true,
     },
     author: {
      type: String,
      required: true,
    },
     desc: {
      type: String,
      required: true,
    },
     titleImage: {
       type: String,
       required: true,
     },
     category: {
       type: String,
       required: true,
     },
     language:{
      type: String,
      required: true,
     },
     year:{
       type: Number,
       required: true,
       default: 0,
     },
     numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
     reviews: [reviewSchema],
     rating: {
       type: Number,
       required: true,
       default: 0,
     },
     _id: {
       type: Number,
       required: true,
       default: 0,
     }
    }
 )

 const Product = mongoose.model('Product', productSchema)

 export default Product
