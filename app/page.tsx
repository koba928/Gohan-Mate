'use client';

import ShopCard from '../components/ShopCard';

const shops = [
  {
    name: '焼肉 太郎 本店',
    description: 'がっつり肉を食べたい日にぴったり',
    category: ['#がっつり', '#肉系'],
    image: 'https://images.unsplash.com/photo-1604980817787-1a4d6c0e6d91?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'うどん 花子',
    description: '優しい出汁の味わいでほっとする一杯',
    category: ['#和系', '#和食'],
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cafe まったり',
    description: '午後にぴったり、甘いスイーツでひと休み',
    category: ['#軽め', '#カフェ'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {shops.map((shop, idx) => (
        <ShopCard key={idx} {...shop} />
      ))}
    </main>
  );
}
