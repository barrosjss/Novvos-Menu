#!/bin/bash

# Image optimization script for Novvos Menu
# Uses macOS sips to resize and compress images

IMAGES_DIR="/Users/jesusbarros/Documents/GitHub/Novvos-Menu/public/images/products"
BACKUP_DIR="/Users/jesusbarros/Documents/GitHub/Novvos-Menu/public/images/products_backup"

# Max width for images (good for mobile)
MAX_WIDTH=800

echo "🖼️  Optimizando imágenes de Novvos Menu..."
echo "=========================================="

# Create backup directory
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📁 Creando backup de imágenes originales..."
    cp -r "$IMAGES_DIR" "$BACKUP_DIR"
    echo "✅ Backup creado en: $BACKUP_DIR"
fi

# Count total images
TOTAL=$(find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l | tr -d ' ')
CURRENT=0

echo ""
echo "📊 Total de imágenes a optimizar: $TOTAL"
echo ""

# Process each image
find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read img; do
    CURRENT=$((CURRENT + 1))
    FILENAME=$(basename "$img")

    # Get current size
    SIZE_BEFORE=$(du -h "$img" | cut -f1)

    # Get current width
    WIDTH=$(sips -g pixelWidth "$img" | tail -1 | cut -d: -f2 | tr -d ' ')

    # Only resize if larger than MAX_WIDTH
    if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
        # Resize image maintaining aspect ratio
        sips --resampleWidth $MAX_WIDTH "$img" --out "$img" > /dev/null 2>&1
    fi

    # For JPEGs, we can also reduce quality (sips doesn't do this well, but resizing helps a lot)

    # Get new size
    SIZE_AFTER=$(du -h "$img" | cut -f1)

    echo "[$CURRENT/$TOTAL] $FILENAME: $SIZE_BEFORE → $SIZE_AFTER"
done

echo ""
echo "✅ Optimización completada!"
echo ""

# Show total size comparison
SIZE_ORIGINAL=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
SIZE_OPTIMIZED=$(du -sh "$IMAGES_DIR" | cut -f1)

echo "📊 Resumen:"
echo "   Tamaño original: $SIZE_ORIGINAL"
echo "   Tamaño optimizado: $SIZE_OPTIMIZED"
echo ""
echo "💡 Para restaurar las imágenes originales:"
echo "   rm -rf $IMAGES_DIR && mv $BACKUP_DIR $IMAGES_DIR"
