import { db, User, DailyReport, Reflection } from 'astro:db';

export default async function seed() {
  await db.insert(User).values([
    { 
      id: 'user001', 
      name: '山田 太郎',
      longTermGoal: '一人でアクセサリーの梱包作業ができるようになる',
      shortTermGoals: '挨拶を大きな声でする\n1時間に1回は休憩のサインを出す\nわからないことはすぐに職員に聞く'
    },
    { 
      id: 'user002', 
      name: '鈴木 花子',
      longTermGoal: '週3日の安定した通所をめざす',
      shortTermGoals: '朝決まった時間に起きる\n体調が悪いときは無理せず休む'
    }
  ]);

  await db.insert(DailyReport).values([
    {
      userId: 'user001',
      taskType: 'アクセサリー制作',
      startTime: '10:00',
      endTime: '15:00',
      healthStatus: 3,
      comment: '今日も頑張りました。',
      staffNote: '手先がとても器用でした。'
    },
    {
      userId: 'user002',
      taskType: '清掃',
      startTime: '13:00',
      endTime: '15:00',
      healthStatus: 2,
      comment: '少し疲れました。',
    }
  ]);

  await db.insert(Reflection).values([
    {
      userId: 'user001',
      targetMonth: '2026-04',
      evaluations: JSON.stringify([
        { type: 'long', text: '一人でアクセサリーの梱包作業ができるようになる', score: 4 },
        { type: 'short', text: '挨拶を大きな声でする', score: 5 },
        { type: 'short', text: '1時間に1回は休憩のサインを出す', score: 3 },
        { type: 'short', text: 'わからないことはすぐに職員に聞く', score: 4 }
      ]),
      changeRequest: false
    }
  ]);
}
