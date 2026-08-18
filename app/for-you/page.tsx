"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Book } from "@/types/book";

export default function ForYouPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchAllBooks() {
            try {
                setLoading(true);
                const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
                    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
                    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
                    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
                ]);

                const selectedData =  await selectedRes.json();
                const recommendedData = await recommendedRes.json();
                const suggestedData = await suggestedRes.json();

                setSelectedBook(Array.isArray(selectedData) ? selectedData[0] : selectedData);
                setRecommendedBooks(recommendedData);
                setSuggestedBooks(suggestedData);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchAllBooks();
    },[]);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col lg:ml-64">
                <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-end sticky top-0 z-30">
                    <div className="max-w-xl">
                        <SearchBar onSearch={(query) => console.log("Searching:", query)} />
                    </div>
                </header>
                <main className="p-6 md:p-8 max-w-6xl w-full mx-auto space-y-10">
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                    <>
                        {selectedBook && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Selected just for you</h2>
                                <Link href={`/book/${selectedBook.id}`}>
                                <div className="bg-amber-100/60 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-amber-100 transition-colors">
                                    <div className="flex-1 space-y-2">
                                        <p className="text-sm font-medium text-gray-700">{selectedBook.subTitle}</p>
                                        <div className="border-t border-amber-200/80 my-2" />
                                        <h3 className="text-lg font-bold text-gray-900">{selectedBook.title}</h3>
                                        <p className="text-sm text-gray-600">{selectedBook.author}</p>
                                    </div>
                                    <Image
                                    width={24}
                                    height={32}                                    
                                    src={selectedBook.imageLink}
                                    alt={selectedBook.title}
                                    className="w-24 h-32 object-cover rounded-md shadow-md"
                                    />
                                </div>
                                </Link>
                            </section>
                        )}

                        <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Books</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {recommendedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                        </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Suggested Books</h2>
                            <div className="grid grid-cols-2 sm:grid-cols2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {suggestedBooks.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        </section>
                    </>
                    )}
                </main>
            </div>
        </div>
    );
}