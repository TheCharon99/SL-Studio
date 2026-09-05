import os

# Create simple PNG images using minimal PNG structure
def create_png(width, height, r, g, b, path):
    """Create a minimal solid color PNG"""
    # PNG signature
    png_sig = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = 0x907753d5  # Pre-calculated CRC for this specific IHDR
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT chunk (raw image data)
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter byte
        for x in range(width):
            raw_data += bytes([r, g, b])
    
    # Simple deflate compression (minimal)
    import zlib
    compressed = zlib.compress(raw_data)
    
    idat_crc = zlib.crc32(b'IDAT' + compressed) & 0xffffffff
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    # IEND chunk
    iend_crc = 0xae426082
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    with open(path, 'wb') as f:
        f.write(png_sig + ihdr_chunk + idat_chunk + iend_chunk)

import struct
create_png(81, 80, 153, 153, 153, 'E:/portfolio/dazi/images/home.png')
create_png(81, 80, 102, 126, 234, 'E:/portfolio/dazi/images/home-active.png')
create_png(81, 80, 153, 153, 153, 'E:/portfolio/dazi/images/create.png')
create_png(81, 80, 102, 126, 234, 'E:/portfolio/dazi/images/create-active.png')
create_png(81, 80, 153, 153, 153, 'E:/portfolio/dazi/images/profile.png')
create_png(81, 80, 102, 126, 234, 'E:/portfolio/dazi/images/profile-active.png')
print('PNG files created successfully')
