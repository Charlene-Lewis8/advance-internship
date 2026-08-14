"use client";

import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="space-y-10 animate-pulse">
      <section>
        <div className="h-6 w-48 bg-gray-200 rounded-md mb-4" />
        <div className="bg-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-3 w-full">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-2/3 bg-gray-200 rounded mt-4" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
          </div>
          <div className="w-24 h-32 bg-gray-200 rounded-me shrink-0" />
        </div>
      </section>
      <section>
        <div className="h-6 w-52 bg-gray-200 rounded-md mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:gird-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-4 rounded-xl border border-gray-100 bg-white space-y-3"
            >
              <div className="w-full aspect-3/4 bg-gray-200 rounded-md" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
