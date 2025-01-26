const express = require('express');
const axios = require('axios');
const app = express();

// 用于解析请求体中的 JSON 数据
app.use(express.json());

// 从环境变量中获取 OpenAI API 密钥
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;  // 从环境变量中读取密钥

// 与 ChatGPT 进行交互的路由
app.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',  // 你可以根据需要选择其他模型
                prompt: userMessage,
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // 返回 OpenAI 的回答
        res.json({ answer: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
