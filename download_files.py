
import os
import shutil

def create_directory_structure():
    # Create main directories
    directories = [
        'attached_assets',
        'client/src/components/molecules',
        'client/src/components/results',
        'client/src/components/ui',
        'client/src/components/visualization',
        'client/src/hooks',
        'client/src/lib/utils',
        'client/src/pages',
        'server',
        'shared'
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)

def copy_files():
    # Copy all files while preserving directory structure
    files_to_copy = [
        ('attached_assets/gnn_model_fixed.pth', 'attached_assets/gnn_model_fixed.pth'),
        ('client/index.html', 'client/index.html'),
        # Add all source files
        ('client/src/App.tsx', 'client/src/App.tsx'),
        ('client/src/index.css', 'client/src/index.css'),
        ('client/src/main.tsx', 'client/src/main.tsx'),
        # Add component files
        ('client/src/components/Footer.tsx', 'client/src/components/Footer.tsx'),
        ('client/src/components/Header.tsx', 'client/src/components/Header.tsx'),
        ('client/src/components/Layout.tsx', 'client/src/components/Layout.tsx'),
        # Add all other files from your project structure
        ('server/index.ts', 'server/index.ts'),
        ('server/routes.ts', 'server/routes.ts'),
        ('server/storage.ts', 'server/storage.ts'),
        ('server/vite.ts', 'server/vite.ts'),
        ('shared/schema.ts', 'shared/schema.ts'),
        # Config files
        ('.gitignore', '.gitignore'),
        ('components.json', 'components.json'),
        ('drizzle.config.ts', 'drizzle.config.ts'),
        ('package.json', 'package.json'),
        ('postcss.config.js', 'postcss.config.js'),
        ('tailwind.config.ts', 'tailwind.config.ts'),
        ('tsconfig.json', 'tsconfig.json'),
        ('vite.config.ts', 'vite.config.ts')
    ]
    
    for src, dest in files_to_copy:
        try:
            shutil.copy2(src, dest)
            print(f"Copied: {src}")
        except Exception as e:
            print(f"Error copying {src}: {e}")

def main():
    print("Starting file download process...")
    create_directory_structure()
    copy_files()
    print("Download complete! Check your local directory for the files.")

if __name__ == "__main__":
    main()
