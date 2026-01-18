import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    phone?: string,
    image?: string,
    role: "user" | "admin" | "vendor"

    // for vendor
    shopName?: string,
    shopAddress?: string,
    gstNumber?: string,
    isApproved?: boolean,
    verificationStatus: "pending" | "approved" | "rejected",
    requestedAt: Date,
    approvedAt: Date,
    rejectedReason?: string

    vendorProducts?: mongoose.Types.ObjectId[],
    orders?: mongoose.Types.ObjectId[]

    cart?: {
        product: mongoose.Types.ObjectId,
        quantity: number
    }[]

    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin", "vendor"],
        default: "user"
    },

    shopName: {
        type: String
    },
    shopAddress: {
        type: String
    },
    gstNumber: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default:"pending"
    },
    approvedAt:{
        type:Date
    },
    requestedAt:{
        type:Date
    },
    rejectedReason:{
        type:String
    },
    vendorProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    cart:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
}, { timestamps: true })

const User = mongoose.models?.User || mongoose.model<IUser>('User',userSchema)
export default User