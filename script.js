// APIキー（実際の開発では環境変数から読み込む）
// 注意: 本番環境では、APIキーをフロントエンドに直接記載せず、
// バックエンドサーバーを経由してAPIを呼び出すようにしてください
async function getRecommendation(mood) {
    resultContainer.innerText = '提案を取得中...';
  
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      });
  
      const data = await response.json();
      resultContainer.innerText = data.result || '提案が取得できませんでした。';
    } catch (error) {
      console.error('エラー:', error);
      resultContainer.innerText = 'エラーが発生しました。';
    }
  }
  

// DOM要素の取得
const moodButtons = document.querySelectorAll('.mood-btn');
const resultContainer = document.getElementById('result');

// 各ボタンにクリックイベントを追加
moodButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const mood = button.getAttribute('data-mood');
        await getRecommendation(mood);
    });
});

// GPT-4 APIを呼び出して提案を取得
async function getRecommendation(mood) {
    // ローディング表示
    showLoading();

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'あなたは料理の提案をする専門家です。ユーザーの気分に合わせて、最適な料理ジャンルを1つ提案し、その理由を簡潔に説明してください。'
                    },
                    {
                        role: 'user',
                        content: `ユーザーは今「${mood}」の気分です。おすすめの料理ジャンルと理由を日本語で1つ教えてください。料理ジャンル名は【】で囲んでください。`
                    }
                ],
                temperature: 0.7,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error('APIリクエストに失敗しました');
        }

        const data = await response.json();
        const recommendation = data.choices[0].message.content;
        
        // 結果を表示
        displayResult(recommendation);

    } catch (error) {
        console.error('エラー:', error);
        displayError('申し訳ございません。提案の取得中にエラーが発生しました。');
    }
}

// ローディング表示
function showLoading() {
    resultContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading"></div>
            <p class="loading-text">あなたにぴったりのごはんを探しています...</p>
        </div>
    `;
}

// 結果を表示
function displayResult(recommendation) {
    // 料理ジャンルを抽出（【】で囲まれた部分）
    const genreMatch = recommendation.match(/【(.+?)】/);
    const genre = genreMatch ? genreMatch[1] : '特別な提案';
    
    // 【】を除いた説明文を取得
    const reason = recommendation.replace(/【.+?】/g, '').trim();

    resultContainer.innerHTML = `
        <div class="result-content">
            <h3 class="result-genre">🍴 ${genre}</h3>
            <p class="result-reason">${reason}</p>
        </div>
    `;
}

// エラー表示
function displayError(message) {
    resultContainer.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 必要に応じて初期化処理を追加
    console.log('GohanMate initialized');
});