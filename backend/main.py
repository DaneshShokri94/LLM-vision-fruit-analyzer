"""
🍎 AI Fruit Analyzer - Backend API
Multi-LLM Disease Detection Platform
"""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import base64
import httpx
import json
import re
import os

# ═══════════════════════════════════════════════════════════════════════════════
# FastAPI App Configuration
# ═══════════════════════════════════════════════════════════════════════════════
app = FastAPI(
    title="AI Fruit Analyzer API",
    description="Multi-LLM Powered Agricultural Disease Detection",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ═══════════════════════════════════════════════════════════════════════════════
# Response Models
# ═══════════════════════════════════════════════════════════════════════════════
class AnalysisResponse(BaseModel):
    is_healthy: bool
    fruit_type: Optional[str] = None
    variety: Optional[str] = None
    ripeness: Optional[str] = None
    disease_name: Optional[str] = None
    disease_type: Optional[str] = None
    severity: Optional[str] = None
    symptoms: Optional[List[str]] = []
    recommendations: Optional[List[str]] = []
    raw_analysis: str
    model_used: str

# ═══════════════════════════════════════════════════════════════════════════════
# Prompt Template
# ═══════════════════════════════════════════════════════════════════════════════
ANALYSIS_PROMPT = """You are an expert agricultural pathologist and fruit disease specialist.
Analyze this fruit image and provide a detailed diagnosis.

IMPORTANT: Respond in valid JSON format only, with no additional text:

{
    "fruit_type": "Name of the fruit",
    "variety": "Specific variety if identifiable",
    "ripeness": "Unripe/Ripe/Overripe",
    "is_healthy": true or false,
    "confidence": "High/Medium/Low",
    "disease_name": "Disease name if infected, null if healthy",
    "disease_type": "Fungal/Bacterial/Viral/Physiological or null",
    "severity": "Mild/Moderate/Severe or null",
    "symptoms": ["List of visible symptoms"],
    "recommendations": ["List of actionable recommendations"]
}

If the image is not a fruit or is unclear, set fruit_type to "Unknown" and is_healthy to true."""

# ═══════════════════════════════════════════════════════════════════════════════
# LLM API Handlers
# ═══════════════════════════════════════════════════════════════════════════════

async def analyze_with_claude(image_base64: str, media_type: str, api_key: str) -> dict:
    """Analyze image using Claude API"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "Content-Type": "application/json",
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01"
            },
            json={
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1500,
                "messages": [{
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_base64
                            }
                        },
                        {
                            "type": "text",
                            "text": ANALYSIS_PROMPT
                        }
                    ]
                }]
            }
        )
        
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("error", {}).get("message", "Claude API error")
            )
        
        data = response.json()
        return data["content"][0]["text"]


async def analyze_with_openai(image_base64: str, media_type: str, api_key: str) -> dict:
    """Analyze image using OpenAI GPT-4 Vision API"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}"
            },
            json={
                "model": "gpt-4o",
                "max_tokens": 1500,
                "messages": [{
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": ANALYSIS_PROMPT
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{image_base64}"
                            }
                        }
                    ]
                }]
            }
        )
        
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("error", {}).get("message", "OpenAI API error")
            )
        
        data = response.json()
        return data["choices"][0]["message"]["content"]


async def analyze_with_gemini(image_base64: str, media_type: str, api_key: str) -> dict:
    """Analyze image using Google Gemini API"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key={api_key}",
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{
                    "parts": [
                        {"text": ANALYSIS_PROMPT},
                        {
                            "inline_data": {
                                "mime_type": media_type,
                                "data": image_base64
                            }
                        }
                    ]
                }]
            }
        )
        
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("error", {}).get("message", "Gemini API error")
            )
        
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]


async def analyze_with_deepseek(image_base64: str, media_type: str, api_key: str) -> dict:
    """Analyze image using DeepSeek API"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}"
            },
            json={
                "model": "deepseek-vl",
                "max_tokens": 1500,
                "messages": [{
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": ANALYSIS_PROMPT
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{image_base64}"
                            }
                        }
                    ]
                }]
            }
        )
        
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("error", {}).get("message", "DeepSeek API error")
            )
        
        data = response.json()
        return data["choices"][0]["message"]["content"]


async def analyze_with_grok(image_base64: str, media_type: str, api_key: str) -> dict:
    """Analyze image using xAI Grok API"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.x.ai/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}"
            },
            json={
                "model": "grok-vision-beta",
                "max_tokens": 1500,
                "messages": [{
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": ANALYSIS_PROMPT
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{media_type};base64,{image_base64}"
                            }
                        }
                    ]
                }]
            }
        )
        
        if response.status_code != 200:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("error", {}).get("message", "Grok API error")
            )
        
        data = response.json()
        return data["choices"][0]["message"]["content"]


# ═══════════════════════════════════════════════════════════════════════════════
# Helper Functions
# ═══════════════════════════════════════════════════════════════════════════════

def get_media_type(filename: str) -> str:
    """Get media type from filename"""
    ext = filename.lower().split('.')[-1]
    media_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'gif': 'image/gif'
    }
    return media_types.get(ext, 'image/jpeg')


def parse_analysis_response(response_text: str) -> dict:
    """Parse the LLM response into structured data"""
    try:
        # Try to extract JSON from the response
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            return json.loads(json_match.group())
    except json.JSONDecodeError:
        pass
    
    # Return default structure if parsing fails
    return {
        "fruit_type": "Unknown",
        "variety": None,
        "ripeness": None,
        "is_healthy": True,
        "disease_name": None,
        "disease_type": None,
        "severity": None,
        "symptoms": [],
        "recommendations": ["Unable to parse analysis. Please try again."]
    }


# ═══════════════════════════════════════════════════════════════════════════════
# API Endpoints
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "AI Fruit Analyzer API",
        "version": "1.0.0"
    }


@app.get("/models")
async def get_models():
    """Get available AI models"""
    return {
        "models": [
            {"id": "claude", "name": "Claude", "provider": "Anthropic"},
            {"id": "gpt4", "name": "GPT-4 Vision", "provider": "OpenAI"},
            {"id": "gemini", "name": "Gemini Pro", "provider": "Google"},
            {"id": "deepseek", "name": "DeepSeek", "provider": "DeepSeek"},
            {"id": "grok", "name": "Grok", "provider": "xAI"},
        ]
    }


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(
    image: UploadFile = File(...),
    model: str = Form(...),
    api_key: str = Form(...)
):
    """
    Analyze a fruit image for disease detection
    
    - **image**: The fruit image file
    - **model**: AI model to use (claude, gpt4, gemini, deepseek, grok)
    - **api_key**: API key for the selected model
    """
    
    # Validate model selection
    valid_models = ["claude", "gpt4", "gemini", "deepseek", "grok"]
    if model not in valid_models:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid model. Choose from: {', '.join(valid_models)}"
        )
    
    # Validate API key
    if not api_key or len(api_key) < 10:
        raise HTTPException(
            status_code=400,
            detail="Invalid API key"
        )
    
    # Read and encode image
    try:
        image_content = await image.read()
        image_base64 = base64.standard_b64encode(image_content).decode("utf-8")
        media_type = get_media_type(image.filename)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading image: {str(e)}"
        )
    
    # Route to appropriate LLM
    model_handlers = {
        "claude": analyze_with_claude,
        "gpt4": analyze_with_openai,
        "gemini": analyze_with_gemini,
        "deepseek": analyze_with_deepseek,
        "grok": analyze_with_grok
    }
    
    try:
        handler = model_handlers[model]
        raw_response = await handler(image_base64, media_type, api_key)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
    
    # Parse response
    parsed = parse_analysis_response(raw_response)
    
    return AnalysisResponse(
        is_healthy=parsed.get("is_healthy", True),
        fruit_type=parsed.get("fruit_type"),
        variety=parsed.get("variety"),
        ripeness=parsed.get("ripeness"),
        disease_name=parsed.get("disease_name"),
        disease_type=parsed.get("disease_type"),
        severity=parsed.get("severity"),
        symptoms=parsed.get("symptoms", []),
        recommendations=parsed.get("recommendations", []),
        raw_analysis=raw_response,
        model_used=model
    )


# ═══════════════════════════════════════════════════════════════════════════════
# Main Entry Point
# ═══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    import uvicorn
    print("🍎 Starting AI Fruit Analyzer API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
