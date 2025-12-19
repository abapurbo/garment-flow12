import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

export const UpdateProductAdmin = ({ updateFrom, handleCloseModal, refetch }) => {
    console.log("Update Product Data:", updateFrom.showOnHome);
    const [previewImages, setPreviewImages] = useState([]);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // console.log("Update from admin:", updateFrom._id);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            price: "",
            minOrderQty: "",
            availableQty: "",
            category: "",
            description: "",
            paymentOption: "",
            demoLink: "",
            showOnHome: false,
        },
    });


    useEffect(() => {
        if (updateFrom) {
            reset({
                name: updateFrom.name,
                price: updateFrom.price,
                minOrderQty: updateFrom.minOrderQty,
                availableQty: updateFrom.availableQty,
                category: updateFrom.category,
                description: updateFrom.description,
                paymentOption: updateFrom.paymentOption,
                demoLink: updateFrom.demoLink || "",
                showOnHome: updateFrom.showOnHome ?? false,
            });

            // existing image preview
            if (updateFrom.image) {
                setPreviewImages(updateFrom.image);
            }
        }
    }, [updateFrom, reset]);


    const handleImagePreview = (e) => {
        const files = e.target.files[0];
        console.log(files)
        const previews = URL.createObjectURL(files)
        setPreviewImages(previews);
    };


    // const onSubmit = async (data) => {
    //     try {
    //         const updatedProduct = {
    //             ...data,
    //             price: Number(data.price),
    //             availableQty: Number(data.availableQty),
    //             minOrderQty: Number(data.minOrderQty),
    //             showOnHome: data.showOnHome || false,
    //         };

    //         //if new image selected
    //         if (data.image) {
    //             const profileImg = data.image[0];
    //             const formData = new FormData();
    //             formData.append("image", profileImg);

    //             const IMG_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_api_key}`;

    //             const imgRes = await axios.post(IMG_API_URL, formData);

    //             if (imgRes.data.success) {
    //                 updatedProduct.image = imgRes.data.data.display_url;
    //             }
    //         } else {
    //             // no new image, keep old image
    //             updatedProduct.image = updateFrom.image;
    //         }

    //         //  NOW update product
    //         axiosSecure.patch(
    //             `/update-product/admin/${updateFrom._id}?email=${user?.email}`,
    //             updatedProduct
    //         )
    //             .then(res => {
    //                 if (res.data.modifiedCount > 0) {
    //                     console.log("Product updated:", res.data);
    //                     refetch();
    //                     handleCloseModal();
    //                     Swal.fire({
    //                         position: "top-center",
    //                         icon: "success",
    //                         title: "Product updated successfully!",
    //                         showConfirmButton: false,
    //                         timer: 1500,
    //                     });
    //                 } else {
    //                     Swal.fire({
    //                         position: "top-center",
    //                         icon: "info",
    //                         title: "No changes detected!",
    //                         showConfirmButton: false,
    //                         timer: 1500,
    //                     });
    //                 }
    //             })


    //     } catch (error) {
    //         console.log("Error updating product:", error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Update failed!",
    //         });
    //         handleCloseModal()
    //     }
    // };
    const onSubmit = async (data) => {
        console.log(data)
        const updatedProduct = {
            name: data.name,
            price: Number(data.price),
            availableQty: Number(data.availableQty),
            minOrderQty: Number(data.minOrderQty),
            category: data.category,
            description: data.description,
            paymentOption: data.paymentOption,
            demoLink: data.demoLink,
            showOnHome: data.showOnHome || false,
        };
        // console.log("Prepared updated product data:", updatedProduct);
        // // image handling
        if (data.image && data.image.length > 0) {
            console.log("New image selected, uploading...");
            const profileImg = data.image[0];
            const formData = new FormData();
            formData.append("image", profileImg);

            const IMG_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_api_key}`;

            const imgRes = await axios.post(IMG_API_URL, formData);

            if (imgRes.data.success) {
                updatedProduct.image = imgRes.data.data.display_url;
            }
        } else {
            // console.log("No new image selected, keeping existing image.");
            updatedProduct.image = updateFrom.image;
            console.log("Existing image URL:", updatedProduct.image);
        }

        //MUST use await
        const res = await axiosSecure.patch(
            `/update-product/admin/${updateFrom._id}?email=${user?.email}`,
            updatedProduct
        );
        console.log("Update response:", res.data);
        if (res.data.modifiedCount > 0) {
            refetch();
            handleCloseModal();
            Swal.fire({
                icon: "success",
                title: "Product updated successfully!",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            handleCloseModal()
            Swal.fire({
                icon: "info",
                title: "No changes detected!",
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div>
            <h1 className="dark:text-purple-600 text-2xl text-center  font-bold text-blue-500">Update Product</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[80vh] overflow-auto"
            >
                {/* Name */}
                <input
                    {...register("name", { required: "Product name is required" })}
                    placeholder="Product Name"
                    className="input input-bordered"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                {/* Category */}
                <select
                    {...register("category", { required: "Category is required" })}
                    className="select select-bordered"
                >
                    <option value="">Select Category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                </select>

                {/* Description */}
                <div className="col-span-2">
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        placeholder="Description"
                        rows={3}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Price */}
                <input
                    type="number"
                    {...register("price", { required: "Price required" })}
                    placeholder="Price"
                    className="input input-bordered"
                />

                {/* Available Qty */}
                <input
                    type="number"
                    {...register("availableQty", { required: true })}
                    placeholder="Available Quantity"
                    className="input input-bordered"
                />

                {/* MOQ */}
                <input
                    type="number"
                    {...register("minOrderQty", { required: true })}
                    placeholder="Minimum Order Quantity"
                    className="input input-bordered"
                />

                {/* Payment */}
                <select
                    {...register("paymentOption", { required: true })}
                    className="select select-bordered"
                >
                    <option value="">Select Payment</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Stripe">Stripe</option>
                </select>

                {/* Images */}
                <div className="col-span-2">
                    <input
                        type="file"
                        defaultValue={updateFrom.image}
                        {...register("image")}
                        onChange={handleImagePreview}
                        className="file-input file-input-bordered w-full"
                    />

                    {/* Preview Images */}
                    {previewImages && (
                        <div className="flex gap-3 mt-3 flex-wrap">

                            <img
                                src={previewImages}
                                alt="preview"
                                className="w-20 h-20 rounded object-cover border"
                            />

                        </div>
                    )}
                </div>

                {/* Demo Link */}
                <div className=" col-span-2">
                    <input
                        type="url"
                        {...register("demoLink")}
                        placeholder="Demo video link"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Show On Home */}
                <div className="col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("showOnHome")}
                        className="checkbox"
                    />
                    <span>Show on Home Page</span>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary dark:bg-purple-700 col-span-2">
                    Update Product
                </button>
            </form>
            <Toaster></Toaster>
        </div>
    );
};
