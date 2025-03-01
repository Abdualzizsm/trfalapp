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
        className="ios-floating-button"
      >
        <FaRobot className="text-xl" />
      </button>
      
      {/* نافذة المساعد */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 md:w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* رأس النافذة */}
          <div className="ios-card-header bg-[rgb(var(--ios-blue))]">
            <FaRobot className="text-white ml-2" />
            <div>
              <h3 className="text-base font-semibold text-white">مساعد السفر الذكي</h3>
              <p className="text-xs text-blue-100">اسأل أي سؤال عن رحلتك أو الوجهة</p>
            </div>
          </div>
          
          {/* محتوى المحادثة */}
          <div className="h-72 overflow-y-auto p-3 bg-gray-50">
            {conversations.length === 0 ? (
              <div className="text-center py-6">
                <FaHistory className="text-3xl text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">لم تبدأ أي محادثة بعد</p>
                <p className="text-xs text-gray-400 mt-1">اسأل أي سؤال عن رحلتك</p>
                
                <div className="mt-4">
                  <p className="text-xs text-gray-600 mb-2">أسئلة مقترحة:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuestion(q);
                          setTimeout(() => document.getElementById('question-input').focus(), 100);
                        }}
                        className="text-xs bg-white text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors block w-full text-right"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {conversations.map((conv, index) => (
                  <div key={index} className="space-y-2">
                    {/* سؤال المستخدم */}
                    <div className="flex justify-end">
                      <div className="ios-message-user">
                        <p className="text-xs">{conv.question}</p>
                      </div>
                    </div>
                    
                    {/* إجابة المساعد */}
                    <div className="flex justify-start">
                      {index === conversations.length - 1 && !conv.answer && isLoading ? (
                        <div className="ios-message-assistant">
                          <div className="flex items-center text-xs">
                            <FaSpinner className="animate-spin ml-1.5" />
                            <span>جاري التفكير...</span>
                          </div>
                        </div>
                      ) : (
                        <div className="ios-message-assistant">
                          <p className="text-xs">{conv.answer || 'عذراً، لم أتمكن من الإجابة على سؤالك.'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* نموذج السؤال */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                id="question-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 p-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[rgb(var(--ios-blue))]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`p-2 rounded-r-lg ${
                  isLoading || !question.trim()
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-[rgb(var(--ios-blue))] text-white'
                }`}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
            
            {error && (
              <div className="mt-1 text-[rgb(var(--ios-red))] text-xs">
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
