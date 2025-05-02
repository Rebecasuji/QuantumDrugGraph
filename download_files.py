import os
import zipfile
from datetime import datetime

def create_zip_file():
    # Get current timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_filename = f"website_code_{timestamp}.zip"

    # Create a zip file
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Walk through directories and add files
        for root, dirs, files in os.walk('.'):
            # Skip node_modules, git and other unnecessary directories
            if any(x in root for x in ['/node_modules', '/.git', '/__pycache__', '/dist']):
                continue

            for file in files:
                # Skip the zip file itself and large/binary files
                if file.endswith('.zip') or file == 'gnn_model_fixed.pth':
                    continue

                file_path = os.path.join(root, file)
                # Add file to zip with relative path
                arcname = os.path.relpath(file_path, '.')
                zipf.write(file_path, arcname)

    print(f"Created zip file: {zip_filename}")
    return zip_filename

if __name__ == "__main__":
    zip_file = create_zip_file()
    print(f"You can now download: {zip_file}")