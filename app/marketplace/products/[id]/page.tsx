import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, MessageCircle, Package, ShieldCheck, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";
import MediaSlider from "./MediaSlider";
import Image from "next/image";
export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: { 
            category: true,
            media: {
                orderBy: { order: 'asc' }
            }
        },
    });

    const otherProducts = await prisma.product.findMany({
        where: { id: { not: id } },
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });

    if (!product) {
        notFound();
    }

    const settings = await prisma.contactSettings.findFirst();
    const whatsappNumber = settings?.whatsappNumber || "6281386241976";
    const message = `Halo, saya ingin membeli ${product.name} seharga Rp ${product.price.toLocaleString("id-ID")}. Apakah stok masih ada?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <div className="bg-white min-h-screen font-sans text-black">
            {/* Navbar Minimalist */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link
                        href="/marketplace"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ChevronLeft size={20} />
                        Kembali ke Katalog
                    </Link>

                    <Link 
                        href="/" 
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors border border-gray-200"
                    >
                        <ChevronLeft size={16} />
                        <span className="hidden sm:inline">Web Utama</span>
                        <span className="sm:hidden">Kembali</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Image Gallery Slider */}
                    <div className="flex-1 space-y-10">
                        <MediaSlider media={product.media} thumbnail={product.imageUrl} />
                        
                        <div className="text-gray-600 max-w-none">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
                                Deskripsi Produk
                            </h3>
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {product.description || "Tidak ada deskripsi untuk produk ini."}
                            </p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {product.category.name}
                            </span>
                            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-3xl font-black text-gray-900">
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>
                        </div>


                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Package size={18} className="text-blue-600" />
                                <span>
                                    Stok Tersedia: <strong>{product.stock} pcs</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ShieldCheck size={18} className="text-green-600" />
                                <span>Kualitas Terjamin & Transaksi Aman</span>
                            </div>
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-200"
                        >
                            <MessageCircle size={24} />
                            Tanya Produk via WhatsApp
                        </a>

                        {product.shopeeUrl && (
                            <a
                                href={product.shopeeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#EE4D2D] text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#d74223] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-200"
                            >
                                <ShoppingBag size={24} />
                                Beli via Shopee
                            </a>
                        )}

                        {/* Produk Lainnya Section */}
                        {otherProducts.length > 0 && (
                            <div className="pt-8 mt-8 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Produk Lainnya</h3>
                                <div className="space-y-4">
                                    {otherProducts.map((otherProduct) => (
                                        <Link 
                                            key={otherProduct.id} 
                                            href={`/marketplace/products/${otherProduct.id}`}
                                            className="group flex gap-4 p-3 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all bg-white"
                                        >
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                                                {otherProduct.imageUrl ? (
                                                    <Image
                                                        src={otherProduct.imageUrl}
                                                        alt={otherProduct.name}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                                                    {otherProduct.category.name}
                                                </span>
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                    {otherProduct.name}
                                                </h4>
                                                <p className="text-sm font-black text-gray-900 mt-1">
                                                    Rp {otherProduct.price.toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-12 border-t border-gray-100 text-center text-gray-400 text-xs">
                <p>© 2026 LPKA Shop. All rights reserved.</p>
            </footer>
        </div>
    );
}
