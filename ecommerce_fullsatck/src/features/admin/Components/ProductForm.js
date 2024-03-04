import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectedProduct,
  updateProductAsync,
} from "../../product-list/productSlice";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch =useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const {id} =useParams()

  useEffect(()=>{
    if(id){
      dispatch(fetchProductByIdAsync(id))
    }
    else{
      dispatch(clearSelectedProduct())
    }
  },[id,dispatch])

  const product =useSelector(selectedProduct)

  useEffect(()=>{
    if(product && id){
      setValue('title',  product.title)
      setValue('description',  product.description)
      setValue('price',  product.price)
      setValue('rating',  product.rating)
      setValue('discountPercentage',  product.discountPercentage)
      setValue('thumbnail',  product.thumbnail)
      setValue('stock',  product.stock)
      setValue('category',  product.category)
      setValue('brand',  product.brand)
      setValue('image1',  product.images[0])
      setValue('image2',  product.images[1])
      setValue('image3',  product.images[2])
    }
  },[product,id, setValue])


  const handleDelete = ()=>{
    const newProduct = {...product, deleted : true}
    dispatch(updateProductAsync(newProduct))
    reset()
  }
  return (
    <div>
      <form noValidate onSubmit={handleSubmit((data)=>{
        // console.log(data)
        const newProduct= {...data}
        newProduct.images = [newProduct.image1, newProduct.image2 , newProduct.image3 , newProduct.thumbnail]
        delete newProduct['image1']
        delete newProduct['image2']
        delete newProduct['image3']
        newProduct.price = +newProduct.price
        newProduct.stock = +newProduct.stock
        newProduct.discountPercentage = +newProduct.discountPercentage
        // console.log(product)
        if(id){
          const updateProduct ={id:id,...newProduct}
          updateProduct.rating = product.rating
          dispatch(updateProductAsync(updateProduct))
          alert("Product Updated")
          reset()
        }
        else{
          newProduct.rating =0
          dispatch(createProductAsync(newProduct))
          alert("Product Created")
          reset()
        }
        
      })}>
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register('title', {required:"name is required"})}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description', {required:"description is required"})}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="col-span-full">
            <label
              htmlFor="brand"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Brand
            </label>
            <div className="mt-2">
              <select {...register('brand', {required:"brand is required"})}>
                <option>----Choose Brand-----</option>
                {brands.map((brand) => (
                  <option value={brand.value}>{brand.value}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2">
              <select {...register('category', {required:"category is required"})}>
                <option>----Choose Brand-----</option>
                {categories.map((category) => (
                  <option value={category.value}>{category.value}</option>
                ))}
              </select>
            </div>
          </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register('price', {required:"price is required",min:1, max:10000})}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="discountPercentage"
                      {...register('discountPercentage', {required:"name is required",min:0, max:100})}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register('stock', {required:"stock is required",min:1})}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ThumbNail
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  {...register('thumbnail', {required:"thumbnail is required"})}
                  id="thumbnail"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="image1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 1
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  {...register('image1', {required:"image1 is required"})}
                  id="image1"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="image2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 2
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  {...register('image2', {required:"image2 is required"})}
                  id="image2"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="image3"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 3
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  {...register('image3', {required:"image3 is required"})}
                  id="image3"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to='/admin'
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          {product && <button
          onClick={handleDelete}
            type="submit"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
