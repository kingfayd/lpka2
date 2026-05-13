"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LayoutDashboard, ListTree, ArrowLeft, Menu, X as CloseIcon } from "lucide-react";

export default function MarketplaceAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="flex min-h-screen bg-gray-50 text-black relative">
            {/* Mobile Header Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-3 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 transition-all"
                >
                    {isSidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-40 transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
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
                            onClick={() => setIsSidebarOpen(false)}
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
            <main className={`flex-1 transition-all duration-300 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8`}>
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
