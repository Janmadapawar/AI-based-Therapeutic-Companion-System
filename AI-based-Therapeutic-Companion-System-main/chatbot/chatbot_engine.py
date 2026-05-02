import random

# -------------------------------
# MEMORY (session-based)
# -------------------------------
chat_memory = {
    "last_intent": None,
    "history": [],
    "emotion_scores": {},
    "used_responses": [],
    "current_topic": None
}

# -------------------------------
# INTENT KEYWORDS
# -------------------------------
intent_map = {
    "stress": ["stress", "stressed", "overwhelmed", "pressure", "tired", "burnout"],
    "sad": ["sad", "lonely", "depressed", "low", "down"],
    "anxiety": ["anxious", "panic", "nervous", "worried"],
    "happy": ["happy", "good", "great", "excited", "joy"]
}

# -------------------------------
# RESPONSE TEMPLATES
# -------------------------------
responses = {
    "stress": [
        "That sounds overwhelming. When everything piles up, it can feel hard to manage.",
        "It seems like you're under a lot of pressure.",
        "That kind of stress can really drain your energy."
    ],
    "sad": [
        "I'm really sorry you're feeling this way.",
        "That sounds difficult. You don’t have to go through it alone.",
        "That must feel heavy to carry."
    ],
    "anxiety": [
        "It sounds like your mind might be racing right now.",
        "Anxiety can feel intense, but you're not alone.",
        "That kind of worry can be exhausting."
    ],
    "happy": [
        "That’s really nice to hear 😊",
        "I love that energy!",
        "That sounds like a positive moment."
    ],
    "default": [
        "I’m here for you.",
        "Take your time — I’m listening.",
        "Go on, I’m with you."
    ]
}

# -------------------------------
# UNIQUE RESPONSE HANDLER
# -------------------------------
def get_unique_response(intent):
    possible = responses.get(intent, responses["default"])

    unused = [r for r in possible if r not in chat_memory["used_responses"]]

    if not unused:
        chat_memory["used_responses"] = []
        unused = possible

    choice = random.choice(unused)
    chat_memory["used_responses"].append(choice)

    return choice

# -------------------------------
# FOLLOW UPS
# -------------------------------
def generate_followup(intent):
    followups = {
        "stress": [
            "What’s been stressing you the most lately?",
            "Is this something recent or ongoing?"
        ],
        "sad": [
            "Do you want to share what’s making you feel this way?",
            "When did you start feeling like this?"
        ],
        "anxiety": [
            "What thoughts are running through your mind right now?",
            "Is something specific triggering this?"
        ],
        "happy": [
            "That’s great! What made it happen?",
            "Tell me more about it!"
        ],
        "default": [
            "I’m here, go on.",
            "Tell me more."
        ]
    }

    return random.choice(followups.get(intent, followups["default"]))

# -------------------------------
# INTENT DETECTION
# -------------------------------
def detect_intent(text):
    text = text.lower()
    for intent, words in intent_map.items():
        if any(word in text for word in words):
            return intent
    return "default"

# -------------------------------
# EMOTION SCORING
# -------------------------------
def calculate_emotions(text):
    text = text.lower()

    scores = {k: 0 for k in intent_map}

    for intent, words in intent_map.items():
        for word in words:
            if word in text:
                scores[intent] += 2

    if "very" in text or "too much" in text:
        for k in scores:
            scores[k] += 1

    if "not" in text or "don't" in text:
        scores["happy"] -= 1

    for k in scores:
        scores[k] = max(0, min(10, scores[k]))

    return scores

# -------------------------------
# TOP EMOTIONS
# -------------------------------
def get_top_emotions(emotions):
    sorted_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)
    return sorted_emotions[:2]

# -------------------------------
# CBT DETECTION
# -------------------------------
def detect_cbt_pattern(text):
    text = text.lower()

    if any(p in text for p in ["not capable", "useless", "worthless", "i can't do anything"]):
        return "all_or_nothing"

    if any(p in text for p in ["always", "never", "nothing works"]):
        return "overgeneralization"

    if any(p in text for p in ["everything is going wrong", "worst", "ruined"]):
        return "catastrophizing"

    if any(p in text for p in ["my fault", "i blame myself"]):
        return "self_blame"

    return None

# -------------------------------
# CBT RESPONSES
# -------------------------------
def cbt_response(pattern):
    responses = {
        "all_or_nothing":
            "You’re being very hard on yourself. Is it really true you’re not capable of anything? Let’s find one thing you did well.",

        "overgeneralization":
            "It feels like this happens all the time, but can we think of even one exception?",

        "catastrophizing":
            "It feels overwhelming, but what’s the realistic worst-case scenario and how likely is it?",

        "self_blame":
            "You’re blaming yourself a lot — could there be other factors involved too?"
    }

    return responses.get(pattern)

# -------------------------------
# RECOVERY DETECTION
# -------------------------------
def detect_recovery(text):
    text = text.lower()
    positive_signs = ["i can", "i did", "i improved", "i tried", "i handled"]
    return any(p in text for p in positive_signs)

# -------------------------------
# SMART SUGGESTIONS
# -------------------------------
def smart_suggestions(emotions, scores):
    dominant = max(emotions, key=emotions.get)

    if dominant == "stress":
        return "Try breaking tasks into smaller steps and focus on one at a time."

    if dominant == "anxiety":
        return "Slow breathing can help — inhale 4, hold 4, exhale 6."

    if dominant == "sad":
        return "Writing your thoughts or talking to someone you trust can help."

    if dominant == "happy":
        return "Capture this moment — reflect on what made you feel good."

    return "Take things one step at a time."

# -------------------------------
# OPTIONS
# -------------------------------
def generate_options(intent):
    base = ["Talk more about it"]

    if intent in ["stress", "anxiety"]:
        base.append("Try calming exercise")

    if intent == "sad":
        base.append("Get emotional support tips")

    if intent == "happy":
        base.append("Celebrate this moment")

    return base

# -------------------------------
# EXERCISE
# -------------------------------
def get_exercise(intent):
    if intent in ["stress", "anxiety"]:
        return "Try this: Inhale 4s, hold 4s, exhale 6s (repeat 5 times)."

    if intent == "sad":
        return "Try 5-4-3-2-1 grounding: 5 see, 4 feel, 3 hear, 2 smell, 1 taste."

    return "Take a slow deep breath and relax your shoulders."

# -------------------------------
# MAIN CHATBOT LOGIC
# -------------------------------
def chatbot_reply(user_input, scores):

    intent = detect_intent(user_input)
    emotions = calculate_emotions(user_input)

    chat_memory["emotion_scores"] = emotions
    chat_memory["history"].append(user_input)

    # CONTEXT MEMORY
    if intent != "default":
        chat_memory["current_topic"] = intent
    else:
        if chat_memory["current_topic"]:
            intent = chat_memory["current_topic"]

    # RECOVERY
    if detect_recovery(user_input):
        return {
            "response": "That’s important — you recognized something positive in yourself. How did that feel?",
            "options": ["Talk more about it"],
            "intent": "positive_shift"
        }

    # CBT
    pattern = detect_cbt_pattern(user_input)
    if pattern:
        return {
            "response": cbt_response(pattern),
            "options": ["Challenge this thought", "Talk more about it"],
            "intent": intent
        }

    # BASE RESPONSE
    base = get_unique_response(intent)

    # EMOTION CONTEXT
    top_emotions = get_top_emotions(emotions)
    context = ""

    if top_emotions[0][1] > 3 and top_emotions[1][1] > 2:
        context += f" I'm sensing both {top_emotions[0][0]} and {top_emotions[1][0]}."

    # FOLLOW-UP
    follow = " " + generate_followup(intent)

    return {
        "response": base + context + follow,
        "options": generate_options(intent),
        "intent": intent
    }

# -------------------------------
# OPTION HANDLER
# -------------------------------
def handle_option(option, intent, scores):

    emotions = chat_memory.get("emotion_scores", {})

    if option == "Challenge this thought":
        return "What evidence supports this thought? What might go against it?"

    if option == "Talk more about it":
        return "I'm here for you. Tell me everything."

    if option == "Get emotional support tips":
        return smart_suggestions(emotions, scores)

    if option == "Try calming exercise":
        return get_exercise(intent)

    if option == "Celebrate this moment":
        return "Take a moment to appreciate it — maybe write it down!"

    return "I'm here with you."