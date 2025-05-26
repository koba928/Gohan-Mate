'use client';

import ShopCard from '../components/ShopCard';

const shops = [
  {
    name: '焼肉 太郎',
    image: 'https://images.unsplash.com/photo-1709433420574-7e8b97952eed?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'がっつり肉を食べたい日にぴったり',
    category: ['#がっつり', '#肉系']
  },
  
  {
    name: 'うどん 花子',
    image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '優しい出汁の味わいでほっとする一杯',
    category: ['#和風', '#軽め']
  },
  
  {
    name: 'カフェ まったり',
    image: 'https://images.unsplash.com/photo-1564327368633-151ef1d45021?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '午後にひとやすみ。甘いスイーツでひと休み',
    category: ['#カフェ', '#スイーツ']
  }
  
]




export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {shops.map((shop, idx) => (
        <ShopCard key={idx} {...shop} />
      ))}
    </main>
  );
}
