import json

def convert_image_url_hash(data):
    for item in data:
        if 'imageUrlHash' in item:
            hash_value = item['imageUrlHash']

            if isinstance(hash_value, dict) and '$numberLong' in hash_value:
                # Convert the JSON representation to an integer
                item['imageUrlHash'] = int(hash_value['$numberLong'])

    return data

# Read data from input JSON file
input_file_path = '../dump-json/podcastito.podcasts.json'  # Replace with your actual file path
with open(input_file_path, 'r') as file:
    input_data = json.load(file)

# Convert the image URL hash
converted_data = convert_image_url_hash(input_data)

# Write the converted data to output JSON file
output_file_path = '../dump-json/podcasts.json'  # Replace with your desired output file path
with open(output_file_path, 'w') as file:
    json.dump(converted_data, file, indent=2)

print(f"Conversion completed. Converted data written to {output_file_path}")
