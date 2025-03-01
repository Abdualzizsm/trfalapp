import { useState } from 'react';
import Head from 'next/head';
import TravelForm from '../components/TravelForm';
import TravelPlan from '../components/TravelPlan';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FaPlane, FaMapMarkedAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

export default function Home() {
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generatePlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء إنشاء خطة السفر');
      }

      const data = await response.json();
      setTravelPlan(data);
      setShowForm(false); // إخفاء النموذج بعد نجاح إنشاء الخطة
    } catch (err) {
      console.error('Error generating travel plan:', err);
      setError(err.message || 'حدث خطأ أثناء إنشاء خطة السفر');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setTravelPlan(null);
  };

  return (
    <div className="min-h-screen bg-ios-light-gray">
      <Head>
        <title>TraFl - مخطط رحلاتك الذكي</title>
        <meta name="description" content="تطبيق TraFl لتخطيط الرحلات باستخدام الذكاء الاصطناعي" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ios-blue mb-2">TraFl</h1>
          <p className="text-gray-600">مخطط رحلاتك الذكي باستخدام الذكاء الاصطناعي</p>
        </header>

        {loading && <LoadingSpinner message="جاري إنشاء خطة السفر... (قد تستغرق العملية حتى دقيقة واحدة)" />}
        
        {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}
        
        {showForm && !loading && (
          <div className="ios-card mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaPlane className="ml-2 text-ios-blue" />
              أدخل تفاصيل رحلتك
            </h2>
            <TravelForm onSubmit={handleFormSubmit} />
          </div>
        )}
        
        {travelPlan && !loading && !error && !showForm && (
          <>
            <div className="mb-4">
              <button 
                onClick={handleBackToForm}
                className="bg-ios-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                العودة إلى النموذج
              </button>
            </div>
            <TravelPlan plan={travelPlan} />
          </>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TraFl - جميع الحقوق محفوظة</p>
        </footer>
      </main>
    </div>
  );
}
