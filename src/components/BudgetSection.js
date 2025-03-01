import { FaMoneyBillWave, FaBed, FaPlane, FaUtensils, FaMapMarkedAlt, FaShoppingBag, FaFirstAid } from 'react-icons/fa';

export default function BudgetSection({ budget }) {
  if (!budget) {
    return (
      <div className="ios-message">
        <p className="text-sm text-gray-500">لا توجد معلومات عن الميزانية</p>
      </div>
    );
  }

  // تحويل القيم إلى أرقام للرسم البياني
  const categories = [
    { name: 'الإقامة', value: parseFloat(budget.accommodation?.percentage || '0'), icon: <FaBed className="text-[rgb(var(--ios-blue))]" /> },
    { name: 'النقل', value: parseFloat(budget.transportation?.percentage || '0'), icon: <FaPlane className="text-[rgb(var(--ios-blue))]" /> },
    { name: 'الطعام', value: parseFloat(budget.food?.percentage || '0'), icon: <FaUtensils className="text-[rgb(var(--ios-blue))]" /> },
    { name: 'الأنشطة', value: parseFloat(budget.activities?.percentage || '0'), icon: <FaMapMarkedAlt className="text-[rgb(var(--ios-blue))]" /> },
    { name: 'التسوق', value: parseFloat(budget.shopping?.percentage || '0'), icon: <FaShoppingBag className="text-[rgb(var(--ios-blue))]" /> },
    { name: 'الطوارئ', value: parseFloat(budget.emergency?.percentage || '0'), icon: <FaFirstAid className="text-[rgb(var(--ios-blue))]" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="ios-card p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <FaMoneyBillWave className="ml-2 text-[rgb(var(--ios-green))]" />
          إجمالي الميزانية المقدرة
        </h3>
        <div className="text-xl font-semibold text-[rgb(var(--ios-green))] text-center py-2">
          {budget.total}
        </div>
      </div>

      <div className="ios-card p-4">
        <h3 className="text-lg font-semibold mb-3">توزيع الميزانية</h3>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <div className="w-7 h-7 flex items-center justify-center ml-2">
                {category.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-600">{budget[category.name.toLowerCase()]?.amount || '-'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-[rgb(var(--ios-blue))] h-1.5 rounded-full" 
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-0.5 text-left">
                  {category.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ios-card p-4">
        <h3 className="text-lg font-semibold mb-3">تفاصيل الميزانية</h3>
        
        <div className="ios-list">
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaBed className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">الإقامة</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.accommodation?.amount}</div>
              <div className="text-xs text-gray-500">{budget.accommodation?.percentage}</div>
            </div>
          </div>
          
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaPlane className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">النقل</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.transportation?.amount}</div>
              <div className="text-xs text-gray-500">{budget.transportation?.percentage}</div>
            </div>
          </div>
          
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaUtensils className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">الطعام</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.food?.amount}</div>
              <div className="text-xs text-gray-500">{budget.food?.percentage}</div>
            </div>
          </div>
          
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaMapMarkedAlt className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">الأنشطة</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.activities?.amount}</div>
              <div className="text-xs text-gray-500">{budget.activities?.percentage}</div>
            </div>
          </div>
          
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaShoppingBag className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">التسوق</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.shopping?.amount}</div>
              <div className="text-xs text-gray-500">{budget.shopping?.percentage}</div>
            </div>
          </div>
          
          <div className="ios-list-item">
            <span className="flex items-center">
              <FaFirstAid className="ml-1 text-[rgb(var(--ios-blue))]" />
              <span className="text-sm">الطوارئ</span>
            </span>
            <div className="text-left">
              <div className="text-sm">{budget.emergency?.amount}</div>
              <div className="text-xs text-gray-500">{budget.emergency?.percentage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
