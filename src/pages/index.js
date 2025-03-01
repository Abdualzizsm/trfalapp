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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ios-blue mb-2">TraFl</h1>
          <p className="text-gray-600">مخطط رحلاتك الذكي باستخدام الذكاء الاصطناعي</p>
        </header>

        {loading ? (
          <div className="ios-card mb-8 p-8 text-center transition-all duration-500 ease-in-out">
            <LoadingSpinner message="جاري إنشاء خطة السفر... قد تستغرق العملية حتى دقيقة واحدة" />
            <p className="mt-4 text-gray-600">نحن نعمل على إنشاء خطة سفر مخصصة لك باستخدام الذكاء الاصطناعي. يرجى الانتظار...</p>
            <div className="mt-6 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-ios-blue animate-pulse rounded-full"></div>
            </div>
          </div>
        ) : error ? (
          <div className="ios-card mb-8 p-8 transition-all duration-500 ease-in-out">
            <ErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        ) : showForm ? (
          <div className="ios-card mb-8 transition-all duration-500 ease-in-out">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaPlane className="ml-2 text-ios-blue" />
              أدخل تفاصيل رحلتك
            </h2>
            <TravelForm onSubmit={handleFormSubmit} />
          </div>
        ) : travelPlan ? (
          <div className="transition-all duration-500 ease-in-out">
            <div className="mb-4">
              <button 
                onClick={handleBackToForm}
                className="bg-ios-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                العودة إلى النموذج
              </button>
            </div>
            <TravelPlan plan={travelPlan} />
          </div>
        ) : null}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TraFl - جميع الحقوق محفوظة</p>
        </footer>
      </main>
    </div>
  );
}
