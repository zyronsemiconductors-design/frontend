import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slide } from '../types';

interface HeroCarouselProps {
  slides: Slide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const resetAnimating = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { }, 900);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resetAnimating();
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetAnimating();
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    resetAnimating();
  };

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear
                ${isActive ? 'scale-110' : 'scale-100'}`}
              />
              {/* 🔥 Strong black overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl text-white">

                  {/* Subtitle */}
                  <div
                    className={`mb-4 inline-block bg-brand-accent/90 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm
                    transition-all duration-700 delay-200
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  >
                    {slide.subtitle}
                  </div>

                  {/* Title */}
                  <h1
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6
                    transition-all duration-700 delay-300
                    ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl
                    transition-all duration-700 delay-500
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`flex flex-col sm:flex-row gap-4
                    transition-all duration-700 delay-700
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  >
                    {/* 🔶 Primary button */}
                    <button
                      onClick={() => navigate('/services')}
                      className="bg-brand-accent hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Our Services
                    </button>

                    {/* 🪟 Glass button */}
                    <button
                      onClick={() => navigate('/contact')}
                      className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-lg
                      hover:bg-white/20 transition-all duration-300 shadow-lg"
                    >
                      Contact Us
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Dots */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1 rounded-full transition-all duration-500
                ${index === currentIndex ? 'w-12 bg-brand-accent' : 'w-6 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
