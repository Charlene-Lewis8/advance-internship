'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Bookmark,
    PenTool,
    Search,
    Settings,
    HelpCircle,
    LogOut } from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
    { label: "For you", href: "/for-you", icon: Home},
    { label: "My Library", href: "/library", icon: Bookmark},
    { label: "Highlights", href: "/highlights", icon: PenTool},
    { label: "Search", href: "/search", icon: Search},
];

const secondaryNavItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help & Support", href: "/help", icon: HelpCircle },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col justify-between fixed left-0 top-0 z-40">
            <div className="p-6">
                <Link href="/for-you" className="flex items-center gap-2 5 mb-8">
                <div className="bg-emerald-500 text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center text-xl shadow-sm">S</div>
                <span className="font-extrabold text-2xl tracking-tight text-gray-900">Summarist</span>
                </Link>

                <nav className="space-y-1">
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                            key={item.href}
                            href={item.href}
                            className= {`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                isActive
                                ? "bg-emerald-50 text-emerald-600"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}>
                                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-6 border-t border-gray-100 space-y-4">
                
            </div>
        </aside>
    )
}