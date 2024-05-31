"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import Checkbox from "@/app/components/inputs/Checkbox";
import Input from "@/app/components/inputs/Input";
import SelectImage from "@/app/components/inputs/SelectImage";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
    image: File | null;
};

export type UploadedImageType = {
    image: string;
};

const AddProductForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[]>([]);
    const [isProductCreated, setIsProductCreated] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
        }
    });

    useEffect(() => {
        setValue('images', images, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }, [images, setValue]);

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages([]);
            setIsProductCreated(false);
        }
    }, [isProductCreated, reset]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product Data", data);

        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = [];

        if (!data.category) {
            setIsLoading(false);
            return toast.error('Category is not selected');
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false);
            return toast.error('Image not selected');
        }

        const uploadImage = async (image: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const fileName = new Date().getTime() + "-" + image.name;
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, `products/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.log('Error uploading image', error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);
                        }).catch((error) => {
                            console.log('Error getting the downloadable URL', error);
                            reject(error);
                        });
                    }
                );
            });
        };

        try {
            toast('Creating product, please wait...');

            uploadedImages = await Promise.all(
                data.images.map((item: ImageType) => item.image && uploadImage(item.image))
            );

            const productData = { ...data, images: uploadedImages };

            await axios.post('/api/product', productData);

            toast.success('Product created successfully');
            setIsProductCreated(true);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const addImageToState = useCallback((value: File) => {
        setImages((prev) => [...prev, { image: value }]);
    }, []);

    const removeImageFromState = useCallback((value: File) => {
        setImages((prev) => prev.filter((item) => item.image !== value));
    }, []);

    return (
        <>
            <Heading title="Add a Product" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input
                id="brand"
                label="Brand"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Checkbox id="inStock" register={register} label="This product is in stock" />
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Select a Category</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if (item.label === 'All') {
                            return null;
                        }
                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={() => setCustomValue('category', item.label)}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="pt-6">
                    <div className="font-bold">
                        Select the available product and upload their images
                    </div>
                    <div className="pt-6">
                        <SelectImage handleFileChange={addImageToState} />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {images.map((item, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(item.image!)}
                                        alt="Product"
                                        className="w-20 h-20 object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                                        onClick={() => removeImageFromState(item.image!)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Button label="Add Product" onClick={handleSubmit(onSubmit)} disabled={isLoading} />
        </>
    );
};

export default AddProductForm;
