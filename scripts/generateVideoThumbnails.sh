#!/bin/bash

# Generate thumbnail images from video files

set -e

# Configuration
readonly VIDEO_DIR="assets/photographers"
readonly QUALITY=85
readonly FRAME_INDEX=0

# Initialize counters
success_count=0
error_count=0

echo "🎬 Generating video thumbnails..."

# Check if ImageMagick is installed
check_imagemagick() {
    if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
        echo "❌ ImageMagick not found."
        exit 1
    fi
}

# Get ImageMagick command
get_magick_cmd() {
    command -v magick || command -v convert
}

# Generate thumbnail for single video
generate_thumbnail() {
    local video_path="$1"
    local magick_cmd="$2"
    local dir=$(dirname "$video_path")
    local filename=$(basename "$video_path" .mp4)
    local output="$dir/${filename}.jpg"

    # Extract first frame as thumbnail
    if $magick_cmd "${video_path}[${FRAME_INDEX}]" -quality ${QUALITY} "$output" 2>/dev/null; then
        echo "✅ $output"
        ((success_count++))
        return 0
    else
        echo "❌ Failed: $video_path"
        ((error_count++))
        return 1
    fi
}

# Main execution
main() {
    check_imagemagick
    local magick_cmd=$(get_magick_cmd)

    # Process each video file
    while IFS= read -r video; do
        generate_thumbnail "$video" "$magick_cmd"
    done < <(find "$VIDEO_DIR" -name "*.mp4" -type f)

    # Display summary
    echo ""
    echo "✨ Complete! Generated ${success_count} thumbnails"
    if [ $error_count -gt 0 ]; then
        echo "⚠️  ${error_count} failed"
    fi
}

main
