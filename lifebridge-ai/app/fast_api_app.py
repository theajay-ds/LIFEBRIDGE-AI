# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import os

import google.auth
from fastapi import FastAPI
from google.adk.cli.fast_api import get_fast_api_app
from google.cloud import logging as google_cloud_logging

from app.app_utils.telemetry import setup_telemetry
from app.app_utils.typing import Feedback

setup_telemetry()
_, project_id = google.auth.default()
logging_client = google_cloud_logging.Client()
logger = logging_client.logger(__name__)
allow_origins = (
    os.getenv("ALLOW_ORIGINS", "").split(",") if os.getenv("ALLOW_ORIGINS") else None
)

# Artifact bucket for ADK (created by Terraform, passed via env var)
logs_bucket_name = os.environ.get("LOGS_BUCKET_NAME")

AGENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# In-memory session configuration - no persistent storage
session_service_uri = None

artifact_service_uri = f"gs://{logs_bucket_name}" if logs_bucket_name else None

app: FastAPI = get_fast_api_app(
    agents_dir=AGENT_DIR,
    web=True,
    artifact_service_uri=artifact_service_uri,
    allow_origins=allow_origins,
    session_service_uri=session_service_uri,
    otel_to_cloud=True,
)
app.title = "lifebridge-ai"
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.tools import (
    find_shelters,
    check_road_safety,
    get_medical_help,
    first_aid_guidance,
    get_emergency_checklist,
    weather_alerts,
    broadcast_sos,
    get_emergency_directories
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.description = "API for interacting with the Agent lifebridge-ai"


@app.post("/feedback")
def collect_feedback(feedback: Feedback) -> dict[str, str]:
    """Collect and log feedback.

    Args:
        feedback: The feedback data to log

    Returns:
        Success message
    """
    logger.log_struct(feedback.model_dump(), severity="INFO")
    return {"status": "success"}


class ChatRequest(BaseModel):
    message: str
    location: str = "mumbai"
    disaster_type: str = "flood"


def generate_mock_response(message: str, location: str, disaster_type: str) -> str:
    msg = message.lower()
    
    # 1. Directory lookup
    if any(k in msg for k in ["helpline", "directory", "phone", "contact", "number"]):
        dir_res = get_emergency_directories()
        dir_dict = dir_res["directory"]
        lines = ["Here are the official emergency helpline numbers:\n"]
        for k, v in dir_dict.items():
            lines.append(f"• **{k}**: {v}")
        return "\n".join(lines)
        
    # 2. SOS
    if any(k in msg for k in ["sos", "broadcast", "stranded", "rescue", "help"]):
        return ("🚨 **SOS Alert Dispatched!**\n\n"
                "We have simulated broadcasting your coordinates to rescue teams. "
                "Local emergency responders (NDRF / Police) have been notified. "
                "Please stay where you are if it is safe, and keep your phone line clear.\n\n"
                "**Emergency helpline:** 112 / 100 / 108")
                
    # 3. Shelters
    if any(k in msg for k in ["shelter", "accommodation", "stay", "refuge"]):
        shelter_res = find_shelters(location)
        if shelter_res["status"] == "success":
            lines = [f"Here are open emergency shelters in **{location.title()}**:\n"]
            for s in shelter_res["shelters"]:
                status_icon = "🟢" if s["status"] == "Open" else "🔴"
                lines.append(f"### {s['name']} ({s['status']})")
                lines.append(f"• **Address:** {s['address']}")
                lines.append(f"• **Capacity:** {s['capacity']}")
                lines.append(f"• **Resources:** {', '.join(s['resources'])}")
                lines.append("")
            return "\n".join(lines)
        else:
            return shelter_res["message"]
            
    # 4. Road safety
    if any(k in msg for k in ["road", "route", "closed", "highway", "block", "safe"]):
        start, dest = "mumbai", "thane"
        if "houston" in msg or "galveston" in msg:
            start, dest = "houston", "galveston"
        elif "miami" in msg or "key" in msg:
            start, dest = "miami", "key largo"
            
        road_res = check_road_safety(start, dest)
        if road_res["status"] == "success":
            info = road_res["info"]
            return (f"🛣️ **Route Check: {start.title()} to {dest.title()}**\n\n"
                    f"• **Status:** {info['status']}\n"
                    f"• **Reason:** {info['reason']}\n"
                    f"• **Alternative Route:** {info['alternative_route']}")
        else:
            return road_res["message"]
            
    # 5. Medical
    if any(k in msg for k in ["medical", "hospital", "clinic", "doctor", "medicine"]):
        med_res = get_medical_help(location)
        if med_res["status"] == "success":
            lines = [f"🏥 **Medical Assistance in {location.title()}**:\n"]
            for f in med_res["medical_facilities"]:
                lines.append(f"### {f['name']} - {f['status']}")
                lines.append(f"• **Address:** {f['address']}")
                lines.append(f"• **Contact:** {f['contact']}")
                lines.append(f"• **Notes:** {f['notes']}")
                lines.append("")
            return "\n".join(lines)
        else:
            return med_res["message"]
            
    # 6. First aid
    if any(k in msg for k in ["first aid", "cpr", "bite", "bleeding", "wound", "choking"]):
        scenario = "cpr"
        if "bite" in msg:
            scenario = "snake bite"
        elif any(k in msg for k in ["bleed", "wound", "blood"]):
            scenario = "bleeding"
            
        fa_res = first_aid_guidance(scenario)
        if fa_res["status"] == "success":
            lines = [f"🩺 **First Aid Instructions for {fa_res['scenario'].upper()}**:\n"]
            for step in fa_res["instructions"]:
                lines.append(step)
            return "\n".join(lines)
        else:
            return fa_res["message"]
            
    # 7. Checklist
    if any(k in msg for k in ["checklist", "supply", "supplies", "pack", "prepare"]):
        chk_res = get_emergency_checklist(disaster_type)
        lines = [f"📦 **Emergency Checklist for {disaster_type.title()}**:\n"]
        for item in chk_res["checklist"]:
            lines.append(f"⬜ {item}")
        return "\n".join(lines)
        
    # 8. Weather
    if any(k in msg for k in ["weather", "alert", "cyclone", "rain", "storm", "flood"]):
        w_res = weather_alerts(location)
        if w_res["status"] == "success":
            info = w_res["alert_info"]
            return (f"⚠️ **Weather Alert for {location.title()}**\n\n"
                    f"• **Alert:** {info['alert']}\n"
                    f"• **Severity:** {info['severity']}\n"
                    f"• **Details:** {info['details']}")
        else:
            return w_res["message"]

    return (f"Hello! I am Lifebridge AI, your emergency coordination assistant.\n\n"
            f"I can help you find open shelters, check road safety, locate medical help, "
            f"provide first aid guides, or prepare emergency supply lists.\n\n"
            f"**Active Location:** {location.title()} | **Disaster Mode:** {disaster_type.title()}\n\n"
            f"How can I assist you right now?")


@app.post("/api/chat")
def chat_endpoint(request: ChatRequest) -> dict[str, str]:
    try:
        return {"response": generate_mock_response(request.message, request.location, request.disaster_type)}
    except Exception as e:
        return {"response": f"Error generating response: {str(e)}"}


# Main execution
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

