import type { APIRoute } from 'astro';
import { db, DailyReport, User, eq } from 'astro:db';

export const GET: APIRoute = async () => {
  try {
    // 日報とユーザー情報を取得
    const reports = await db.select().from(DailyReport);
    const users = await db.select().from(User);

    // CSVヘッダー
    const header = ['日付', 'ユーザーID', '氏名', '作業内容', '出勤時間', '退勤時間', '体調(1-3)', 'コメント'].join(',');

    // CSVデータ行の生成
    const rows = reports.map(report => {
      const user = users.find(u => u.id === report.userId);
      const userName = user ? user.name : '不明なユーザー';
      
      const dateStr = new Date(report.createdAt).toLocaleDateString('ja-JP');
      
      // カンマなどが含まれる場合を考慮してダブルクォーテーションで囲む
      return [
        `"${dateStr}"`,
        `"${report.userId}"`,
        `"${userName}"`,
        `"${report.taskType}"`,
        `"${report.startTime}"`,
        `"${report.endTime}"`,
        `"${report.healthStatus}"`,
        `"${report.comment || ''}"`
      ].join(',');
    });

    const csvContent = [header, ...rows].join('\n');

    // BOM付きのUTF-8で出力（Excelで文字化けしないようにするため）
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });

    return new Response(blob, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="daily_reports_${new Date().getTime()}.csv"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('CSVエクスポートに失敗しました', { status: 500 });
  }
};
