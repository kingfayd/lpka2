"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/product";
import ProductForm from "./ProductForm";
import { Trash2, Package, Pencil, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductMedia = {
    id: string;
    url: string;
    type: "IMAGE" | "VIDEO";
};

type Product = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    imageUrl: string | null;
    shopeeUrl: string | null;
    categoryId: string;
    category: { id: string; name: string };
    media: ProductMedia[];
};

export default function ProductsClient({
    products,
    categories,
}: {
    products: Product[];
    categories: { id: string; name: string }[];
}) {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const router = useRouter();

    const handleDelete = async (product: Product) => {
        if (!confirm(`Yakin ingin menghapus produk "${product.name}"?`)) return;
        const formData = new FormData();
        formData.set("id", product.id);
        const result = await deleteProduct(formData);
        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="max-w-6xl">
            <header className="mb-8 text-black">
                <h2 className="text-2xl font-bold text-gray-900">Manage Produk</h2>
                <p className="text-gray-500">Tambah, edit, atau hapus produk dari katalog.</p>
            </header>

            <ProductForm
                key={editingProduct?.id || 'new'}
                categories={categories}
                editProduct={editingProduct || undefined}
                onCancel={() => setEditingProduct(null)}
            />


            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8 text-black">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700">Gambar</th>
                                <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700">Info Produk</th>
                                <th className="hidden md:table-cell px-6 py-4 text-sm font-semibold text-gray-700">Kategori</th>
                                <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700">Harga</th>
                                <th className="hidden sm:table-cell px-6 py-4 text-sm font-semibold text-gray-700">Stok</th>
                                <th className="hidden lg:table-cell px-6 py-4 text-sm font-semibold text-gray-700">Shopee</th>
                                <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 italic">
                                        Belum ada produk. Tambahkan di atas.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 md:px-6 py-4">
                                            {product.imageUrl ? (
                                                <div className="relative w-10 h-10 md:w-12 md:h-12">
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="rounded-lg object-cover bg-gray-100"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <Package size={18} className="md:w-5 md:h-5" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 md:px-6 py-4">
                                            <div className="font-medium text-gray-900 text-sm md:text-base line-clamp-1">{product.name}</div>
                                            <div className="md:hidden text-[10px] text-blue-600 font-medium">
                                                {product.category.name}
                                            </div>
                                            <div className="hidden md:block text-xs text-gray-500 truncate max-w-[150px]">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium whitespace-nowrap">
                                                {product.category.name}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-gray-800 font-bold text-xs md:text-sm whitespace-nowrap">
                                            Rp {product.price.toLocaleString("id-ID")}
                                        </td>
                                        <td className="hidden sm:table-cell px-6 py-4 text-gray-800 text-sm">{product.stock}</td>
                                        <td className="hidden lg:table-cell px-6 py-4">
                                            {product.shopeeUrl ? (
                                                <a
                                                    href={product.shopeeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-[#EE4D2D] font-medium hover:underline"
                                                >
                                                    Lihat
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => {
                                                        setEditingProduct(product);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                    title="Edit Produk"
                                                >
                                                    <Pencil size={16} className="md:w-4.5 md:h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Hapus Produk"
                                                >
                                                    <Trash2 size={16} className="md:w-4.5 md:h-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
