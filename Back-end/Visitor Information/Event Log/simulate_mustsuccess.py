import pandas as pd
import random
from datetime import datetime, timedelta

# Define user roles and activities
users = ["Alice", "Bob", "Charlie", "David", "Eve"]

# Separate activities by type and order
user_activities = [
    "Click specific hot attraction read more button",  # Step 1: Click specific attraction
    "Browse attraction page",                          # Step 1: Browse all attractions
    "Search for attraction",                           # Step 1: Search for attractions
]

service_provider_activities = {
    1: "Response specific attraction information to user",   # Step 2: Response to 'read more'
    3: "Response all attraction information to user",        # Step 2: Response to 'Browse'
    5: "Response searched attraction information to user",   # Step 2: Response to 'Search'
}

# Function to log activities and create a CSV entry
def log_activity_and_write_to_csv(case_id, activity_name, resource, start_time, end_time):
    csv_entry = [case_id, start_time, end_time, activity_name, resource]
    return csv_entry

# Function to simulate time passing
def time_passes():
    return timedelta(seconds=random.uniform(1, 5))

# Simulate the visitor information process
def simulate_visitorInfo_process(num_cases):
    all_entries = []
    case_counter = 1
    for _ in range(num_cases):
        case_id = str(case_counter)
        case_counter += 1
        user = random.choice(users)
        current_time = datetime.now()

        # Step 1: User chooses to click, browse, or search
        activity = random.choice(user_activities)  # User can perform one of the three actions
        end_time = current_time + time_passes()
        all_entries.append(log_activity_and_write_to_csv(case_id, activity, user, current_time, end_time))
        current_time = end_time

        # Step 2: VisitorInformationSystem responds based on the user's activity
        if activity == "Click specific hot attraction read more button":
            activity = service_provider_activities[1]  # Respond with specific attraction information
        elif activity == "Browse attraction page":
            activity = service_provider_activities[3]  # Respond with all attraction information
        else:
            activity = service_provider_activities[5]  # Respond with searched attraction information
        end_time = current_time + time_passes()
        all_entries.append(log_activity_and_write_to_csv(case_id, activity, "VisitorInformationSystem", current_time, end_time))
        current_time = end_time

    return all_entries

# Write to CSV file using pandas
def write_to_csv(entries):
    df = pd.DataFrame(entries, columns=["Case ID", "Start Timestamp", "Complete Timestamp", "Task", "Resource"])
    df.to_csv('attraction_visitorInfo_log.csv', index=False)
    print(f"Simulation complete. Check 'attraction_visitorInfo_log.csv' for the results.")

# Main execution
if __name__ == "__main__":
    num_cases = 10  # Number of visitor information processes to simulate
    log_entries = simulate_visitorInfo_process(num_cases)
    write_to_csv(log_entries)
