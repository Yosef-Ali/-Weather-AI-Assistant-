import { WeatherChat } from '@/components/weather-chat';
import { Cloud } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-100 to-white dark:from-sky-900 dark:to-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="h-6 w-6" />
            <span className="font-bold">Weather AI Assistant</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <WeatherChat />
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js and OpenAI. This is a demo application.
          </p>
        </div>
      </footer>
    </div>
  );
}