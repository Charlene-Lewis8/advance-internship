'use client';

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/book";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <Link href={`/book${book.id}`} className="block group">
            <div className="relative flex flex-col p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 bg-white">
                {book.subscriptionRequired && (
                    <span className="absolute top-2 right-2 bg-blue-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full z-10">
                        Premium
                    </span>
                )}
                <div className="relative w-full aspect-3/4 mb-3 overflow-hidden rounded-md bg-gray-50">
                <Image 
                src={book.imageLink}
                alt={book.title}
                fill
                className="w-full h-full object-cover group-hover:scale-10 transition-transform duration-300"
                />
                </div>
                <h3 className="font-bold text-gray-900 text-base line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 font-medium mb-1">{book.author}</p>
                <p className="text-xs text-gray-600 line-clamp-2 mb3">{book.subTitle}</p>
                <div className="mt-auto flex items-center space-x-1 text-xs font-medium text-gray-700">
                    <span className="text-yellow-400">☆</span>
                    <span>{book.averageRating}</span>
                </div>
            </div>
        </Link>
    );
}