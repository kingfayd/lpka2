import {
    getCategories,
    createCategory,
    deleteCategory,
} from "@/lib/actions/category";
import { Trash2, Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="max-w-4xl">
            <header className="mb-6 md:mb-8 text-black">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Categories</h2>
                <p className="text-gray-500 text-sm md:text-base">Add or remove product categories.</p>
            </header>

            {/* Add Category Form */}
            <section className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                <form action={createCategory as unknown as (payload: FormData) => void} className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Category Name (e.g. Electronics)"
                        className="flex-1 px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm md:text-base"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2.5 md:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-bold text-sm md:text-base shadow-sm"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </form>
            </section>

            {/* Categories List */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-black">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-5 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700">
                                    Name
                                </th>
                                <th className="px-5 md:px-6 py-4 text-xs md:text-sm font-semibold text-gray-700 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-8 text-center text-gray-500 italic text-sm"
                                    >
                                        No categories found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category: any) => (
                                    <tr
                                        key={category.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 md:px-6 py-4 text-gray-800 font-medium text-sm md:text-base">
                                            {category.name}
                                        </td>
                                        <td className="px-5 md:px-6 py-4 text-right">
                                            <form action={deleteCategory as unknown as (payload: FormData) => void}>
                                                <input type="hidden" name="id" value={category.id} />
                                                <button
                                                    type="submit"
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Delete Category"
                                                >
                                                    <Trash2 size={18} className="md:w-5 md:h-5" />
                                                </button>
                                            </form>
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
