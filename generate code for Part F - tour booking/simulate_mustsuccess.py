import pandas as pd
import random
from datetime import datetime, timedelta

# Define user roles and activities
users = ["Alice", "Bob", "Charlie", "David", "Eve"]

# Separate activities by type and order
user_activities = [
    "Browse attraction page",  # 1
    "Search for attraction",   # 1
    "Click specific attraction book now button",  # 3
    "View specific tour details",  # 5
    "Fill personal information and click book button",  # 6
    "Confirm and pay",  # 10
    "Receive confirmation"  # 14
]

service_provider_activities = {
    "VisitorInformationSystem": "Response attraction information to user",  # 2
    "BookingSystem": [
        "Response tour information to user",  # 4
        "Validate user input",  # 7
        "Create an order and return an order id to user",  # 9
        "Send confirmation message to user"  # 13
    ],
    "InventorySystem": [
        "Check availability",  # 8
        "Update inventory"  # 12
    ],
    "PaymentGateway": "Validate user payment information and process payment"  # 11
}

# Function to log activities and create a CSV entry
def log_activity_and_write_to_csv(case_id, activity_name, resource, start_time, end_time):
    csv_entry = [case_id, start_time, end_time, activity_name, resource]
    return csv_entry

# Function to simulate time passing
def time_passes():
    return timedelta(seconds=random.uniform(1, 5))

# Simulate the booking process
def simulate_booking_process(num_cases):
    all_entries = []
    case_counter = 1
    for _ in range(num_cases):
        case_id = str(case_counter)
        case_counter += 1
        user = random.choice(users)
        current_time = datetime.now()
        
        # Step 1: User chooses to browse or search
        activity = random.choice(user_activities[:2])
        end_time = current_time + time_passes()
        all_entries.append(log_activity_and_write_to_csv(case_id, activity, user, current_time, end_time))
        current_time = end_time

        # Step 2: VisitorInformationSystem responds
        activity = service_provider_activities["VisitorInformationSystem"]
        end_time = current_time + time_passes()
        all_entries.append(log_activity_and_write_to_csv(case_id, activity, "VisitorInformationSystem", current_time, end_time))
        current_time = end_time

        # Step 3-14: Rest of the process
        activities_order = [
            (user_activities[2], user),
            (service_provider_activities["BookingSystem"][0], "BookingSystem"),
            (user_activities[3], user),
            (user_activities[4], user),
            (service_provider_activities["BookingSystem"][1], "BookingSystem"),
            (service_provider_activities["InventorySystem"][0], "InventorySystem"),
            (service_provider_activities["BookingSystem"][2], "BookingSystem"),
            (user_activities[5], user),
            (service_provider_activities["PaymentGateway"], "PaymentGateway"),
            (service_provider_activities["InventorySystem"][1], "InventorySystem"),
            (service_provider_activities["BookingSystem"][3], "BookingSystem"),
            (user_activities[6], user)
        ]

        for activity, resource in activities_order:
            end_time = current_time + time_passes()
            all_entries.append(log_activity_and_write_to_csv(case_id, activity, resource, current_time, end_time))
            current_time = end_time

    return all_entries

# Write to CSV file using pandas
def write_to_csv(entries):
    df = pd.DataFrame(entries, columns=["Case ID", "Start Timestamp", "Complete Timestamp", "Task", "Resource"])
    df.to_csv('attraction_booking_log.csv', index=False)
    print(f"Simulation complete. Check 'attraction_booking_log.csv' for the results.")

# Main execution
if __name__ == "__main__":
    num_cases = 5  # Number of booking processes to simulate
    log_entries = simulate_booking_process(num_cases)
    write_to_csv(log_entries)