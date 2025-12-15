// Импорт типов Metadata из Next.js для определения метаданных страницы
import type { Metadata } from "next";

// Импорт шрифтов Geist и Geist_Mono из Google Fonts через Next.js
import { Geist, Geist_Mono } from "next/font/google";

// Импорт глобальных стилей приложения
import "./globals.css";

// Настройка основного шрифта sans-serif с переменной CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Настройка моноширинного шрифта с переменной CSS
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Определение метаданных для всего приложения
export const metadata: Metadata = {
  // Заголовок приложения, отображаемый во вкладке браузера
  title: "Демонстрация ApexCharts",
  // Описание приложения для SEO и социальных сетей
  description: "Интерактивная демонстрация библиотеки диаграмм ApexCharts",
};

// Основной корневой компонент макета приложения
export default function RootLayout({
  // Дочерние компоненты, которые будут отображаться внутри макета
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Возвращаем JSX структуру корневого макета
  return (
    // Корневой HTML элемент с указанием языка
    <html lang="ru">
      <head>
        {/* Критические стили для предотвращения FOUC: цвета и запасной шрифт */}
        <style>{`:root{--background:#ffffff;--foreground:#171717} @media (prefers-color-scheme:dark){:root{--background:#0a0a0a;--foreground:#ededed}} body{background:var(--background);color:var(--foreground);font-family:Arial,Helvetica,sans-serif;margin:0}`}</style>
      </head>
      {/* Тело документа с применением шрифтов и сглаживания шрифтов */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Отображение дочерних компонентов внутри макета */}
        {children}
      </body>
    </html>
  );
}