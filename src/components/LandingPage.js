import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, Users, Star, ArrowRight } from 'lucide-react';
import { sampleProjects } from '../data/sampleProjects';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = sampleProjects.map(project => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = project.image;
          img.onload = resolve;
        });
      });

      await Promise.all(imagePromises);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            당신의 재능을<br />세상과 연결하세요
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            프리랜서들을 위한 최적의 포트폴리오 플랫폼
            당신의 작품이 빛날 수 있는 공간을 만들어드립니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/service')}
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              시작하기
            </button>
            <button className="px-8 py-4 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-600 transition-all">
              더 알아보기
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="text-white/50" />
        </motion.div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Briefcase />}
              title="포트폴리오 쇼케이스"
              description="당신만의 독특한 작품을 멋지게 전시하세요. 맞춤형 레이아웃으로 작품의 가치를 높여드립니다."
            />
            <FeatureCard 
              icon={<Users />}
              title="클라이언트 연결"
              description="잠재적 클라이언트와 직접 소통하세요. 새로운 기회가 당신을 기다립니다."
            />
            <FeatureCard 
              icon={<Star />}
              title="전문가 커뮤니티"
              description="같은 분야의 전문가들과 교류하며 함께 성장하세요."
            />
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            무료로 시작하여 당신의 작품을 세상에 선보이세요
          </p>
          <button 
            onClick={() => navigate('/service')}
            className="group px-8 py-4 bg-white text-purple-900 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2"
          >
            무료로 시작하기
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 프로젝트 슬라이더 */}
        <div className="relative w-full overflow-hidden">
          {isLoaded ? (
            <motion.div
              className="flex gap-6"
              initial={{ x: "0%" }}
              animate={{
                x: [`0%`, `-${(100 / 3)}%`],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 70,
                  ease: "linear",
                  delay: 0.5,
                },
              }}
              style={{
                width: `${sampleProjects.length * 3 * 100}%`,
              }}
            >
              {/* 세 번 반복하여 부드러운 무한 스크롤 구현 */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-6">
                  {sampleProjects.map(project => (
                    <ProjectCard 
                      key={`${project.id}-${i}`} 
                      project={project}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-pulse text-white/50">로딩중...</div>
            </div>
          )}

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-purple-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-indigo-900 to-transparent z-10" />
        </div>
      </section>
    </div>
  );
};

// 특징 카드 컴포넌트
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="p-8 bg-gray-800 rounded-2xl hover:bg-gray-700/50 transition-all"
  >
    <div className="w-12 h-12 bg-purple-700 rounded-xl flex items-center justify-center text-white mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// 프로젝트 카드 컴포넌트
const ProjectCard = ({ project }) => (
  <motion.div
    className="flex-none w-72 h-96 rounded-xl overflow-hidden relative group"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className="w-full h-full object-cover"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
        <p className="text-sm text-gray-300 mb-2">by {project.author}</p>
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs">
          {project.category}
        </span>
      </div>
    </div>
  </motion.div>
);

export default LandingPage; 