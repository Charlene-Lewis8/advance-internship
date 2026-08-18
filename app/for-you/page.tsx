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
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
          ),
        ]);

        const selectedData = await selectedRes.json();
        const recommendedData = await recommendedRes.json();
        const suggestedData = await suggestedRes.json();

        setSelectedBook(
          Array.isArray(selectedData) ? selectedData[0] : selectedData,
        );
        setRecommendedBooks(recommendedData);
        setSuggestedBooks(suggestedData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBooks();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="w-full max-w-xl">
            <SearchBar onSearch={(query) => console.log("Searching:", query)} />
          </div>
        </header>
        <main className="p-8 max-w-5xl w-full mx-auto space-y-10">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {selectedBook && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Selected just for you
                  </h2>
                  <Link href={`/book/${selectedBook.id}`}>
                    <div className="bg-[#fbefd6] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-[#f6e7c8] transition-colors">
                      <div className="flex-1 text-sm text-gray-700 leading-relaxed">
                        {selectedBook.subTitle}
                      </div>
                      <div className="w-32 h-44 shrink-0 relative shadow-md rounded overflow-hidden">
                        <Image
                          src={selectedBook.imageLink}
                          alt={selectedBook.title}
                          className="w-full h-ful object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-base font-bold text-gray-900">
                          {selectedBook.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedBook.author}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 pt-2">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            ▶
                          </div>
                          <span>3 mins 23 secs</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Recommended Books
                </h2>
                <p className="text-sm text-gray-500 mb-4">We think you'll like these</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Suggested Books
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
