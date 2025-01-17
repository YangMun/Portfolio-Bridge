import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { sampleProjects } from '../data/sampleProjects';

const Service = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  // 고유한 카테고리 목록 생성
  const categories = ['전체', ...new Set(sampleProjects.map(project => project.category))];

  // 프로젝트 필터링 함수 수정 - title과 author만 검색
  const filteredProjects = sampleProjects.filter(project => {
    const matchesCategory = selectedCategory === '전체' || project.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 헤더 섹션 */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
          >
            서비스
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto"
          >
            다양한 분야의 프리랜서 프로젝트들을 만나보세요
          </motion.p>
        </div>
      </section>

      {/* 검색 및 필터 섹션 */}
      <section className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* 검색바 - placeholder 텍스트 수정 */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="프로젝트/작성자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            
            {/* 카테고리 필터는 유지 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// 프로젝트 카드 컴포넌트
const ProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
  >
    <div className="aspect-video relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 text-white text-sm rounded-full">
        {project.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-600"></div>
        <span className="text-gray-300">{project.author}</span>
      </div>
    </div>
  </motion.div>
);

export default Service; 