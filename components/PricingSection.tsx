import React, { useEffect, useState } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import CheckoutButton from './CheckoutButton';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  prices: Record<string, string>;
}

const PricingSection: React.FC = () => {
  // 💡 부모 컴포넌트에서 Paddle 인스턴스 상태 관리
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  // 💡 마운트 시 단 한 번만 Paddle 초기화 실행
  useEffect(() => {
    initializePaddle({
      environment: 'sandbox', // 실 결제 배포 시 'production'으로 변경 필요
      token: 'test_36fb9cd06ae33188ece34613e34', // 환경 변수(env)로 분리하는 것을 권장합니다.
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const products: Product[] = [
    {
      id: 'factory',
      name: '1. 팩토리 (준비중)',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
      description: '플레이리스트 제작 자동화 엔진',
      prices: {
        '1개월': 'a', // ⚠️ 팩토리 1개월 실제 ID로 변경 확인 필요
        '6개월': 'b',
        '12개월': 'c'
      }
    },
    {
      id: 'studio',
      name: '2. 스튜디오',
      image: 'https://raw.githubusercontent.com/nimomusic/plymasterstudio/46fee593a96b8ffc5bee39d00ea9bedc1ce9b80e/studio.jpg',
      description: '빠르고 쉽게 사용하는 스트리밍 & 영상 편집 툴',
      prices: {
        '1개월': 'pri_01kmmjqxgmc7dg2ctp63jj3v1r', // ⚠️ 스튜디오 1개월 실제 ID로 변경 확인 필요
        '6개월': 'pri_01kn8ry5xdpzdpwsw7rvzzbjhk',
        '12개월': 'pri_01kn8rzaqkg67wz390jjjtkk4y'
      }
    }
  ];

  const periods = [
    { 
      label: '1개월', 
      months: 1,
      display: (
        <span>
          <span className="text-red-500 font-extrabold">$11</span>/월(1개월)
        </span>
      )
    },
    { 
      label: '6개월', 
      months: 6,
      display: (
        <span>
          <span className="text-red-500 font-extrabold">$9</span>/월(6개월)
        </span>
      )
    },
    { 
      label: '12개월', 
      months: 12,
      display: (
        <span>
          <span className="text-red-500 font-extrabold">$7</span>/월(12개월)
        </span>
      )
    },
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[600px]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">플랜 선택</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto break-keep">
            Plymaster와 함께 플레이리스트 크리에이터의 길을 시작하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {products.map((product) => (
            <div key={product.id} className="glass-card rounded-[3rem] overflow-hidden flex flex-col group transition-transform duration-500 hover:-translate-y-2">
              <div className="p-8 pb-4">
                <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                <p className="text-white/50 text-sm">{product.description}</p>
              </div>

              <div className="px-8 mb-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              <div className="p-8 pt-0 flex flex-col gap-6 mt-auto">
                <div className="text-center">
                  <span className="text-xl font-bold text-[#006AFF]">이용권 구매</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {periods.map((period) => (
                    <CheckoutButton 
                      key={period.months} 
                      paddle={paddle} // 💡 초기화된 paddle 인스턴스를 props로 전달
                      priceId={product.prices[period.label]}
                      label={period.display}
                      className="w-full py-4 text-[11px] xs:text-xs md:text-sm font-bold bg-white/5 hover:bg-[#006AFF] border border-white/10 hover:border-[#006AFF] rounded-xl transition-all flex items-center justify-center whitespace-nowrap px-1"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
