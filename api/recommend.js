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
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ error: responseData.error || "APIエラー" });
      }
  
      if (
        !responseData.choices ||
        !Array.isArray(responseData.choices) ||
        !responseData.choices[0] ||
        !responseData.choices[0].message
      ) {
        return res.status(500).json({ error: "AIから有効な応答がありません" });
      }
  
      const message = responseData.choices[0].message.content;
      res.status(200).json({ result: message });
  
    } catch (error) {
      console.error("APIエラー:", error);
      res.status(500).json({ error: "APIの呼び出しに失敗しました" });
    }
  }
  