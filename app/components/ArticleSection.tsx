'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

export default function ArticleSection() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <section className="py-20 bg-gray-50"><div className="container mx-auto text-center">Loading articles...</div></section>;
    }

    if (articles.length === 0) {
        return null; // Don't show section if no articles
    }

    const latestArticle = articles[0];
    const otherArticles = articles.slice(1, 4); // Show next 3 articles

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Berita & Artikel</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Informasi terkini kegiatan dan berita dari Lembaga Pembinaan Khusus Anak Kelas 1 Tangerang.
                    </p>
                </div>

                {/* Featured Article (Latest) */}
                <div className="mb-16">
                    <Link href={`/berita/${latestArticle.id}`}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer" data-aos="fade-up">
                            <div className="md:flex">
                                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
                                    <img
                                        src={latestArticle.imageUrl || '/images/placeholder.jpg'}
                                        alt={latestArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-2">
                                        {new Date(latestArticle.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                                        {latestArticle.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {latestArticle.content}
                                    </p>
                                    <div className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center gap-2">
                                        Baca Selengkapnya
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Other Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherArticles.map((article, index) => (
                        <Link
                            key={article.id}
                            href={`/berita/${article.id}`}
                        >
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="h-48 overflow-hidden relative group">
                                    <img
                                        src={article.imageUrl || '/images/placeholder.jpg'}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-blue-600 font-semibold mb-2">
                                        {new Date(article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                        {article.content}
                                    </p>
                                    <div className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1 group">
                                        Baca Selengkapnya
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
