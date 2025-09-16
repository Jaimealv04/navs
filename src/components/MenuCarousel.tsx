import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '../data/menuData';
interface MenuCarouselProps {
  items: MenuItem[];
  title: string;
  autoPlay?: boolean;
}
const MenuCarousel: React.FC<MenuCarouselProps> = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  if (!items.length) return null;
  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
      {' '}
      {/* Title */}{' '}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-light text-white mb-16 text-center tracking-tight"
      >
        {' '}
        {title}{' '}
      </motion.h2>{' '}
      {/* Carousel Container */}{' '}
      <div className="relative">
        {' '}
        {/* Main Card */}{' '}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mx-auto max-w-2xl"
        >
          {' '}
          <div className="text-center">
            {' '}
            {/* Product Image Placeholder */}{' '}
            <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              {' '}
              <span className="text-white/60 text-sm">Imagen</span>{' '}
            </div>{' '}
            {/* Product Info */}{' '}
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              {' '}
              {items[currentIndex].name}{' '}
            </h3>{' '}
            <p className="text-white/70 text-lg mb-4">
              {' '}
              {items[currentIndex].description}{' '}
            </p>{' '}
            <p className="text-2xl font-bold text-white">
              {' '}
              {items[currentIndex].price}{' '}
            </p>{' '}
            {/* Category Badge */}{' '}
            <div className="mt-6">
              {' '}
              <span className="inline-block bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">
                {' '}
                {items[currentIndex].category}{' '}
              </span>{' '}
            </div>{' '}
          </div>{' '}
        </motion.div>{' '}
        {/* Navigation Buttons */}{' '}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          {' '}
          <ChevronLeft size={20} />{' '}
        </button>{' '}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          {' '}
          <ChevronRight size={20} />{' '}
        </button>{' '}
        {/* Dots Indicator */}{' '}
        <div className="flex justify-center gap-2 mt-8">
          {' '}
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
};
export default MenuCarousel;
