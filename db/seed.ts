import { db, User, DailyReport, Reflection } from 'astro:db';

export default async function seed() {
  await db.insert(User).values([
    { id: 'user001', name: '山田 太郎' },
    { id: 'user002', name: '鈴木 花子' }
  ]);

  await db.insert(DailyReport).values([
    {
      userId: 'user001',
      taskType: 'アクセサリー制作',
      taskDuration: 3,
      healthStatus: 3,
      comment: '今日も頑張りました。',
      staffNote: '手先がとても器用でした。'
    },
    {
      userId: 'user002',
      taskType: '清掃',
      taskDuration: 2,
      healthStatus: 2,
      comment: '少し疲れました。',
    }
  ]);

  await db.insert(Reflection).values([
    {
      userId: 'user001',
      targetMonth: '2026-04',
      selfEvaluation: 4,
      changeRequest: false
    }
  ]);
}
