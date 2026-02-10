'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
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

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await fetch(`/api/articles/${id}`);
            if (response.ok) {
                const data = await response.json();
                setArticle(data);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center" data-aos="fade-up">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden" data-aos="fade-in">
                <img
                    src={article.imageUrl || '/images/placeholder.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 font-semibold rounded-lg hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <article className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8" data-aos="fade-up">
                        <div className="text-sm text-blue-600 font-semibold mb-4">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Article Body */}
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </div>
                    </div>

                    {/* Back to Home Button */}
                    <div className="text-center pb-16" data-aos="fade-up">
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
