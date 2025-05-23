export const config = {
    api: {
      bodyParser: true,
    },
  };
  
  export default async function handler(req, res) {
    const { mood } = req.body;
  
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'APIキーが設定されていません' });
    }
  
    const prompt = `気分が「${mood}」のときにおすすめのご飯を一つ提案してください。`;
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 100
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({ error: errorData });
      }
  
      const data = await response.json();
  
      if (
        !data.choices ||
        !Array.isArray(data.choices) ||
        !data.choices[0] ||
        !data.choices[0].message
      ) {
        return res.status(500).json({ error: 'AIからの回答が不正です' });
      }
  
      const message = data.choices[0].message.content;
      res.status(200).json({ result: message });
    } catch (error) {
      console.error('APIエラー:', error);
      res.status(500).json({ error: 'API呼び出し中に問題が発生しました' });
    }
  }
  