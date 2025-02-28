import { createTravelPlan } from '../../utils/cohereService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const travelData = req.body;
    console.log("Received travel data:", travelData);
    
    // التحقق من وجود البيانات المطلوبة
    if (!travelData.destination || !travelData.budget || !travelData.startDate || !travelData.endDate) {
      return res.status(400).json({ error: 'Missing required travel data' });
    }
    
    // استدعاء خدمة Cohere لإنشاء خطة السفر
    const travelPlan = await createTravelPlan(travelData);
    
    // إرجاع خطة السفر المنشأة
    return res.status(200).json({ plan: travelPlan });
    
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate travel plan' });
  }
}
