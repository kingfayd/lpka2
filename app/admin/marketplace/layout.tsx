"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LayoutDashboard, ListTree, ArrowLeft } from "lucide-react";

export default function MarketplaceAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin/marketplace",
            icon: LayoutDashboard,
            active: pathname === "/admin/marketplace",
        },
        {
            name: "Products",
            href: "/admin/marketplace/products",
            icon: Package,
            active: pathname.startsWith("/admin/marketplace/products"),
        },
        {
            name: "Categories",
            href: "/admin/marketplace/categories",
            icon: ListTree,
            active: pathname.startsWith("/admin/marketplace/categories"),
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Package className="text-blue-600" />
                        Marketplace
                    </h1>
                </div>
                
                <nav className="mt-6 px-4 space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                item.active
                                    ? "bg-blue-50 text-blue-600 font-bold shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <item.icon size={20} className={item.active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 font-medium"
                    >
                        <ArrowLeft size={20} />
                        <span>Ke Admin Utama</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
