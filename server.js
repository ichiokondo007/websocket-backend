const WebSocket = require('ws');

// ポート3001でWebSocketサーバを起動
const wss = new WebSocket.Server({ port: 3001 }, () => {
	console.log('WebSocket server is running on port 3001');
});

// 接続時の処理
wss.on('connection', (ws) => {
	console.log('新しいクライアントが接続しました');

	// メッセージ受信時の処理
	ws.on('message', (message) => {
		console.log('受信: %s', message);

		// 受信したメッセージを全クライアントへブロードキャスト
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message, { binary: false });
			}
		});
	});

	// 接続終了時の処理
	ws.on('close', () => {
		console.log('クライアントが切断されました');
	});
});
