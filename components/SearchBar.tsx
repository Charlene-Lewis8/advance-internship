'use client';

import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    onSearch,
    placeholder = "Search for books or authors...",
}: SearchBarProps) {
    
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) {
            onSearch(value);
        }
      };

      const handleClear = () => {
        setQuery("");
        if (onSearch) {
            onSearch("");
        }
      };

    return (
        <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-o pl-3 5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />             
            </div>
            <input 
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-100 border border-transparent rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
            />
            {query && (
                <button
                onClick={handleClear}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
      );
}