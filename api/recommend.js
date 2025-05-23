
export default async function handler(req, res) {
    const { mood } = req.body;
  
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'APIキーが設定されていません' });
    }
  
    const prompt = `気分が「${mood}」のときにおすすめのご飯を一つ提案してください。`;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }]
        })
      });
  
      const data = await response.json();
      const message = data.choices?.[0]?.message?.content;
      res.status(200).json({ result: message });
  
    } catch (error) {
      res.status(500).json({ error: 'API呼び出しに失敗しました。' });
    }
  }
  