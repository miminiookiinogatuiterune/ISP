import { defineDb, defineTable, column, NOW } from 'astro:db';

const DailyReport = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    taskType: column.text(), // 'アクセサリー制作', '梱包', '清掃', 'その他'
    taskDuration: column.number(), // 1, 2, 3
    healthStatus: column.number(), // 1, 2, 3
    comment: column.text({ optional: true }), // 最大20文字
    staffNote: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
  }
});

const Reflection = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    targetMonth: column.text(), // '2026-04'など
    selfEvaluation: column.number(), // 1〜5
    changeRequest: column.boolean(),
    createdAt: column.date({ default: NOW }),
  }
});

export default defineDb({
  tables: { DailyReport, Reflection }
});
