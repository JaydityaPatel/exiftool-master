# Digital Forensics Simplified - Full Stack Application

A complete digital image forensics application with React frontend and Node.js backend that integrates with the Python forensics script (`foreimg.py`).

## 🚀 Features

- **Modern Frontend**: Clean, responsive React UI with Tailwind CSS
- **Backend Integration**: Node.js server that executes Python forensics scripts
- **Image Analysis**: Upload images and get detailed forensics analysis
- **Real-time Results**: Overlapping modal card displays analysis results
- **Drag & Drop**: Intuitive image upload with drag and drop support
- **Loading States**: Visual feedback during analysis process

## 📋 Prerequisites

- **Node.js** (version 14 or higher)
- **Python 2.7** (for the forensics script)
- **Python Libraries**: exifread, opencv-python, numpy, scipy, Pillow, PyWavelets, Matplotlib

## 🛠️ Installation & Setup

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
npm run install-backend
```

### 3. Install Python Dependencies
```bash
cd imageforensics-master
chmod +x install_packet.sh
./install_packet.sh
```

## 🏃‍♂️ Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev
```
This will start both the backend server (port 5000) and frontend (port 3000) simultaneously.

### Option 2: Run Separately

**Backend Server:**
```bash
npm run backend-dev
```

**Frontend (in another terminal):**
```bash
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
├── backend/
│   ├── package.json          # Backend dependencies
│   ├── server.js            # Express server with Python integration
│   └── uploads/             # Temporary image storage (auto-created)
├── imageforensics-master/
│   ├── foreimg.py           # Python forensics script
│   ├── install_packet.sh    # Python dependencies installer
│   └── *.jpg               # Sample test images
├── src/
│   ├── components/
│   │   ├── ImageUpload.js   # Upload component with API integration
│   │   └── ResultsCard.js   # Results display modal
│   ├── App.js              # Main application component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
└── package.json            # Frontend dependencies and scripts
```

## 🔧 How It Works

1. **Image Upload**: User drags/drops or selects an image
2. **Backend Processing**: Image is sent to Node.js server
3. **Python Execution**: Server runs `python foreimg.py image.jpg`
4. **Results Display**: Analysis output is shown in an overlapping modal card
5. **Cleanup**: Temporary files are automatically deleted

## 🧪 Testing

Use the sample images in `imageforensics-master/`:
- `exif1.jpg`, `exif2.jpg`, `exif3.jpg` - For EXIF analysis
- `demo.jpg`, `demo2.jpg`, `demo3.jpg`, `demo4.jpg` - For tampering detection

## 🐛 Troubleshooting

### Backend Issues
- Ensure Python 2.7 is installed and accessible via `python` command
- Check that all Python dependencies are installed
- Verify the `foreimg.py` script exists in `imageforensics-master/`

### Frontend Issues
- Make sure backend server is running on port 5000
- Check browser console for CORS or connection errors
- Verify all npm dependencies are installed

### Common Errors
- **"Python script not found"**: Check the path to `foreimg.py`
- **"Connection refused"**: Ensure backend server is running
- **"Analysis failed"**: Check Python dependencies and image format

## 🔄 API Endpoints

### POST `/api/analyze`
Upload and analyze an image file.

**Request**: Multipart form data with `image` field
**Response**: JSON with analysis results

```json
{
  "success": true,
  "output": "Analysis output text...",
  "error": "Warnings or additional info...",
  "exitCode": 0
}
```

### GET `/api/health`
Health check endpoint.

**Response**:
```json
{
  "status": "OK",
  "message": "Digital Forensics Backend is running"
}
```

## 🎨 Customization

- **Styling**: Modify `src/index.css` and Tailwind classes
- **Backend**: Edit `backend/server.js` for API modifications
- **Python Script**: Use different forensics methods by modifying the spawn command

## 📝 Notes

- Images are temporarily stored during analysis and automatically deleted
- The application supports various image formats (JPEG, PNG, etc.)
- Analysis results include both stdout and stderr from the Python script
- The frontend gracefully handles both successful and failed analyses