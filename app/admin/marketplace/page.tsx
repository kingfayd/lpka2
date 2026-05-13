import { prisma } from "@/lib/prisma";
import { Package, ListTree, ShoppingCart, TrendingUp } from "lucide-react";
export default async function MarketplaceDashboard() {
    const [productCount, categoryCount] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
    ]);

    const stats = [
        {
            label: "Total Products",
            value: productCount,
            icon: Package,
            color: "bg-blue-50 text-blue-600",
            borderColor: "border-blue-100",
        },
        {
            label: "Categories",
            value: categoryCount,
            icon: ListTree,
            color: "bg-emerald-50 text-emerald-600",
            borderColor: "border-emerald-100",
        },
        {
            label: "Total Views",
            value: "0", // Placeholder for future analytics
            icon: TrendingUp,
            color: "bg-purple-50 text-purple-600",
            borderColor: "border-purple-100",
        },
    ];

    return (
        <div>
            <header className="mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Marketplace Overview</h2>
                <p className="text-gray-500 mt-1 text-sm md:text-base">Selamat datang di panel manajemen katalog LPKAShop.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-white p-6 md:p-8 rounded-2xl border ${stat.borderColor} shadow-sm flex items-center gap-4 md:gap-6 transition-transform hover:scale-[1.02] duration-300`}
                    >
                        <div className={`p-3 md:p-4 rounded-2xl ${stat.color} shadow-inner`}>
                            <stat.icon size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl md:text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-8 md:mt-12 bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.03] text-gray-900 pointer-events-none">
                    <ShoppingCart size={150} className="md:w-[200px] md:h-[200px]" />
                </div>
                
                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                    Akses Cepat
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 relative z-10">
                    <a
                        href="/admin/marketplace/products"
                        className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all font-bold text-xs md:text-sm uppercase tracking-widest text-center"
                    >
                        Kelola Produk
                    </a>
                    <a
                        href="/admin/marketplace/categories"
                        className="bg-gray-50 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all font-bold text-xs md:text-sm uppercase tracking-widest border border-gray-200 text-center"
                    >
                        Kelola Kategori
                    </a>
                </div>
            </section>

        </div>
    );
}
