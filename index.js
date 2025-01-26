const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API 配置
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 路由：处理用户输入
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // 或 "gpt-4" 如果你有权限
            messages: [{ role: "user", content: message }],
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).send("出错了，请稍后再试！");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
