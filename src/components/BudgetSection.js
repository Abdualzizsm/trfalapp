import { FaMoneyBillWave, FaBed, FaPlane, FaUtensils, FaMapMarkedAlt, FaShoppingBag, FaFirstAid } from 'react-icons/fa';

export default function BudgetSection({ budget }) {
  if (!budget) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-gray-500 text-center">لا توجد معلومات عن الميزانية</p>
      </div>
    );
  }

  // تحويل القيم إلى أرقام للرسم البياني
  const categories = [
    { name: 'الإقامة', value: parseFloat(budget.accommodation?.percentage || '0'), icon: <FaBed className="text-ios-blue" /> },
    { name: 'النقل', value: parseFloat(budget.transportation?.percentage || '0'), icon: <FaPlane className="text-ios-blue" /> },
    { name: 'الطعام', value: parseFloat(budget.food?.percentage || '0'), icon: <FaUtensils className="text-ios-blue" /> },
    { name: 'الأنشطة', value: parseFloat(budget.activities?.percentage || '0'), icon: <FaMapMarkedAlt className="text-ios-blue" /> },
    { name: 'التسوق', value: parseFloat(budget.shopping?.percentage || '0'), icon: <FaShoppingBag className="text-ios-blue" /> },
    { name: 'الطوارئ', value: parseFloat(budget.emergency?.percentage || '0'), icon: <FaFirstAid className="text-ios-blue" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <FaMoneyBillWave className="ml-1 text-ios-green" />
          إجمالي الميزانية المقدرة
        </h3>
        <div className="text-2xl font-bold text-ios-green text-center py-2">
          {budget.total}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-3">توزيع الميزانية</h3>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-2">
                {category.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-600">{budget[category.name.toLowerCase()]?.amount || '-'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-ios-blue h-2.5 rounded-full" 
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-left">
                  {category.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-3">تفاصيل الميزانية</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="flex items-center">
              <FaBed className="ml-1 text-ios-blue" />
              الإقامة
            </span>
            <div className="text-left">
              <div>{budget.accommodation?.amount}</div>
              <div className="text-xs text-gray-500">{budget.accommodation?.percentage}</div>
            </div>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="flex items-center">
              <FaPlane className="ml-1 text-ios-blue" />
              النقل
            </span>
            <div className="text-left">
              <div>{budget.transportation?.amount}</div>
              <div className="text-xs text-gray-500">{budget.transportation?.percentage}</div>
            </div>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="flex items-center">
              <FaUtensils className="ml-1 text-ios-blue" />
              الطعام
            </span>
            <div className="text-left">
              <div>{budget.food?.amount}</div>
              <div className="text-xs text-gray-500">{budget.food?.percentage}</div>
            </div>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="flex items-center">
              <FaMapMarkedAlt className="ml-1 text-ios-blue" />
              الأنشطة
            </span>
            <div className="text-left">
              <div>{budget.activities?.amount}</div>
              <div className="text-xs text-gray-500">{budget.activities?.percentage}</div>
            </div>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="flex items-center">
              <FaShoppingBag className="ml-1 text-ios-blue" />
              التسوق
            </span>
            <div className="text-left">
              <div>{budget.shopping?.amount}</div>
              <div className="text-xs text-gray-500">{budget.shopping?.percentage}</div>
            </div>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="flex items-center">
              <FaFirstAid className="ml-1 text-ios-blue" />
              الطوارئ
            </span>
            <div className="text-left">
              <div>{budget.emergency?.amount}</div>
              <div className="text-xs text-gray-500">{budget.emergency?.percentage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
