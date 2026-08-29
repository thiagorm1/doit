from PIL import Image
import sys

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Identify background color by checking top-left pixel
    bg_color = data[0]
    
    # We will remove pixels that are similar to the background color
    tolerance = 50
    new_data = []
    
    for item in data:
        # Check if the pixel color is close to the background color
        if abs(item[0] - bg_color[0]) < tolerance and \
           abs(item[1] - bg_color[1]) < tolerance and \
           abs(item[2] - bg_color[2]) < tolerance:
            # Change to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

remove_background("public/logo.png", "public/logo_transparent.png")
