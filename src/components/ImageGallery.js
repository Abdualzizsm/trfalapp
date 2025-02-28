import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { getDestinationImages, getDefaultImage } from '../utils/imageService';

/**
 * مكون معرض الصور للوجهة السياحية
 * يعرض صور للوجهة ويتيح التنقل بينها
 */
export default function ImageGallery({ destination }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // تحميل الصور عند تحميل المكون
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        // محاولة الحصول على صور من Unsplash
        let destinationImages = await getDestinationImages(destination);
        
        // إذا لم يتم العثور على صور، استخدم الصورة الافتراضية
        if (!destinationImages || destinationImages.length === 0) {
          const defaultImg = getDefaultImage(destination);
          destinationImages = [{
            url: defaultImg,
            alt: `${destination} travel photo`,
            credit: { name: 'Unsplash', link: 'https://unsplash.com' }
          }];
        }
        
        setImages(destinationImages);
      } catch (error) {
        console.error('Error loading images:', error);
        // استخدام صورة افتراضية في حالة الخطأ
        const defaultImg = getDefaultImage(destination);
        setImages([{
          url: defaultImg,
          alt: `${destination} travel photo`,
          credit: { name: 'Unsplash', link: 'https://unsplash.com' }
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    if (destination) {
      loadImages();
    }
  }, [destination]);
  
  // التنقل للصورة السابقة
  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // التنقل للصورة التالية
  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // فتح معرض الصور بالحجم الكامل
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setShowLightbox(true);
  };
  
  // إغلاق معرض الصور
  const closeLightbox = () => {
    setShowLightbox(false);
  };

  // إذا لم تكن هناك صور، لا تعرض شيئًا
  if (!images.length && !loading) {
    return null;
  }

  return (
    <div className="mb-6">
      {loading ? (
        <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
      ) : (
        <>
          {/* عرض الصور المصغرة */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="aspect-w-16 aspect-h-9 cursor-pointer rounded-lg overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          {/* عرض الصورة الرئيسية */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={images[currentIndex]?.url} 
              alt={images[currentIndex]?.alt}
              className="w-full h-64 object-cover"
            />
            
            {/* أزرار التنقل */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <FaArrowLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
            
            {/* معلومات الصورة */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
              <p className="text-xs">
                صورة بواسطة{' '}
                <a 
                  href={images[currentIndex]?.credit?.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {images[currentIndex]?.credit?.name}
                </a>
              </p>
            </div>
          </div>
          
          {/* معرض الصور بالحجم الكامل */}
          {showLightbox && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-gray-300"
                aria-label="Close lightbox"
              >
                <FaTimes />
              </button>
              
              <div className="relative max-w-4xl max-h-[90vh] w-full">
                <img 
                  src={images[currentIndex]?.url} 
                  alt={images[currentIndex]?.alt}
                  className="w-full h-full object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
                      aria-label="Previous image"
                    >
                      <FaArrowLeft />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
                      aria-label="Next image"
                    >
                      <FaArrowRight />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  <p>
                    {currentIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
