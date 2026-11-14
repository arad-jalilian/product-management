import Image from 'next/image';
import Link from 'next/link';
import { getHomepageContent } from '@/lib/redis';

export default async function Home() {
  const { hero, about, cta } = await getHomepageContent();

  return (
    <section className="page p-8 max-w-2xl mx-auto text-center space-y-6">
      <p className="eyebrow text-gray-500 uppercase tracking-widest text-sm">TechHub</p>
      
      <h1 className="text-4xl font-bold">{hero}</h1>
      
      <p className="description text-lg text-gray-700">{about}</p>

      <div className="card flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm border">
        <Image
          src="https://res.cloudinary.com/b4tnlxer/image/upload/v1794674493/logo.png"
          width={200}
          height={200}
          alt="TechHub Logo"
          priority
        />
      </div>

      <div className="pt-4">
        <Link 
          href="/products" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block font-semibold"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}