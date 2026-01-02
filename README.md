# 🍎 AI Fruit Analyzer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://python.org/)

**Multi-LLM Powered Agricultural Disease Detection Platform**

A professional full-stack web application that uses multiple Large Language Models (LLMs) to detect diseases in fruits through image analysis.

![Dashboard Preview](docs/preview.gif)

---

## ✨ Features

- 🤖 **Multi-LLM Support** — Choose from 5 AI models:
  - 🟣 Claude (Anthropic)
  - 🟢 GPT-4 Vision (OpenAI)
  - 🔵 Gemini Pro (Google)
  - 🟠 DeepSeek
  - ⚫ Grok (xAI)

- 🔐 **Secure API Key Input** — Password-protected field, never stored
- 📷 **Drag & Drop Upload** — Easy image upload interface
- 🔬 **Comprehensive Analysis** — Fruit identification, disease detection, severity assessment
- 💊 **Actionable Recommendations** — Treatment suggestions
- 🎨 **Modern Dark UI** — Professional, responsive design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| CSS3 | Styling |
| JavaScript ES6+ | Logic |

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.9+ | Runtime |
| FastAPI | API Framework |
| httpx | Async HTTP Client |
| Pydantic | Data Validation |

---

## 📁 Project Structure

```
ai-fruit-analyzer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ModelSelector.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── ResultsPanel.jsx
│   │   │   └── Footer.jsx
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   └── requirements.txt
├── docs/
│   └── preview.gif
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- API key from at least one provider

### 1. Clone Repository
```bash
git clone https://github.com/DaneshShokri94/ai-fruit-analyzer.git
cd ai-fruit-analyzer
```

### 2. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 3. Setup Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Open Application
Visit `http://localhost:3000`

---

## 🔑 Getting API Keys

| Provider | Get API Key |
|----------|-------------|
| Anthropic (Claude) | [console.anthropic.com](https://console.anthropic.com/) |
| OpenAI (GPT-4) | [platform.openai.com](https://platform.openai.com/) |
| Google (Gemini) | [makersuite.google.com](https://makersuite.google.com/) |
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com/) |
| xAI (Grok) | [x.ai](https://x.ai/) |

---

## 📸 Screenshots

### Model Selection
![Model Selection](docs/models.png)

### Analysis Results
![Analysis Results](docs/results.png)

---

## 🔒 Security

- API keys are **never stored** on the server
- Keys are only used for the current session
- HTTPS recommended for production
- CORS configured for security

---

## 🤖 Supported AI Models

| Model | Provider | Best For |
|-------|----------|----------|
| Claude | Anthropic | Detailed analysis, reasoning |
| GPT-4 Vision | OpenAI | General purpose, accurate |
| Gemini Pro | Google | Fast processing |
| DeepSeek | DeepSeek | Cost-effective |
| Grok | xAI | Real-time insights |

---

## 🍎 Supported Fruits

- Apples
- Oranges
- Bananas
- Grapes
- Tomatoes
- Strawberries
- Mangoes
- Lemons
- And more...

---

## 🦠 Detectable Diseases

- Apple Scab
- Citrus Canker
- Powdery Mildew
- Black Rot
- Anthracnose
- Leaf Spot
- Bacterial Blight
- Various fungal infections

---

## 📄 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/models` | List available models |
| POST | `/analyze` | Analyze fruit image |

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload dist folder
```

### Backend (Railway/Render)
```bash
# Set environment variables
# Deploy backend folder
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file

---

## 👤 Author

**Danesh Shokri**

- 🔗 LinkedIn: [@danesh-shokri](https://linkedin.com/in/danesh-shokri)
- 🐙 GitHub: [@DaneshShokri94](https://github.com/DaneshShokri94)
- 📧 Email: danesh.shokri.1@ulaval.ca

---

## ⭐ Support

If you find this project useful, please give it a star!

---

<p align="center">
  Built with ❤️ using React, FastAPI, and Multiple LLMs
</p>
