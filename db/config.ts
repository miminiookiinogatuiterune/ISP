import { defineDb, defineTable, column, NOW } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    longTermGoal: column.text({ optional: true }),
    shortTermGoals: column.text({ optional: true }), // 改行区切りで保存
    createdAt: column.date({ default: NOW }),
  }
});

const DailyReport = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    taskType: column.text(), // 'その他：〇〇' を許容
    startTime: column.text(), // '09:00'
    endTime: column.text(),   // '15:00'
    healthStatus: column.number(),
    comment: column.text({ optional: true }),
    staffNote: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
  }
});

const Reflection = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    targetMonth: column.text(),
    evaluations: column.text(), // JSON文字列として保存 [{ type, text, score }]
    changeRequest: column.boolean(),
    createdAt: column.date({ default: NOW }),
  }
});

const Assessment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text(),
    disabilityStatus: column.text({ optional: true }),
    workConsiderations: column.text({ optional: true }),
    status: column.text({ default: 'draft' }), // 'draft' or 'approved'
    createdAt: column.date({ default: NOW }),
  }
});

export default defineDb({
  tables: { User, DailyReport, Reflection, Assessment }
});
