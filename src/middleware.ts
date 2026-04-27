import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // /staff 配下へのアクセスのみ認証を要求
  if (url.pathname.startsWith('/staff')) {
    const basicAuth = context.request.headers.get('authorization');

    if (basicAuth) {
      // Basic認証のヘッダーを解析 (Basic base64encoded(user:pass))
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // ユーザー名とパスワードのチェック
      if (user === 'user' && pwd === 'pass') {
        // 認証成功なら次の処理へ
        return next();
      }
    }

    // 認証失敗時、またはヘッダーがない場合は401を返し、ブラウザの認証ダイアログを表示させる
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Staff Only Area"',
      },
    });
  }

  // /staff 以外はそのまま通過
  return next();
});
