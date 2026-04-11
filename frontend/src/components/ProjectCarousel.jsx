import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getImageUrl } from '../services/api';

const ProjectCarousel = ({ images, title, autoSlideInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Use single image or first image from images array for backward compatibility
    const imageList = Array.isArray(images) && images.length > 0 ? images : [];
    const hasMultipleImages = imageList.length > 1;

    // Auto-slide effect
    useEffect(() => {
        if (!isAutoPlay || imageList.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [isAutoPlay, imageList, autoSlideInterval]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
        setIsAutoPlay(false); // Stop auto-play when user interacts
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
        setIsAutoPlay(false); // Stop auto-play when user interacts
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlay(false); // Stop auto-play when user interacts
    };

    // Resume auto-play after 10 seconds of inactivity
    useEffect(() => {
        if (!isAutoPlay && imageList.length > 0) {
            const resumeTimer = setTimeout(() => {
                setIsAutoPlay(true);
            }, 10000);
            return () => clearTimeout(resumeTimer);
        }
    }, [isAutoPlay, imageList.length]);

    if (imageList.length === 0) {
        return (
            <div className="w-full h-64 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/5 dark:to-white/10 group-hover:from-purple-200 group-hover:to-indigo-200 dark:group-hover:from-purple-500/10 dark:group-hover:to-indigo-500/10 transition-colors duration-500">
                <Target size={48} className="text-slate-400 dark:text-white/20" />
            </div>
        );
    }

    return (
        <div className="w-full relative group">
            {/* Main Image Container */}
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-[#0b1120] dark:via-[#0b1120]/60 to-transparent z-10 opacity-90 group-hover:opacity-75 transition-opacity duration-500 rounded-[2rem]"></div>

                {/* Image Carousel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={getImageUrl(imageList[currentIndex])}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons - Only show if multiple images */}
                {hasMultipleImages && (
                    <>
                        {/* Previous Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={goToPrevious}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-slate-800 dark:text-white shadow-lg backdrop-blur-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        {/* Next Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={goToNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-slate-800 dark:text-white shadow-lg backdrop-blur-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={20} />
                        </motion.button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
                            {imageList.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-white dark:bg-white/80 w-2 h-2'
                                        : 'bg-white/50 dark:bg-white/30 w-1.5 h-1.5 hover:bg-white/70 dark:hover:bg-white/50'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-white shadow-lg">
                            {currentIndex + 1} / {imageList.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectCarousel;
