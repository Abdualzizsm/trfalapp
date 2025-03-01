import { FaBed, FaMapMarkerAlt, FaMoneyBillWave, FaCheck, FaStar } from 'react-icons/fa';

export default function AccommodationSection({ accommodation }) {
  if (!accommodation || accommodation.length === 0) {
    return (
      <div className="ios-message">
        <p className="text-sm text-gray-500">لا توجد توصيات للإقامة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accommodation.map((option, index) => (
        <div key={index} className="ios-card p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{option.name}</h3>
            <div className="ios-badge-primary">{option.type}</div>
          </div>
          
          <div className="flex items-center mb-1 text-sm text-gray-600">
            <FaMapMarkerAlt className="ml-1 text-[rgb(var(--ios-red))]" />
            <span>{option.location}</span>
          </div>
          
          <div className="flex items-center mb-1 text-sm text-gray-600">
            <FaMoneyBillWave className="ml-1 text-[rgb(var(--ios-green))]" />
            <span>{option.priceRange}</span>
          </div>
          
          {option.rating && (
            <div className="flex items-center mb-3 text-sm text-gray-600">
              <FaStar className="ml-1 text-yellow-500" />
              <span>{option.rating} / 5</span>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-3">{option.description}</p>
          
          {option.features && option.features.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">المميزات:</h4>
              <ul className="ios-list grid grid-cols-2 gap-1">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="ios-list-item text-xs">
                    <div className="flex items-center">
                      <FaCheck className="ml-1 text-[rgb(var(--ios-green))]" />
                      <span>{feature}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
