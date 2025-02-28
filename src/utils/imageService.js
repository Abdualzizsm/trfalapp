import { createApi } from 'unsplash-js';

// إنشاء مثيل من Unsplash API
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY', // استخدام مفتاح API من متغيرات البيئة
});

/**
 * البحث عن صورة للوجهة السياحية
 * @param {string} destination - اسم الوجهة للبحث عن صور لها
 * @returns {Promise<string>} - رابط الصورة
 */
export const getDestinationImage = async (destination) => {
  try {
    const result = await unsplash.search.getPhotos({
      query: `${destination} travel`,
      page: 1,
      perPage: 1,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Error fetching image from Unsplash:', result.errors);
      return null;
    }

    if (result.response && result.response.results && result.response.results.length > 0) {
      return result.response.results[0].urls.regular;
    }

    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

/**
 * البحث عن مجموعة صور للوجهة السياحية
 * @param {string} destination - اسم الوجهة للبحث عن صور لها
 * @param {number} count - عدد الصور المطلوبة
 * @returns {Promise<Array<string>>} - مصفوفة من روابط الصور
 */
export const getDestinationImages = async (destination, count = 3) => {
  try {
    const result = await unsplash.search.getPhotos({
      query: `${destination} travel`,
      page: 1,
      perPage: count,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Error fetching images from Unsplash:', result.errors);
      return [];
    }

    if (result.response && result.response.results && result.response.results.length > 0) {
      return result.response.results.map(photo => ({
        url: photo.urls.regular,
        alt: photo.alt_description || `${destination} travel photo`,
        credit: {
          name: photo.user.name,
          link: photo.user.links.html
        }
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

// صور افتراضية للوجهات الشائعة
const defaultImages = {
  'دبي': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
  'باريس': 'https://images.unsplash.com/photo-1502602898657-59663e0ac1ad',
  'لندن': 'https://images.unsplash.com/photo-1513635269975-596e0e0ac1ad',
  'نيويورك': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
  'طوكيو': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
  'روما': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
  'برشلونة': 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
  'اسطنبول': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
  'القاهرة': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
  'بانكوك': 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5',
};

/**
 * الحصول على صورة افتراضية للوجهة
 * @param {string} destination - اسم الوجهة
 * @returns {string} - رابط الصورة الافتراضية
 */
export const getDefaultImage = (destination) => {
  // البحث عن تطابق جزئي
  const key = Object.keys(defaultImages).find(key => 
    destination.includes(key) || key.includes(destination)
  );
  
  return key ? defaultImages[key] : 'https://images.unsplash.com/photo-1488085061387-422e29b40080'; // صورة سفر عامة
};
