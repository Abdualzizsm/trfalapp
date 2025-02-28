# TraFl - تطبيق تخطيط الرحلات

TraFl هو تطبيق ويب لإنشاء خطط سفر مخصصة باستخدام تقنية الذكاء الاصطناعي. يستخدم التطبيق واجهة برمجة Cohere لإنشاء خطط سفر مفصلة بناءً على تفضيلات المستخدم.

## المميزات

- إنشاء خطط سفر مخصصة باستخدام الذكاء الاصطناعي
- تخصيص الخطط حسب الوجهة، والميزانية، وتواريخ السفر، وعدد المسافرين
- عرض صور جذابة للوجهات باستخدام Unsplash API
- حفظ خطط السفر للرجوع إليها لاحقًا
- مشاركة خطط السفر عبر وسائل التواصل الاجتماعي
- تنزيل خطط السفر كملفات نصية
- واجهة مستخدم سهلة الاستخدام ومتجاوبة

## التقنيات المستخدمة

- **الواجهة الأمامية**: Next.js، React، CSS Modules
- **الذكاء الاصطناعي**: Cohere API
- **الصور**: Unsplash API
- **النشر**: Render

## متطلبات التشغيل

- Node.js (الإصدار 18 أو أعلى)
- مفتاح API من Cohere
- مفتاح API من Unsplash (اختياري، للصور)

## التثبيت

1. استنساخ المستودع:
   ```bash
   git clone https://github.com/yourusername/trafl-next.git
   cd trafl-next
   ```

2. تثبيت التبعيات:
   ```bash
   npm install
   ```

3. إنشاء ملف `.env.local` وإضافة مفاتيح API الخاصة بك:
   ```
   COHERE_API_KEY=your_cohere_api_key_here
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

4. تشغيل التطبيق في وضع التطوير:
   ```bash
   npm run dev
   ```

5. فتح [http://localhost:3000](http://localhost:3000) في المتصفح لعرض التطبيق.

## النشر

تم تكوين المشروع للنشر على Render. يمكنك نشر التطبيق باتباع الخطوات التالية:

1. قم بإنشاء حساب على [Render](https://render.com) إذا لم يكن لديك واحد بالفعل.
2. قم بربط مستودع GitHub الخاص بك بـ Render.
3. قم بإنشاء خدمة ويب جديدة واختر المستودع الخاص بك.
4. أضف متغيرات البيئة التالية:
   - `COHERE_API_KEY`: مفتاح API الخاص بك من Cohere
   - `UNSPLASH_ACCESS_KEY`: مفتاح API الخاص بك من Unsplash (اختياري)
   - `NODE_ENV`: production
5. استخدم الإعدادات التالية:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

## المساهمة

المساهمات مرحب بها! إذا كنت ترغب في المساهمة، يرجى اتباع الخطوات التالية:

1. افتح issue لمناقشة التغيير الذي ترغب في إجرائه.
2. قم بعمل fork للمستودع وإنشاء فرع جديد.
3. قم بإجراء التغييرات وإرسال طلب سحب.

## الترخيص

هذا المشروع مرخص بموجب [رخصة MIT](LICENSE).

## الاعتمادات

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Cohere](https://cohere.com/)
- [Unsplash](https://unsplash.com/)
- [Render](https://render.com/)
