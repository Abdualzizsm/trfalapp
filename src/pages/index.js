import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TravelForm from '../components/TravelForm';
import TravelPlan from '../components/TravelPlan';
import LoadingIndicator from '../components/LoadingIndicator';
import { FaPlane, FaMagic, FaGlobe, FaRoute, FaSave, FaTrash } from 'react-icons/fa';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [travelData, setTravelData] = useState(null);
  const [error, setError] = useState(null);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  
  // تحميل الخطط المحفوظة عند تحميل الصفحة
  useEffect(() => {
    const loadSavedPlans = () => {
      try {
        const saved = localStorage.getItem('savedTravelPlans');
        if (saved) {
          const parsedPlans = JSON.parse(saved);
          setSavedPlans(parsedPlans);
        }
      } catch (error) {
        console.error('Error loading saved plans:', error);
      }
    };
    
    loadSavedPlans();
  }, []);
  
  const handleGeneratePlan = async (formData) => {
    setLoading(true);
    setError(null);
    setTravelData(formData);
    
    try {
      const response = await fetch('/api/generatePlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('فشل في إنشاء خطة السفر');
      }
      
      const data = await response.json();
      setTravelPlan(data.plan);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء خطة السفر. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartOver = () => {
    setTravelPlan(null);
    setTravelData(null);
    setError(null);
    setShowSavedPlans(false);
  };
  
  const handleLoadSavedPlan = (savedPlan) => {
    setTravelPlan(savedPlan.plan);
    setTravelData({
      destination: savedPlan.destination,
      startDate: savedPlan.startDate,
      endDate: savedPlan.endDate,
      travelers: savedPlan.travelers,
      duration: Math.ceil((new Date(savedPlan.endDate) - new Date(savedPlan.startDate)) / (1000 * 60 * 60 * 24))
    });
    setShowSavedPlans(false);
  };
  
  const handleDeleteSavedPlan = (planId) => {
    try {
      const updatedPlans = savedPlans.filter(plan => plan.id !== planId);
      localStorage.setItem('savedTravelPlans', JSON.stringify(updatedPlans));
      setSavedPlans(updatedPlans);
      alert('تم حذف الخطة بنجاح');
    } catch (error) {
      console.error('Error deleting saved plan:', error);
      alert('حدث خطأ أثناء حذف الخطة');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Head>
        <title>TraFl - خطط رحلتك الذكية</title>
        <meta name="description" content="استخدم الذكاء الاصطناعي لإنشاء خطة سفر مخصصة" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-center md:justify-between items-center">
          <div className="flex items-center text-2xl font-bold text-ios-blue">
            <FaPlane className="mr-2" />
            <span>TraFl</span>
          </div>
          
          <nav className="hidden md:flex space-x-6 text-gray-600">
            <a href="#" className="hover:text-ios-blue transition-colors">الرئيسية</a>
            {savedPlans.length > 0 && (
              <button 
                onClick={() => setShowSavedPlans(!showSavedPlans)}
                className="hover:text-ios-blue transition-colors"
              >
                <FaSave className="inline-block ml-1" /> الخطط المحفوظة ({savedPlans.length})
              </button>
            )}
            <a href="#features" className="hover:text-ios-blue transition-colors">المميزات</a>
            <a href="#about" className="hover:text-ios-blue transition-colors">عن التطبيق</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {showSavedPlans && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold" dir="rtl">الخطط المحفوظة</h2>
              <button 
                onClick={() => setShowSavedPlans(false)}
                className="ios-button bg-ios-gray"
              >
                العودة
              </button>
            </div>
            
            {savedPlans.length === 0 ? (
              <div className="ios-card text-center" dir="rtl">
                <p>لا توجد خطط محفوظة</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4" dir="rtl">
                {savedPlans.map(plan => (
                  <div key={plan.id} className="ios-card">
                    <h3 className="text-xl font-bold mb-2">{plan.destination}</h3>
                    <p className="text-gray-600 mb-2">
                      {plan.startDate} إلى {plan.endDate}
                    </p>
                    <p className="text-gray-600 mb-4">
                      عدد المسافرين: {plan.travelers}
                    </p>
                    <div className="flex justify-between">
                      <button 
                        onClick={() => handleLoadSavedPlan(plan)}
                        className="ios-button bg-ios-blue"
                      >
                        عرض الخطة
                      </button>
                      <button 
                        onClick={() => handleDeleteSavedPlan(plan.id)}
                        className="ios-button bg-ios-red"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {!travelPlan && !loading && !showSavedPlans && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-4" dir="rtl">
                خطط رحلتك بذكاء مع TraFl
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" dir="rtl">
                استخدم قوة الذكاء الاصطناعي من Google Gemini لإنشاء خطة سفر مخصصة تناسب احتياجاتك وميزانيتك ونوع رحلتك.
              </p>
              
              {savedPlans.length > 0 && (
                <button 
                  onClick={() => setShowSavedPlans(true)}
                  className="ios-button bg-ios-blue mt-4"
                >
                  <FaSave className="inline-block ml-1" /> عرض الخطط المحفوظة ({savedPlans.length})
                </button>
              )}
            </div>
            
            <TravelForm onSubmit={handleGeneratePlan} isLoading={loading} />
            
            <section id="features" className="mt-20 mb-16">
              <h2 className="text-3xl font-bold text-center mb-10" dir="rtl">
                لماذا تستخدم TraFl؟
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="ios-card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMagic className="text-ios-blue text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">خطط ذكية</h3>
                  <p className="text-gray-600">
                    خطط سفر مخصصة بالكامل وفقًا لتفضيلاتك وميزانيتك باستخدام أحدث تقنيات الذكاء الاصطناعي.
                  </p>
                </div>
                
                <div className="ios-card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="text-ios-green text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">مناسب لكل الوجهات</h3>
                  <p className="text-gray-600">
                    سواء كنت تخطط لرحلة محلية أو دولية، TraFl يوفر اقتراحات وتوصيات تناسب أي وجهة.
                  </p>
                </div>
                
                <div className="ios-card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRoute className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">خطط مفصلة</h3>
                  <p className="text-gray-600">
                    احصل على جدول يومي مفصل يشمل الأنشطة والمواقع والتكاليف المتوقعة والنصائح المفيدة.
                  </p>
                </div>
              </div>
            </section>
            
            <section id="about" className="mb-16">
              <div className="ios-card" dir="rtl">
                <h2 className="text-2xl font-bold mb-4">عن تطبيق TraFl</h2>
                <p className="text-gray-700 mb-4">
                  TraFl هو تطبيق مبتكر يستخدم تقنية Google Gemini للذكاء الاصطناعي لإنشاء خطط سفر مخصصة.
                  سواء كنت تخطط لقضاء إجازة رومانسية، أو رحلة عائلية، أو مغامرة مع الأصدقاء، يمكن لتطبيق TraFl
                  أن يساعدك في تنظيم رحلتك بشكل مثالي وفقًا لميزانيتك وتفضيلاتك.
                </p>
                <p className="text-gray-700">
                  نحن نؤمن بأن التخطيط الجيد هو أساس الرحلة الناجحة، ولهذا نسعى لتوفير أداة سهلة الاستخدام
                  تمنحك خطة سفر متكاملة تتضمن كل ما تحتاجه من معلومات وتوصيات.
                </p>
              </div>
            </section>
          </>
        )}
        
        {loading && <LoadingIndicator />}
        
        {error && (
          <div className="ios-card bg-red-50 text-red-700 max-w-2xl mx-auto" dir="rtl">
            <h3 className="text-xl font-bold mb-2">حدث خطأ</h3>
            <p>{error}</p>
            <div className="mt-4 p-3 bg-red-100 rounded-md text-sm overflow-auto max-h-60">
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
            <button 
              onClick={handleStartOver}
              className="ios-button bg-ios-red mt-4"
            >
              حاول مرة أخرى
            </button>
          </div>
        )}
        
        {travelPlan && !loading && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={handleStartOver}
                className="ios-button bg-ios-gray"
              >
                بدء خطة جديدة
              </button>
            </div>
            
            <TravelPlan plan={travelPlan} travelData={travelData} />
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 py-6 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600" dir="rtl">
            &copy; {new Date().getFullYear()} TraFl - خطط رحلتك الذكية. تم تطويره باستخدام Google Gemini.
          </p>
        </div>
      </footer>
    </div>
  );
}
