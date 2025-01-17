import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Code, Users, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const AnimatedCube = () => (
  <motion.div
    animate={{ 
      rotateY: [0, 360],
      rotateX: [0, 360]
    }}
    transition={{
      duration: 20,
      ease: "linear",
      repeat: Infinity
    }}
    className="w-64 h-64 relative"
  >
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="absolute inset-0 border-2 border-purple-500 rounded-lg transform"
        style={{
          transform: `rotateY(${index * 60}deg) translateZ(150px)`,
          backfaceVisibility: 'hidden'
        }}
      />
    ))}
  </motion.div>
);

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { damping: 20, stiffness: 100 };
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "혁신적 기술",
      description: "최신 기술로 새로운 가치를 창출합니다"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "사용자 중심",
      description: "사용자의 니즈를 최우선으로 생각합니다"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "빠른 성장",
      description: "지속적인 혁신으로 빠르게 성장합니다"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "신뢰와 안전",
      description: "안전한 플랫폼 환경을 제공합니다"
    }
  ];

  const handleStartClick = () => {
    navigate('/service');
  };

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* 히어로 섹션 */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black">
          <GridPattern />
        </div>
        <motion.div
          style={{
            scale: springScale,
            y: springY,
            opacity
          }}
          className="relative z-10 text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
          >
            Daily Cycle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            혁신을 향한 끊임없는 여정
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>

      {/* 특징 섹션 */}
      <section className="min-h-screen py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900">
          <GridPattern />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              우리의 가치
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-purple-500 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D 애니메이션 섹션 */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                혁신적인 기술로
                <br />
                새로운 경험을
                <br />
                창조합니다
              </h2>
              <p className="text-xl text-gray-400 font-light">
                최첨단 AI 기술과 빅데이터를 활용하여
                <br />
                프리랜서와 기업 간의 완벽한 매칭을 실현합니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[600px] perspective-1000 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform rotate-6 opacity-20 blur-3xl"></div>
              <AnimatedCube />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                'linear-gradient(to right, rgba(147, 51, 234, 0.5), rgba(219, 39, 119, 0.5))',
                'linear-gradient(to right, rgba(219, 39, 119, 0.5), rgba(147, 51, 234, 0.5))'
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 opacity-80"
          />
          <GridPattern />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              함께 만들어가는
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                새로운 미래
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
              지금 바로 Daily Cycle과 함께
              <br />
              당신의 새로운 여정을 시작하세요
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartClick}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-semibold hover:opacity-90 transition-opacity"
            >
              시작하기
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;