import struct
import zlib

def create_png(width, height, color_func, path):
    """Create a minimal PNG with custom color function"""
    png_sig = b'\x89PNG\r\n\x1a\n'
    
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'
        for x in range(width):
            r, g, b = color_func(x, y, width, height)
            raw_data += bytes([r, g, b])
    
    compressed = zlib.compress(raw_data)
    idat_crc = zlib.crc32(compressed) & 0xffffffff
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    with open(path, 'wb') as f:
        f.write(png_sig + ihdr_chunk + idat_chunk + iend_chunk)

# Create default avatar (gray circle on white)
def avatar_color(x, y, w, h):
    cx, cy = w // 2, h // 2 - 5
    r = 15
    dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
    if dist < r:
        return (200, 200, 200)  # Light gray circle
    # Body
    if y > h - 25:
        return (200, 200, 200)
    return (240, 240, 240)  # White background

create_png(100, 100, avatar_color, 'E:/portfolio/dazi/images/default-avatar.png')

# Create empty state image
def empty_color(x, y, w, h):
    # Light gray background
    if y < h * 0.3:
        return (245, 246, 250)
    return (255, 255, 255)

create_png(200, 200, empty_color, 'E:/portfolio/dazi/images/empty.png')
create_png(200, 200, empty_color, 'E:/portfolio/dazi/images/empty-match.png')

print('All PNG files created successfully')
