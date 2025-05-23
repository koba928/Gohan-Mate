// 気分ボタンと表示エリアを取得
const moodButtons = document.querySelectorAll('.mood-btn');
const resultContainer = document.getElementById('result');

// ボタンにクリックイベントを追加
moodButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const mood = button.getAttribute('data-mood');
    await getRecommendation(mood);
  });
});

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
  // ジャンルと理由に分けて表示
  const genreMatch = recommendation.match(/\[(.+?)\]/);
  const genre = genreMatch ? genreMatch[1] : '特別な提案';
  const reason = recommendation.replace(/\[(.+?)\]/, '').trim();

  resultContainer.innerHTML = `
    <div class="result-content">
      <h3 class="result-genre">「${genre}」</h3>
      <p class="result-reason">${reason}</p>
    </div>
  `;
}

// エラー表示
function displayError(message) {
  resultContainer.innerHTML = `
    <div class="error">${message}</div>
  `;
}

// 提案取得処理（API呼び出し）
async function getRecommendation(mood) {
  showLoading();

  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    });

    const data = await response.json();

    // ここで result の存在と型をチェック
    if (!data.result || typeof data.result !== 'string') {
      throw new Error('APIレスポンスの形式が不正です');
    }

    displayResult(data.result);
  } catch (error) {
    console.error('エラー:', error);
    displayError('申し訳ございません。提案の取得中にエラーが発生しました。');
  }
}
