import { FaBed, FaMapMarkerAlt, FaMoneyBillWave, FaCheck } from 'react-icons/fa';

export default function AccommodationSection({ accommodations }) {
  if (!accommodations || !accommodations.recommendations || accommodations.recommendations.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-gray-500 text-center">لا توجد توصيات للإقامة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accommodations.recommendations.map((accommodation, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{accommodation.name}</h3>
            <span className="bg-ios-light-blue text-ios-blue px-2 py-1 rounded-full text-sm">
              {accommodation.type}
            </span>
          </div>
          
          <div className="flex items-center mt-2 text-gray-600">
            <FaMapMarkerAlt className="ml-1 text-ios-blue" />
            <span>{accommodation.location}</span>
          </div>
          
          <div className="flex items-center mt-1 text-gray-600">
            <FaMoneyBillWave className="ml-1 text-ios-green" />
            <span>{accommodation.priceRange}</span>
          </div>
          
          <p className="mt-3 text-gray-700">{accommodation.description}</p>
          
          {accommodation.features && accommodation.features.length > 0 && (
            <div className="mt-3">
              <h4 className="font-semibold mb-1">المميزات:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {accommodation.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheck className="ml-1 text-ios-green" />
                    <span>{feature}</span>
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
