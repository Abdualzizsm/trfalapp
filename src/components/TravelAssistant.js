import { useState } from 'react';
import { FaRobot, FaSpinner, FaPaperPlane, FaHistory } from 'react-icons/fa';
import axios from 'axios';

/**
 * مساعد السفر الذكي باستخدام OpenAI
 * @param {Object} travelPlan - خطة السفر الحالية (اختياري)
 */
const TravelAssistant = ({ travelPlan }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // إضافة سؤال المستخدم إلى المحادثة
    const newConversation = {
      question,
      answer: '',
      timestamp: new Date().toISOString()
    };
    
    setConversations(prev => [...prev, newConversation]);
    setQuestion('');

    try {
      const response = await axios.post('/api/answerQuestion', {
        question,
        travelPlan
      });
      
      // تحديث الإجابة في المحادثة
      setConversations(prev => 
        prev.map((conv, index) => 
          index === prev.length - 1 
            ? { ...conv, answer: response.data.answer } 
            : conv
        )
      );
    } catch (err) {
      console.error('Error getting answer:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء الحصول على الإجابة');
      
      // تحديث الخطأ في المحادثة
      setConversations(prev => 
        prev.map((conv, index) => 
          index === prev.length - 1 
            ? { ...conv, answer: 'عذراً، لم أتمكن من الإجابة على سؤالك. يرجى المحاولة مرة أخرى.' } 
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAssistant = () => {
    setIsOpen(prev => !prev);
  };

  // أسئلة مقترحة
  const suggestedQuestions = [
    'ما هي أفضل وسيلة للتنقل في هذه المدينة؟',
    'ما هي الأطعمة المحلية التي يجب تجربتها؟',
    'ما هي أفضل الأماكن للتسوق؟',
    'ما هي العادات والتقاليد المحلية التي يجب معرفتها؟'
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* زر فتح/إغلاق المساعد */}
      <button
        onClick={toggleAssistant}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <FaRobot className="text-2xl" />
      </button>
      
      {/* نافذة المساعد */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* رأس النافذة */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <div className="flex items-center">
              <FaRobot className="text-2xl mr-2" />
              <h3 className="text-lg font-semibold">مساعد السفر الذكي</h3>
            </div>
            <p className="text-sm text-blue-100 mt-1">اسأل أي سؤال عن رحلتك أو الوجهة</p>
          </div>
          
          {/* محتوى المحادثة */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <FaHistory className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">لم تبدأ أي محادثة بعد</p>
                <p className="text-gray-400 text-sm mt-2">اسأل أي سؤال عن رحلتك</p>
                
                <div className="mt-6">
                  <p className="text-gray-600 text-sm mb-2">أسئلة مقترحة:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuestion(q);
                          setTimeout(() => document.getElementById('question-input').focus(), 100);
                        }}
                        className="text-sm bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors block w-full text-right"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {conversations.map((conv, index) => (
                  <div key={index} className="space-y-3">
                    {/* سؤال المستخدم */}
                    <div className="flex justify-end">
                      <div className="bg-blue-100 text-gray-800 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                        {conv.question}
                      </div>
                    </div>
                    
                    {/* إجابة المساعد */}
                    <div className="flex justify-start">
                      {index === conversations.length - 1 && !conv.answer && isLoading ? (
                        <div className="bg-gray-100 text-gray-500 p-3 rounded-lg rounded-tl-none max-w-[80%] flex items-center">
                          <FaSpinner className="animate-spin mr-2" />
                          <span>جاري التفكير...</span>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                          {conv.answer || 'عذراً، لم أتمكن من الإجابة على سؤالك.'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* نموذج السؤال */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                id="question-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`p-2 rounded-r-lg ${
                  isLoading || !question.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-red-500 text-xs">
                {error}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default TravelAssistant;
