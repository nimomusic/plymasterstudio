import React, { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Shield, FileText, RotateCcw, Mail } from 'lucide-react';

interface PolicyViewProps {
  initialTab: 'privacy' | 'terms' | 'refund';
  setView: (view: any, manualTab?: 'studio' | 'factory') => void;
}

type LangType = 'ko' | 'en';

const safeScrollToTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.warn("window.scrollTo smooth failed, trying fallback:", error);
    try {
      window.scrollTo(0, 0);
    } catch (fallbackError) {
      console.warn("window.scrollTo completely blocked in this environment:", fallbackError);
    }
  }
};

export const PolicyView: React.FC<PolicyViewProps> = ({ initialTab, setView }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund'>(initialTab);
  const [lang, setLang] = useState<LangType>('ko');

  useEffect(() => {
    setActiveTab(initialTab);
    safeScrollToTop();
  }, [initialTab]);

  const handleTabChange = (tab: 'privacy' | 'terms' | 'refund') => {
    setActiveTab(tab);
    safeScrollToTop();
  };

  const supportEmail = 'plymaster.help@gmail.com';

  const policies = {
    terms: {
      title: {
        ko: '이용약관',
        en: 'Terms of Service'
      },
      content: {
        ko: [
          {
            num: '1',
            title: '약관 동의',
            body: '이용자는 Plymaster Factory & Studio("서비스")에 접속하거나 이를 사용함으로써 본 이용약관에 동의하게 됩니다. 본 약관에 동의하지 않는 경우 서비스 이용을 중단해 주시기 바랍니다.'
          },
          {
            num: '2',
            title: '서비스 개요',
            body: 'Plymaster Factory는 Suno AI음악 자동 생성 Plymaster Studio는 플레이리스트 영상 제작 전용 영상 편집 툴과 스트리밍을 제공합니다. 본 서비스는 팩토리(Factory) 및 스튜디오(Studio) 플랜 등을 포함한 다양한 구독 형태로 제공됩니다.'
          },
          {
            num: '3',
            title: '결제 및 청구',
            body: '본 서비스의 모든 주문 및 결제 처리는 디지털 상품 판매 플랫폼인 리틀리(litt.ly)를 통해 이루어집니다. 구독 및 상품을 구매함과 동시에 이용자는 리틀리의 결제 이용약관에 동의하는 것으로 간주됩니다. 구독료는 선택한 플랜(1개월, 6개월, 12개월 등)에 따라 선불로 자동 청구 및 결제됩니다.'
          },
          {
            num: '4',
            title: '환불 정책',
            body: '디지털 소프트웨어 및 서비스의 특성상 원칙적으로 라이선스가 발급되어 사용 이력이 있거나 상품이 제공된 이후에는 환불이 불가합니다. 단, 결제일로부터 7일 이내에 서비스를 전혀 사용하지 않은 경우에는 전액 환불을 요청할 권리가 있습니다. 이용자는 향후 결제를 방지하기 위해 언제든지 리틀리(litt.ly)를 통해 구독을 취소할 수 있습니다. 소프트웨어 사용이 불가능한 기술적 문제가 발생한 경우 고객 지원팀으로 문의해 주시기 바랍니다.'
          },
          {
            num: '5',
            title: '라이선스 및 사용 제한',
            body: [
              '이용자에게는 서비스를 사용할 수 있는 비독점적이고 양도 불가능한 라이선스가 부여됩니다. 이용자는 다음 행위를 하지 않을 것에 동의합니다:',
              '• 서비스의 일부를 리버스 엔지니어링, 디컴파일 또는 분해하는 행위',
              '• 소프트웨어를 제3자에게 재판매, 임대 또는 하위 라이선스 부여하는 행위',
              '• 불법, 저작권 침해 또는 악의적인 콘텐츠를 생성하거나 배포하기 위해 서비스를 사용하는 행위'
            ]
          },
          {
            num: '6',
            title: '지식재산권',
            body: '이용자가 Plymaster Factory & Studio를 사용하여 생성한 콘텐츠(플레이리스트, 영상, 오디오 등)에 대한 모든 소유권은 이용자에게 있습니다. 기반 기술, 알고리즘 및 인터페이스를 포함한 Plymaster Factory & Studio 소프트웨어에 대한 모든 권리와 이익은 당사에 귀속됩니다.'
          },
          {
            num: '7',
            title: '책임 제한',
            body: '법이 허용하는 최대 한도 내에서, Plymaster Factory & Studio는 이용자의 서비스 사용 또는 사용 불능으로 인해 발생하는 간접적, 우발적, 특수한 혹은 결과적 손해에 대해 책임을 지지 않습니다.'
          },
          {
            num: '8',
            title: '약관 변경',
            body: '당사는 언제든지 본 약관을 수정할 수 있는 권리를 보유합니다. 약관 변경 후에도 서비스를 계속 사용하는 것은 해당 변경 사항에 동의하는 것으로 간주됩니다.'
          }
        ],
        en: [
          {
            num: '1',
            title: 'Acceptance of Terms',
            body: 'By accessing or using Plymaster Factory & Studio ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.'
          },
          {
            num: '2',
            title: 'Description of Service',
            body: 'Plymaster Factory & Studio provides automated playlist creation, high-quality streaming, and video editing tools. The Service is offered in various subscription plans, including but not limited to the Factory and Studio plans.'
          },
          {
            num: '3',
            title: 'Payment and Billing',
            body: 'Our order process and payments are conducted through the digital creator platform, litt.ly. By purchasing a subscription, you agree to litt.ly’s checkout terms and conditions. Subscriptions are billed in advance on a recurring basis (e.g., monthly, semi-annually, or annually) depending on the plan you select.'
          },
          {
            num: '4',
            title: 'Refund Policy',
            body: 'Due to the digital nature of the Service, refunds are generally not provided once a license has been activated or the service has been used. However, you have the right to request a full refund within 7 days of your initial purchase, provided you have not used the Service. You may cancel your subscription at any time via litt.ly to prevent future billing. If you experience technical issues that prevent you from using the software, please contact our support team.'
          },
          {
            num: '5',
            title: 'License and Usage Restrictions',
            body: [
              'You are granted a non-exclusive, non-transferable license to use the Service. You agree not to:',
              '• Reverse engineer, decompile, or disassemble any part of the Service.',
              '• Resell, lease, or sub-license the software to third parties.',
              '• Use the Service to create or distribute illegal, infringing, or malicious content.'
            ]
          },
          {
            num: '6',
            title: 'Intellectual Property',
            body: 'You retain all ownership rights to the content (playlists, videos, audio) you create using Plymaster Factory & Studio. We retain all rights, title, and interest in and to the Plymaster Factory & Studio software, including all underlying technology, algorithms, and interfaces.'
          },
          {
            num: '7',
            title: 'Limitation of Liability',
            body: 'To the maximum extent permitted by law, Plymaster Factory & Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.'
          },
          {
            num: '8',
            title: 'Changes to Terms',
            body: 'We reserve the right to modify these Terms at any time. Continued use of the Service after any such changes shall constitute your consent to such changes.'
          }
        ]
      }
    },
    privacy: {
      title: {
        ko: '개인정보처리방침',
        en: 'Privacy Policy'
      },
      content: {
        ko: [
          {
            num: '1',
            title: '개요',
            body: 'Plymaster Factory & Studio에 오신 것을 환영합니다. 당사는 이용자의 개인정보를 소중하게 생각하며, 관련 법령을 준수하여 개인정보를 보호하고 있습니다. 본 방침은 이용자가 당사의 서비스 및 웹사이트를 이용할 때 수집되는 정보의 종류와 이용 목적, 그리고 제3자 제공에 대해 설명합니다.'
          },
          {
            num: '2',
            title: '수집하는 개인정보 항목 및 방법',
            body: [
              '• 개인정보: 소프트웨어 구독 결제 시, 라이선스 발급 및 서비스 안내를 위해 이메일 주소를 수집합니다.',
              '• 결제 정보: 모든 결제는 당사가 이용하는 플랫폼인 리틀리(litt.ly)를 통해 안전하게 처리됩니다. 당사는 이용자의 신용카드 번호 등 민감한 금융 정보를 직접 수집하거나 서버에 저장하지 않습니다.',
              '• 이용 데이터: 서비스 개선을 위해 이용자의 기기 사양 정보 및 웹사이트 상호작용 정보와 같은 비개인정보를 수집할 수 있습니다.'
            ]
          },
          {
            num: '3',
            title: '개인정보의 이용 목적',
            body: [
              '수집된 개인정보는 다음의 목적을 위해 활용됩니다:',
              '• 소프트웨어 이용권(팩토리, 스튜디오 플랜 등) 라이선스 발급 및 자동화 처리',
              '• 주문 확인, 서비스 업데이트 등 관리자 안내 메일 발송',
              '• 고객 문의 응대 및 지원'
            ]
          },
          {
            num: '4',
            title: '개인정보의 제3자 제공 및 처리 위탁',
            body: [
              '원활한 서비스 제공과 자동화된 라이선스 발급을 위해 아래의 신뢰할 수 있는 외부 서비스에 개인정보 처리를 위탁하고 있습니다.',
              '• 리틀리(litt.ly): 결제 처리, 영수증 발급 및 주문 관리',
              '• Make.com & Google.com: 결제 완료 시 라이선스 자동 발급 및 고객 데이터베이스 관리를 위한 클라우드 환경 연동'
            ]
          },
          {
            num: '5',
            title: '개인정보의 보유 및 보안',
            body: '당사는 서비스 제공 목적이 달성될 때까지, 또는 관련 법령에서 정한 보존 기간 동안 개인정보를 안전하게 보관합니다. 또한, 무단 접근이나 유출을 막기 위해 보안성이 검증된 클라우드 데이터베이스만을 사용합니다.'
          },
          {
            num: '6',
            title: '이용자의 권리 및 행사 방법',
            body: '이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다. 구독을 취소하거나 개인정보 삭제를 원하시는 경우 아래 문의처로 연락해 주시면 지체 없이 조치하겠습니다.'
          },
          {
            num: '7',
            title: '문의처',
            body: `개인정보 보호와 관련된 문의 사항이 있으신 경우 아래 연락처로 문의해 주시기 바랍니다. 이메일: ${supportEmail}`
          }
        ],
        en: [
          {
            num: '1',
            title: 'Introduction',
            body: 'Welcome to Plymaster Factory & Studio. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you use our software and website.'
          },
          {
            num: '2',
            title: 'Information We Collect',
            body: [
              '• Personal Information: When you purchase a subscription, we collect your email address to issue your software license and send related notifications.',
              '• Payment Information: All payments are securely processed through our payment platform, litt.ly. We do not collect, process, or store your credit card details or billing information on our servers.',
              '• Usage Data: We may collect non-personal information about your device and how you interact with our website to improve our services.'
            ]
          },
          {
            num: '3',
            title: 'How We Use Your Information',
            body: [
              'We use the collected information for the following purposes:',
              '• To issue, manage, and verify your software licenses (e.g., Factory, Studio plans).',
              '• To send you administrative information, such as order confirmations and updates.',
              '• To respond to customer support inquiries.'
            ]
          },
          {
            num: '4',
            title: 'Third-Party Service Providers',
            body: [
              'To operate our service efficiently, we share your data with trusted third-party providers:',
              '• litt.ly: Payment processing, receipt issuance, and order management.',
              '• Make.com & Google.com: Used securely for automating the distribution of license keys and managing our customer database.'
            ]
          },
          {
            num: '5',
            title: 'Data Retention and Security',
            body: 'We keep your personal information only for as long as necessary for the purposes set out in this Privacy Policy. We implement standard technical and organizational security measures to protect your data from unauthorized access.'
          },
          {
            num: '6',
            title: 'Your Privacy Rights',
            body: 'Depending on your location, you may have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us at the email provided below.'
          },
          {
            num: '7',
            title: 'Contact Us',
            body: `If you have any questions or concerns about this Privacy Policy, please contact us at: ${supportEmail}`
          }
        ]
      }
    },
    refund: {
      title: {
        ko: '환불 정책',
        en: 'Refund Policy'
      },
      content: {
        ko: [
          {
            num: '1',
            title: '일반 개요',
            body: '당사의 모든 결제는 디지털 판매 플랫폼인 리틀리(litt.ly)를 통해 이루어집니다. Plymaster Factory & Studio는 무형의 디지털 서비스 및 소프트웨어이므로, 어뷰징을 방지하고 공정한 서비스 제공을 위해 아래와 같은 엄격한 환불 규정을 적용합니다.'
          },
          {
            num: '2',
            title: '환불 가능 기준',
            body: [
              '다음 조건에 해당하는 경우 전액 환불을 받으실 수 있습니다:',
              '• 7일 환불 규정: 최초 결제일로부터 7일 이내에 라이선스를 등록하거나 서비스를 사용한 이력이 전혀 없는 경우 구매를 취소하고 전액 환불을 요청할 수 있습니다.',
              '• 치명적인 기술적 결함: 당사 서버 또는 소프트웨어의 결함으로 인해 정상적인 이용이 불가능하며, 고객 지원팀을 통해서도 합리적인 시간 내에 문제가 해결되지 않는 경우.'
            ]
          },
          {
            num: '3',
            title: '환불 불가 기준',
            body: [
              '다음과 같은 상황에서는 환불이 제공되지 않습니다:',
              '• 서비스(라이선스) 사용 이력이 있는 경우.',
              '• 7일 환불 보장 기간이 경과한 이후의 단순 변심.',
              '• 다음 결제일(갱신일) 이전에 구독을 취소하는 것을 잊어버려 자동 결제가 진행된 경우. (구독 관리의 책임은 이용자에게 있습니다).',
              '• 이용자의 PC 환경이나 인터넷 문제로 인해 소프트웨어를 구동하지 못하는 경우.'
            ]
          },
          {
            num: '4',
            title: '구독 취소',
            body: 'Plymaster Factory & Studio의 구독은 언제든지 취소할 수 있습니다. 구독을 취소하면 다음 결제일부터 요금이 청구되지 않지만, 서비스를 이미 사용했거나 최초 7일 환불 기간이 지난 이후에는 결제된 당월(또는 해당 결제 주기) 요금이 부분 환불되지 않습니다. 취소하더라도 남은 결제 기간 동안에는 서비스를 정상적으로 이용하실 수 있습니다.'
          },
          {
            num: '5',
            title: '환불 요청 방법',
            body: `환불을 원하시는 경우, 구매 시 사용한 이메일 주소와 리틀리(litt.ly)에서 발행한 영수증의 주문 번호를 기재하여 아래 고객 지원팀으로 문의해 주시기 바랍니다. 문의 이메일: ${supportEmail}`
          }
        ],
        en: [
          {
            num: '1',
            title: 'General Overview',
            body: 'Our payment process is conducted through the digital platform litt.ly. Because Plymaster Factory & Studio is a digital service and software, our refund policy is strictly outlined to prevent abuse while ensuring fairness.'
          },
          {
            num: '2',
            title: 'Eligibility for Refunds',
            body: [
              'You may be eligible for a full refund under the following conditions:',
              '• 7-Day Cancellation Right: You have the right to request a full refund within 7 days of your initial purchase, strictly provided that you have NOT activated the license or used the Service.',
              '• Technical Issues: The software fails to function as advertised due to a technical error on our end, and our support team is unable to resolve the issue within a reasonable timeframe.'
            ]
          },
          {
            num: '3',
            title: 'Non-Refundable Cases',
            body: [
              'We do not grant refunds in the following situations:',
              '• You have activated or used the Service.',
              '• You changed your mind after the 14-day cancellation period.',
              '• You forgot to cancel your subscription before the next billing cycle. (You are responsible for managing your subscription).',
              '• You lack the hardware or internet requirements necessary to run the software.'
            ]
          },
          {
            num: '4',
            title: 'Subscription Cancellations',
            body: 'You may cancel your Plymaster Factory & Studio subscription at any time. Canceling a subscription will prevent future recurring charges, but it will not automatically refund the current billing period once the service has been used or the initial 7-day window has passed. You will retain access to the Service until the end of your current paid period.'
          },
          {
            num: '5',
            title: 'How to Request a Refund',
            body: `To request a refund, please contact our support team with your order number (provided by litt.ly) and the email address used for the purchase. Contact Email: ${supportEmail}`
          }
        ]
      }
    }
  };

  const currentPolicy = policies[activeTab];

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto min-h-[70vh] relative z-10" id="policy-container">
      {/* Back navigation & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <button
            onClick={() => setView('hero')}
            className="group flex items-center gap-2 text-white/60 hover:text-[#006AFF] transition-colors mb-4 text-sm font-medium"
            id="btn-back-home"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            홈으로 돌아가기
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" id="policy-main-title">
            {currentPolicy.title[lang]}
          </h1>
        </div>

        {/* Global Controls: Sub-navigation & Language toggle */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sub-nav for other policies */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl" id="policy-subnav">
            <button
              onClick={() => handleTabChange('terms')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#006AFF] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              id="subnav-terms"
            >
              이용약관
            </button>
            <button
              onClick={() => handleTabChange('privacy')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'privacy'
                  ? 'bg-[#006AFF] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              id="subnav-privacy"
            >
              개인정보처리방침
            </button>
            <button
              onClick={() => handleTabChange('refund')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'refund'
                  ? 'bg-[#006AFF] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              id="subnav-refund"
            >
              환불정책
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs md:text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
            id="btn-lang-toggle"
          >
            <Globe className="w-4 h-4 text-[#006AFF]" />
            {lang === 'ko' ? 'English' : '한국어'}
          </button>
        </div>
      </div>

      {/* Structured Content Card */}
      <div className="glass-card p-6 md:p-10 rounded-[2rem] border-white/5 bg-white/[0.02] backdrop-blur-xl" id="policy-content-card">
        <div className="space-y-10">
          {currentPolicy.content[lang].map((section, idx) => (
            <div key={idx} className="border-b border-white/5 last:border-0 pb-8 last:pb-0">
              <div className="flex items-start gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#006AFF]/10 text-[#006AFF] border border-[#006AFF]/20 text-sm font-mono font-bold shrink-0">
                  {section.num}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight pt-0.5">
                  {section.title}
                </h2>
              </div>
              <div className="pl-12 text-white/70 leading-relaxed text-sm md:text-base space-y-3">
                {Array.isArray(section.body) ? (
                  section.body.map((paragraph, pIdx) => {
                    const isBullet = paragraph.startsWith('•');
                    return (
                      <p
                        key={pIdx}
                        className={`${
                          isBullet 
                            ? 'pl-4 text-white/60 text-sm py-1 border-l border-white/10 bg-white/[0.01] rounded-r-lg' 
                            : 'font-medium'
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })
                ) : (
                  <p>{section.body}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer support callout inside policy page */}
      <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#006AFF]/10 to-transparent border border-[#006AFF]/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#006AFF] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#006AFF]/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">추가 문의사항이 있으신가요?</h3>
            <p className="text-white/50 text-sm">Plymaster 고객 지원팀이 친절히 안내해 드립니다.</p>
          </div>
        </div>
        <a
          href={`mailto:${supportEmail}`}
          className="px-6 py-3 bg-[#006AFF] hover:bg-[#005cd4] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#006AFF]/15 whitespace-nowrap"
        >
          {supportEmail}
        </a>
      </div>
    </div>
  );
};
