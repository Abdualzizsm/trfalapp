# TraFl - تطبيق تخطيط الرحلات

تطبيق TraFl هو منصة لتخطيط الرحلات باستخدام الذكاء الاصطناعي. يساعد المستخدمين على إنشاء خطط سفر مفصلة بناءً على وجهتهم وتفضيلاتهم.

## الميزات

- إنشاء خطط سفر مفصلة باللغة العربية
- الحصول على توصيات للإقامة والمطاعم والأنشطة
- عرض برنامج يومي مفصل لكل يوم من أيام الرحلة
- تقدير الميزانية وتوزيعها على مختلف جوانب الرحلة
- نصائح سفر مفيدة خاصة بالوجهة

## التقنيات المستخدمة

- Next.js
- React
- Tailwind CSS
- Cohere API للذكاء الاصطناعي

## كيفية البدء

1. استنساخ المشروع:
```bash
git clone https://github.com/yourusername/trafl-app.git
cd trafl-app
```

2. تثبيت التبعيات:
```bash
npm install
```

3. إنشاء ملف `.env.local` وإضافة مفتاح API الخاص بك:
```
COHERE_API_KEY=your_cohere_api_key_here
```

4. تشغيل خادم التطوير:
```bash
npm run dev
```

5. فتح [http://localhost:3000](http://localhost:3000) في المتصفح لمشاهدة التطبيق.

## النشر

يمكن نشر هذا التطبيق على أي منصة تدعم تطبيقات Next.js مثل Vercel أو Render.

## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو تقديم pull request.
