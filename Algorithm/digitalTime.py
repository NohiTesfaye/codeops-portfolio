def digitalClock(seconds):
    # Normalize seconds to within a single day (24h = 86400s)
    seconds = seconds % 86400  
    
    # Calculate hours, minutes, seconds
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    
    # Format with leading zeros
    return f"{hours:02}:{minutes:02}:{secs:02}"
print(digitalClock(5025))    # "01:23:45"
print(digitalClock(61201))   # "17:00:01"
print(digitalClock(99999))   # "00:10:00"
