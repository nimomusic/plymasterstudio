import React from 'react';
import { Paddle } from '@paddle/paddle-js';

interface CheckoutButtonProps {
  paddle: Paddle | null; // 부모로부터 전달받음
  priceId: string;
  label?: string;
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  paddle,
  priceId, 
  label = "월 구독(Pricing)", 
  className 
}) => {

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!paddle) {
      return alert('결제 모듈을 불러오는 중입니다. 잠시만 기다려주세요.');
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: priceId, 
          quantity: 1,
        },
      ],
      // 비회원 결제이므로 customData는 생략하거나 필요한 정보만 전달합니다.
      // settings 객체를 추가하여 결제 완료 시의 동작을 제어할 수 있습니다.
      settings: {
        successCallback: (data) => {
          console.log('결제 성공 데이터:', data);
          alert('결제가 완료되었습니다! 입력하신 이메일로 이용권이 발송됩니다.');
          // 필요시 window.location.href = '/thank-you'; 등으로 리다이렉트
        }
      }
    });
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={!paddle} // 모듈 로드 전에는 클릭 방지
      className={`${className || "bg-[#006AFF] text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"} ${!paddle ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
};

export default CheckoutButton;
