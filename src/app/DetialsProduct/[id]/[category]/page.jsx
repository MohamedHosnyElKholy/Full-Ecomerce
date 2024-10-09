"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetilas } from "../../../lib/sliceDetialsProduct";
import { getProductFlashSeals } from "../../../lib/sliceProduct";
import Image from 'next/image';
import Link from 'next/link'; // أضف هذا السطر

export default function Page() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const detialsProduct = useSelector((state) => state.getProductDetilasSlice.product);
    const products = useSelector((state) => state.getProductFlashSealsSlice.products);

    useEffect(() => {
        dispatch(getProductDetilas(id));
        dispatch(getProductFlashSeals());
    }, [id, dispatch]);

    const {
        title,
        price,
        sold,
        ratingsAverage,
        reviews = [],
        imageCover,
        images = [],
        brand = {},
        category: x = {},
        description,
    } = detialsProduct || {};

    const [activeImage, setActiveImage] = useState(imageCover);
    useEffect(() => {
        setActiveImage(imageCover);
    }, [imageCover]);

    const relatedProducts = products.filter((el) => 
        el.category._id === x._id && el._id !== id
    );

    return (
        <div className="container mx-auto p-5 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8">
                {/* صور المنتج المصغرة */}
                <div className="md:col-span-2 flex flex-col gap-2 overflow-x-auto">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="w-16 h-16 md:w-24 md:h-24 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => setActiveImage(img)}
                        >
                            <Image
                                src={img}
                                alt={`Image ${index}`}
                                layout="responsive"
                                width={90}
                                height={90}
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    ))}
                </div>
                
                {/* الصورة الرئيسية */}
                <div className="md:col-span-5 flex justify-center items-center">
                    <Image
                        src={activeImage}
                        alt={title}
                        width={500}
                        height={500}
                        className="rounded-lg object-cover"
                    />
                </div>
                
                {/* تفاصيل المنتج */}
                <div className="md:col-span-5 bg-gray-100 p-5 rounded-lg shadow-md flex flex-col gap-4">
                    <h2 className="font-bold text-2xl md:text-3xl text-gray-800">{title}</h2>
                    <div className="flex flex-wrap gap-3 items-center">
                        <p className="text-gray-600">Sold: {sold}</p>
                        <p className="text-gray-600">Rating: {ratingsAverage} ({reviews.length} Reviews)</p>
                    </div>
                    <p className="text-blue-600 text-2xl">${price}</p>
                    <p className="text-gray-700 text-lg">{description}</p>
                    <p className="font-semibold text-gray-800">Category: {x.name}</p>
                    <p className="font-semibold text-gray-800">Brand: {brand.name}</p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                        <div className="border border-gray-300 rounded-lg p-4 transition-transform hover:scale-105 shadow-md cursor-pointer" key={product._id}>
                            <Link href={`/DetialsProduct/${product._id}/${product.category.name}`} passHref>
                                <div className="h-48 rounded-lg overflow-hidden mb-2">
                                    <Image
                                        src={product.imageCover}
                                        alt={product.title}
                                        layout="responsive"
                                        width={500}
                                        height={200}
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <h4 className="font-semibold text-lg text-gray-800">{product.title}</h4>
                                <p className="text-blue-600 font-medium">${product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
