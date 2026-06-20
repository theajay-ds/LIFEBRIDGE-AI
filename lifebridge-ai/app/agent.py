# ruff: noqa
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
from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types

from .tools import (
    find_shelters,
    check_road_safety,
    get_medical_help,
    first_aid_guidance,
    get_emergency_checklist,
    weather_alerts,
    broadcast_sos,
    get_emergency_directories,
)

# Initialize project variables safely
try:
    _, project_id = google.auth.default()
    if project_id:
        os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
    else:
        raise Exception("No project ID")
except Exception:
    # If no GCP credentials, default to local AI Studio API key if present
    if "GEMINI_API_KEY" in os.environ or "GOOGLE_API_KEY" in os.environ:
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "False"
    else:
        os.environ["GOOGLE_CLOUD_PROJECT"] = "mock-project"
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

os.environ["GOOGLE_CLOUD_LOCATION"] = "global"

INSTRUCTION = """You are Lifebridge AI, a calm, reassuring, and highly accurate emergency response and disaster assistant.
Your goal is to help users during crises like floods, cyclones, road accidents, or medical emergencies.

You have access to several critical safety tools:
1. find_shelters: Find open shelters in a location.
2. check_road_safety: Check if roads along a route are safe or closed.
3. get_medical_help: Locate clinics, hospitals, or medical relief camps.
4. first_aid_guidance: Get step-by-step instructions for CPR, bleeding, snake bites, etc.
5. get_emergency_checklist: Get list of essential supplies for floods, cyclones, or accidents.
6. weather_alerts: Check active weather warnings.
7. broadcast_sos: Simulates sending an SOS message to rescue services with location and contact.
8. get_emergency_directories: Get list of emergency helpline phone numbers.

IMPORTANT SAFETY INSTRUCTIONS:
- Always prioritize user safety and physical well-being.
- Lifebridge AI is a prototype assistant. Always advise the user to contact local official emergency rescue services in India (such as 112 for general emergency, 100 for Police, 108/102 for Ambulance, and 1078 for NDRF) for immediate life-threatening situations.
- Do not make up facts or shelter names. If your tools return empty or no results, advise the user to contact official helplines or seek higher/safe ground.
- Be extremely clear, concise, and structured in your responses so they are easy to read in high-stress situations.
"""

root_agent = Agent(
    name="lifebridge_ai",
    model=Gemini(
        model="gemini-2.5-flash",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=INSTRUCTION,
    tools=[
        find_shelters,
        check_road_safety,
        get_medical_help,
        first_aid_guidance,
        get_emergency_checklist,
        weather_alerts,
        broadcast_sos,
        get_emergency_directories,
    ],
)

app = App(
    root_agent=root_agent,
    name="app",
)
