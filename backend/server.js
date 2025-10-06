const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// API endpoint to analyze image
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = req.file.path;
    const pythonScriptPath = path.join(__dirname, '../imageforensics-master/foreimg.py');
    
    // Check if Python script exists
    if (!fs.existsSync(pythonScriptPath)) {
      return res.status(500).json({ error: 'Python forensics script not found' });
    }

    console.log(`Analyzing image: ${imagePath}`);
    
    // Execute Python script
    const pythonProcess = spawn('python', [pythonScriptPath, imagePath], {
      cwd: path.join(__dirname, '../imageforensics-master')
    });

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      
      // Clean up uploaded file
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });

      if (code === 0) {
        res.json({
          success: true,
          output: output,
          error: errorOutput,
          exitCode: code
        });
      } else {
        res.status(500).json({
          success: false,
          error: errorOutput || 'Python script execution failed',
          output: output,
          exitCode: code
        });
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Error executing Python script:', error);
      
      // Clean up uploaded file
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });

      res.status(500).json({
        success: false,
        error: `Failed to execute Python script: ${error.message}`
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Digital Forensics Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
