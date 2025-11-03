This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment — คำแนะนำแบบรวดเร็ว (ไทย)

ด้านล่างเป็นวิธีเตรียมและ deploy โปรเจค Next.js นี้ไปยัง Vercel (แนะนำ) หรือด้วย Docker ถ้าต้องการคอนเทนเนอร์:

1) ตรวจสอบและ build ท้องถิ่น

```powershell
# ติดตั้ง dependencies
npm ci

# สร้าง build production
npm run build

# รัน production server (พอร์ต 3000)
npm start
```

2) Deploy บน Vercel (แนะนำสำหรับ Next.js)

- สมัครหรือเข้าสู่ระบบที่ https://vercel.com
- กด "New Project" -> เลือก repo ของคุณ (GitHub/GitLab/Bitbucket)
- Vercel จะตรวจจับ Next.js โดยอัตโนมัติและรัน `npm install` + `npm run build`
- ถ้ามีตัวแปรแวดล้อม (เช่น API keys) ให้ตั้งค่าใน Project Settings -> Environment Variables

แนะนำไฟล์ `vercel.json` (มีให้ใน repository) ถ้าต้องการปรับพฤติกรรมการ build/deploy

3) Alternative: สร้าง Docker image และรันบนเซิร์ฟเวอร์หรือ registry

- สร้าง image ด้วย Dockerfile (มีใน repository)
- ตัวอย่างคำสั่ง (PowerShell):

```powershell
# สร้าง image
docker build -t web-portfolios:latest .

# รัน container
docker run -p 3000:3000 --env NODE_ENV=production web-portfolios:latest
```

ปัญหาที่อาจเจอและการแก้ไขสั้น ๆ
- ถ้า build ล้มเหลว ให้ตรวจสอบเวอร์ชัน Node.js (Next 16 ควรใช้ Node 18+ หรือ 20 ตาม requirement ของ dependencies)
- ถ้าใช้ Sharp หรือ native modules อาจต้องติดตั้ง build tools (บน Linux บางครั้งต้องติดตั้ง libvips)

ถ้าต้องการ ผมสามารถ:
- สร้างและคอนเฟิร์ม Docker image ในเครื่องของคุณ
- แนะนำการตั้งค่า Vercel (project linking, env vars)
- สร้าง workflow สำหรับ GitHub Actions เพื่อ deploy อัตโนมัติ

บอกผมว่าต้องการแบบไหนต่อ: "Vercel", "Docker" หรือ "CI/CD (GitHub Actions)" และผมจะทำให้ต่อทันที

