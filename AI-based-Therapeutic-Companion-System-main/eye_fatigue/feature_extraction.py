import numpy as np

# Eye landmark indexes (MediaPipe)
LEFT_EYE = [33, 160, 158, 133, 153, 144]

def calculate_EAR(landmarks, frame_width, frame_height):
    def get_point(idx):
        return np.array([
            int(landmarks[idx].x * frame_width),
            int(landmarks[idx].y * frame_height)
        ])

    p1 = get_point(LEFT_EYE[0])
    p2 = get_point(LEFT_EYE[1])
    p3 = get_point(LEFT_EYE[2])
    p4 = get_point(LEFT_EYE[3])
    p5 = get_point(LEFT_EYE[4])
    p6 = get_point(LEFT_EYE[5])

    vertical = np.linalg.norm(p2 - p6) + np.linalg.norm(p3 - p5)
    horizontal = np.linalg.norm(p1 - p4)

    EAR = vertical / (2.0 * horizontal)
    return EAR