"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Страница не найдена</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Извините, мы не смогли найти страницу, которую вы искали.
        </p>
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Назад
          </button>
          <Link href="/" className="ml-4 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}