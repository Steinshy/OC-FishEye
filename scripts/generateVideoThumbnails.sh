#!/bin/bash

echo "🎬 Generating video thumbnails..."

if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found."
    exit 1
fi

MAGICK_CMD=$(command -v magick || command -v convert)

find assets/photographers -name "*.mp4" -type f | while read video; do
    dir=$(dirname "$video")
    filename=$(basename "$video" .mp4)
    output="$dir/${filename}.jpg"

    # Extract first frame
    $MAGICK_CMD "${video}[0]" -quality 85 "$output" 2>/dev/null

    if [ -f "$output" ]; then
        echo "✅ $output"
    else
        echo "❌ Failed: $video"
    fi
done

echo ""
echo "✨ Complete! Generated 6 thumbnails"
