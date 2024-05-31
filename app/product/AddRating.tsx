"use client"
import { safeUser } from "@/Types";
import {Order,Product, Review} from "@prisma/client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { Rating } from "@mui/material";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps{
    product: Product & {
        reviews: Review[]
    },
    user:(safeUser & {
        orders: Order[]
    }) | null
}

const AddRating:React.FC<AddRatingProps> = ({product,user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            Comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id:string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const onSubmit:SubmitHandler<FieldValues> =  async(data) =>{
    //save information about rating in the database
    setIsLoading(true)
    if(data.rating === 0) {
        setIsLoading(false)
        return toast.error('No rating selected')
    }
        const ratingData = {...data, userId: user?.id,product: product}

    axios.post('/api/rating', ratingData).then(() => {
        toast.success('Rating submitted');
        router.refresh();
        reset();
    }).catch((error) => {
        toast.error('Something went wrong')
    }).finally(() => {
        setIsLoading(false)
    })
    }

    if(!user || !product) return null;


   

    return ( 
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Rate this product"/>
            <Rating onChange={(event, newValue) => {
                setCustomValue('rating', newValue)
            }}/>
            <Input
            id= 'comment'
            label="Comment"
            disabled = {isLoading}
            register={register}
            errors={errors}
            required
            />
            <Button 
            label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)}
            />

        </div>
     );
}
 
export default AddRating;