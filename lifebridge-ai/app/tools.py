import datetime
from google.adk.tools import ToolContext

# Mock databases - Strict Indian Version
SHELTER_DB = {
    "mumbai": [
        {"name": "St. Xavier's School Hall", "address": "Mahapalika Marg, Dhobi Talao", "capacity": "150/200", "status": "Open", "resources": ["Food", "Clean Water", "First Aid"]},
        {"name": "Dharavi Community Center", "address": "Sion-Bandra Link Rd", "capacity": "80/300", "status": "Open", "resources": ["Food", "Clean Water", "Basic Medical Camp"]},
        {"name": "Andheri Sports Complex", "address": "Veera Desai Road", "capacity": "500/500", "status": "Full", "resources": ["Food", "Water", "Doctor on site"]}
    ],
    "chennai": [
        {"name": "Nehru Indoor Stadium", "address": "Periamet, Chennai", "capacity": "450/1500", "status": "Open", "resources": ["Cots", "Hot meals", "Water", "Medical station"]},
        {"name": "Tambaram Community Hall", "address": "Tambaram, Chennai", "capacity": "150/200", "status": "Open", "resources": ["Food", "Water", "First Aid"]}
    ],
    "guwahati": [
        {"name": "Guwahati University Hall", "address": "Jalukbari, Guwahati", "capacity": "120/500", "status": "Open", "resources": ["Food", "Drinking Water", "First Aid"]},
        {"name": "Dispur relief camp", "address": "Dispur, Guwahati", "capacity": "300/300", "status": "Full", "resources": ["Food", "Water"]}
    ],
    "puri": [
        {"name": "Cyclone Shelter - Puri Beach", "address": "Sea Drive Road, Puri", "capacity": "600/1000", "status": "Open", "resources": ["High-energy rations", "Water purifiers", "Emergency medical wing"]}
    ]
}

ROAD_SAFETY_DB = {
    ("mumbai", "thane"): {
        "status": "Hazardous",
        "reason": "Severe waterlogging on Eastern Express Highway near Kurla. Traffic is halted.",
        "alternative_route": "Use LBS Road or SCLR, but drive slowly due to heavy rainfall."
    },
    ("chennai", "tambaram"): {
        "status": "Closed",
        "reason": "Heavy water stagnation near Tambaram underpass due to monsoon rains.",
        "alternative_route": "Use Outer Ring Road (ORR) for transit."
    },
    ("guwahati", "dispur"): {
        "status": "Closed",
        "reason": "Landslide on GS Road blocking both lanes.",
        "alternative_route": "Take VIP Road detour. Slow moving traffic."
    },
    ("puri", "bhubaneswar"): {
        "status": "Closed",
        "reason": "National Highway 316 blocked by uprooted trees from the cyclone.",
        "alternative_route": "No safe alternative route currently. Cyclone landfall in progress. Stay sheltered."
    }
}

MEDICAL_HELP_DB = {
    "mumbai": [
        {"name": "KEM Hospital", "address": "Acharya Donde Marg, Parel", "contact": "+91-22-2410-7000", "status": "Emergency Room Open", "notes": "High patient volume, triage active."},
        {"name": "Lilavati Hospital", "address": "A.K. Road, Bandra West", "contact": "+91-22-2675-1000", "status": "Emergency Room Open", "notes": "Fully functional, ambulance service available."}
    ],
    "chennai": [
        {"name": "Rajiv Gandhi Govt General Hospital", "address": "EVR Periyar Salai, Park Town", "contact": "+91-44-2530-5000", "status": "Open", "notes": "Disaster emergency wing fully active."},
        {"name": "Apollo Hospitals Greams Road", "address": "21, Greams Lane", "contact": "+91-44-2829-0200", "status": "Open", "notes": "Ambulances on standby for rescue calls."}
    ],
    "guwahati": [
        {"name": "Gauhati Medical College & Hospital", "address": "Bhangagarh, Guwahati", "contact": "+91-361-213-0200", "status": "Open", "notes": "Special flood-injury wing running."}
    ]
}

WEATHER_ALERTS_DB = {
    "mumbai": {
        "alert": "Red Alert: Severe monsoon rain and high tide warning. Avoid coastal areas.",
        "severity": "Extreme",
        "details": "Heavy rainfall exceeding 200mm expected. High tide at 4:30 PM (4.5 meters). Risk of flash flooding."
    },
    "chennai": {
        "alert": "Orange Alert: Persistent heavy rainfall with waterlogging risk.",
        "severity": "Severe",
        "details": "Northeast monsoon active. Chennai and adjoining districts to expect 100-150mm rain."
    },
    "odisha": {
        "alert": "Cyclone Warning: Very Severe Cyclonic Storm 'Dana' landfall expected.",
        "severity": "Extreme",
        "details": " landfall near Dhamra port with wind speeds of 110-120 kmph. High tidal waves likely."
    },
    "assam": {
        "alert": "Flood Warning: Brahmaputra River flowing above danger mark.",
        "severity": "Extreme",
        "details": "Vast areas of Kaziranga and surrounding villages inundated. Embankments under threat."
    }
}

FIRST_AID_DB = {
    "cpr": [
        "1. Check if the scene is safe, then check the person for responsiveness (tap and shout).",
        "2. If unresponsive, call local emergency services (112 or 108) immediately.",
        "3. Place the person on their back on a firm, flat surface.",
        "4. Give 30 chest compressions: Place hands in the center of the chest, push hard and fast (100-120 beats per minute, 2 inches deep).",
        "5. Give 2 rescue breaths: Tilt head back, lift chin, pinch nose, and blow into the mouth until chest rises.",
        "6. Repeat cycles of 30 compressions and 2 breaths until help arrives or the person recovers."
    ],
    "bleeding": [
        "1. Put on protective gloves if available.",
        "2. Apply direct, firm pressure on the wound with a clean cloth, sterile bandage, or your hand.",
        "3. Elevate the injured limb above the level of the heart if possible.",
        "4. If bleeding doesn't stop, apply a second bandage on top of the first. Do not remove the first bandage.",
        "5. If bleeding is life-threatening and on a limb, apply a tourniquet above the wound if trained to do so."
    ],
    "snake bite": [
        "1. Stay calm and move away from the snake's striking distance.",
        "2. Note the snake's appearance (color, shape) for medical staff, but DO NOT try to catch or kill it.",
        "3. Keep the bitten limb still and position it at or below the level of the heart.",
        "4. Remove any tight clothing, rings, or jewelry near the bite before swelling starts.",
        "5. Clean the wound gently with water, but DO NOT flush it under high pressure.",
        "6. Cover with a clean, dry dressing.",
        "7. WARNING: DO NOT cut the wound, DO NOT try to suck out the venom, DO NOT apply ice, and DO NOT use a tourniquet."
    ]
}

SUPPLIES_DB = {
    "flood": [
        "Clean drinking water (1 gallon per person per day for at least 3 days)",
        "Non-perishable, ready-to-eat food (biscuits, canned goods, energy bars)",
        "Waterproof flashlight and extra batteries",
        "First aid kit, including essential personal prescription medications",
        "Personal hygiene items and hand sanitizer",
        "Important documents (Aadhaar, insurance, deeds) in a sealed waterproof bag",
        "Whistle to signal for help",
        "Multi-tool or knife"
    ],
    "cyclone": [
        "Heavy-duty flashlight or lantern with extra batteries",
        "Portable power bank for mobile phones (fully charged)",
        "Battery-operated or hand-crank AM/FM radio for emergency broadcasts",
        "First aid kit and prescription medications",
        "Matches or lighter in a waterproof container",
        "Non-perishable food and bottled water (3-day supply)",
        "Warm clothing, sturdy closed-toe shoes, and rainwear",
        "Cash (ATMs may lose power)"
    ],
    "accident": [
        "First aid kit (sterile gauze, adhesive tape, antiseptic wipes, bandages)",
        "High-visibility reflective safety vest",
        "Warning triangle or road flares to place behind the vehicle",
        "Seatbelt cutter and window breaker tool",
        "Working flashlight",
        "Basic contact list of emergency services (112, 100) and family"
    ]
}

def find_shelters(location: str) -> dict:
    """Finds open emergency shelters in a given location.

    Args:
        location: The city or area to find shelters for (e.g. 'Mumbai', 'Chennai', 'Guwahati', 'Puri').

    Returns:
        A dictionary containing a list of shelters, their status, capacity, and available resources.
    """
    loc_key = location.strip().lower()
    if loc_key in SHELTER_DB:
        return {"status": "success", "location": location, "shelters": SHELTER_DB[loc_key]}
    return {
        "status": "no_results",
        "message": f"No active emergency shelters registered in '{location}' at this time. Please seek higher ground or contact local rescue helplines."
    }

def check_road_safety(start: str, destination: str) -> dict:
    """Checks the safety status of roads or routes between two points during a disaster.

    Args:
        start: The starting location name.
        destination: The destination location name.

    Returns:
        A dictionary indicating road safety status, reasons for hazard/closures, and alternative route suggestions.
    """
    key = (start.strip().lower(), destination.strip().lower())
    if key in ROAD_SAFETY_DB:
        return {"status": "success", "route": f"{start} to {destination}", "info": ROAD_SAFETY_DB[key]}
    
    # Reverse key check
    rev_key = (destination.strip().lower(), start.strip().lower())
    if rev_key in ROAD_SAFETY_DB:
        return {"status": "success", "route": f"{start} to {destination}", "info": ROAD_SAFETY_DB[rev_key]}

    return {
        "status": "unknown",
        "route": f"{start} to {destination}",
        "message": f"No active blockages reported on the route from {start} to {destination}. Drive with caution as weather conditions may change."
    }

def get_medical_help(location: str) -> dict:
    """Lists emergency medical camps, clinics, or hospitals in the area.

    Args:
        location: The city or area to find medical help for (e.g. 'Mumbai', 'Chennai', 'Guwahati').

    Returns:
        A dictionary listing open emergency medical options and helpline contacts.
    """
    loc_key = location.strip().lower()
    if loc_key in MEDICAL_HELP_DB:
        return {"status": "success", "location": location, "medical_facilities": MEDICAL_HELP_DB[loc_key]}
    return {
        "status": "no_results",
        "message": f"No special emergency medical camps found in '{location}'. Please contact local general emergency services (102/108) or go to the nearest public hospital."
    }

def first_aid_guidance(scenario: str) -> dict:
    """Provides step-by-step instructions for life-saving first aid in different scenarios.

    Args:
        scenario: The type of injury or medical scenario (e.g. 'CPR', 'bleeding', 'snake bite').

    Returns:
        A dictionary containing step-by-step emergency instructions and safety warnings.
    """
    scen_key = scenario.strip().lower()
    if scen_key in FIRST_AID_DB:
        return {"status": "success", "scenario": scenario, "instructions": FIRST_AID_DB[scen_key]}
    
    # Simple substring matching
    for key, instructions in FIRST_AID_DB.items():
        if key in scen_key or scen_key in key:
            return {"status": "success", "scenario": key, "instructions": instructions}

    return {
        "status": "unknown_scenario",
        "message": f"First aid instructions for '{scenario}' not found. Please call a medical professional or emergency services (112) immediately."
    }

def get_emergency_checklist(disaster_type: str) -> dict:
    """Provides a checklist of essential emergency supplies needed for a specific disaster.

    Args:
        disaster_type: The type of disaster (e.g. 'flood', 'cyclone', 'accident').

    Returns:
        A dictionary listing the recommended emergency supplies.
    """
    dis_key = disaster_type.strip().lower()
    if dis_key in SUPPLIES_DB:
        return {"status": "success", "disaster_type": disaster_type, "checklist": SUPPLIES_DB[dis_key]}
    
    # Simple substring matching
    for key, checklist in SUPPLIES_DB.items():
        if key in dis_key or dis_key in key:
            return {"status": "success", "disaster_type": key, "checklist": checklist}

    return {
        "status": "generic_checklist",
        "checklist": [
            "Clean drinking water",
            "First aid kit",
            "Flashlight and batteries",
            "Emergency contacts list",
            "Copy of important identification documents (Aadhaar)"
        ]
    }

def weather_alerts(location: str) -> dict:
    """Retrieves active weather alerts or warnings for a specific city or area.

    Args:
        location: The city or area to check alerts for (e.g. 'Mumbai', 'Chennai', 'Odisha', 'Assam').

    Returns:
        A dictionary containing the active warning alert, its severity, and details.
    """
    loc_key = location.strip().lower()
    if loc_key in WEATHER_ALERTS_DB:
        return {"status": "success", "location": location, "alert_info": WEATHER_ALERTS_DB[loc_key]}
    return {
        "status": "clear",
        "message": f"No active severe weather warnings or alerts for '{location}' at this time."
    }

async def broadcast_sos(user_location: str, contact_number: str, tool_context: ToolContext) -> dict:
    """Simulates broadcasting a life-saving SOS distress signal to NDRF, local state rescue authorities, and family.

    Args:
        user_location: Description of user's current location (e.g., GPS coordinates or landmarks).
        contact_number: User's contact number to receive callbacks.

    Returns:
        A dictionary confirming the broadcast was successfully sent with instructions.
    """
    # Write to tool_context state to simulate persistence of the SOS signal
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sos_alert = {
        "timestamp": timestamp,
        "user_location": user_location,
        "contact_number": contact_number,
        "status": "DISPATCHED"
    }
    tool_context.state["last_sos"] = sos_alert

    return {
        "status": "success",
        "sos_details": sos_alert,
        "message": "🚨 SOS Broadcast successful! NDRF and local district authorities have been notified of your location. Please stay where you are if it is safe, and keep your phone line clear."
    }

def get_emergency_directories() -> dict:
    """Returns official contact directories for disaster response services in India.

    Returns:
        A dictionary of emergency helpline numbers.
    """
    return {
        "status": "success",
        "directory": {
            "National Emergency Number": "112",
            "Police": "100",
            "Fire Dept": "101",
            "Ambulance / Medical Help": "108 / 102",
            "National Disaster Response Force (NDRF)": "1078",
            "State Disaster Management Authority": "1070"
        }
    }
