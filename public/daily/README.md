# Daily Media Files

Place your daily media files here with the naming pattern: `YYMMDD.*`

## Supported Formats

- **Images**: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`
- **Videos**: `.mp4`, `.webm`
- **Audio**: `.mp3` (not currently used in layers, but detected)

## Examples

- `251111.png` - Image for November 11, 2025
- `251111.mp4` - Video for November 11, 2025
- `251111.jpg` - Image for November 11, 2025

## Usage

1. Upload your media file to this directory with the date format `YYMMDD`
2. The Daily Sketch Generator will automatically detect and load files matching today's date
3. You can also manually enter a date in the UI to load files for other dates

## Notes

- Only one file per date will be loaded (first match found)
- Files are loaded in this order: png, jpg, jpeg, gif, webp, mp4, webm, mp3
- Images and videos are displayed in the background layer
- Make sure files are properly named and accessible via the web server

