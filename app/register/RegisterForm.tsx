"use client"
import { useState, useEffect } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { safeUser } from "@/Types";



interface RegisterFormProps{
    currentUser: safeUser | null;
}


const RegisterForm:React.FC<RegisterFormProps> = ({currentUser})=> {
    const [isLoading, setIsLoading] = useState(false); 

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "", 
            password: "",
        }
    });

    const router = useRouter()

    useEffect(() => {
        if(currentUser){
            router.push('/')
            router.refresh()
        }

    },[])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true); 
        
        axios.post('/api/register', data).then(() => {
            toast.success('Account successfully created')

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if(callback?.ok){
                    router.push('/')
                    router.refresh()
                        toast.success('Logged In Successfully')
                    
                }
                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error('something went wrong'))
        .finally(() => {
            setIsLoading(false);
        })
    };
   //if user is currently logged in redirect
    if(currentUser){
        return <p className="text-center">Logged in Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sign Up"/>
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle}
            onClick={() => {}}/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label="Sign Up" onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">
                Already have an account ?
                <Link className="underline" href="/login"> Log in</Link>
            </p>
        </>
    );
}

export default RegisterForm;
