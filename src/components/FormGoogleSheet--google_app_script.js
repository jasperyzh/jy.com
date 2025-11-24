// Config.gs
const CONFIG = {
  // gsheet from: https://docs.google.com/spreadsheets/d/1AtnG-z19oF2tQ-KxoOzTNVxU80naUmKq-ImuSrbilEQ/edit?usp=sharing
  SHEET_ID: '1AtnG-z19oF2tQ-KxoOzTNVxU80naUmKq-ImuSrbilEQ', // Get this from the Sheet URL
  
  // The name of the tab in your sheet
  SHEET_NAME: 'Form Responses 1',
  
  // gdrive folder from: https://drive.google.com/drive/folders/164nmmi2rdt7BgkMC0Cl71vrkePxjJNJjm50bsgWgKylRy67Odq6HjSCSYqQICgJi3Ippw6qu?usp=drive_link
  DRIVE_FOLDER_ID: '164nmmi2rdt7BgkMC0Cl71vrkePxjJNJjm50bsgWgKylRy67Odq6HjSCSYqQICgJi3Ippw6qu', // ID of the folder where files will be saved
  
  // const CONFIG.ALLOWED_ORIGIN = 'https://www.my-awesome-portfolio.com';
  ALLOWED_ORIGIN: '*', // https://jasperyong.com

  // recaptcha secret key
  RECAPTCHA_SECRET_KEY: "6Le4Ss4rAAAAAGPZhohKiZn0p0AuBd1C56ir5uON", // https://www.google.com/recaptcha/admin/site/734939832

  // email_notification
  NOTIFICATION_EMAIL: "jasper.yzh@gmail.com"
};

// Centralized CORS Headers. Use your actual domain instead of '*' in production.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const JSON_MIME = ContentService.MimeType.JSON;


/**
 * Handles incoming POST requests (form submission).
 * @param {GoogleAppsScript.Events.DoPost} e The event object.
 * @returns {GoogleAppsScript.Content.TextOutput} The CORS-enabled JSON response.
 */
function doPost(e) {

  try {

    // 1. Pre-check: Ensure post data exists
    if (!e || !e.postData || !e.postData.contents) {
      return createCorsResponse(false, "No post data found", headers);
    }

    const data = JSON.parse(e.postData.contents);

    // 2. Honeypot check (returns 'success' to fool the bot)
    if (data.honeypot) {
      return createCorsResponse('success', 'Honeypot triggered (honeypot)', CORS_HEADERS);
    }

    // 3. reCAPTCHA verification
    const token = data['recaptcha-token'];
    if (!token || !verifyRecaptcha(token)) {
      return createCorsResponse('error', "reCAPTCHA verification failed.", CORS_HEADERS);
    }

    let fileUrl = 'No file uploaded';

    // 4. Handle File Upload if data exists
    if (data.fileData && data.fileName && data.mimeType) {
      const newFileName = generateUniqueFileName(data.fileName);
      const fileResult = saveFileToDrive(data.fileData, newFileName, data.mimeType);

      if (fileResult.success) {
        fileUrl = fileResult.fileUrl;
      } else {
        throw new Error('File upload failed: ' + fileResult.error);
      }
    }

    // 5. Prepare and save data to the sheet
    const sheetData = {
      "Timestamp": new Date(),
      "Full Name": data.fullName,
      "Best Email to Reach You": data.email,
      "Company / Organization (if applicable)": data.company,
      "What are you looking for?": data.inquiryType,
      "Tell me more about your project or idea.": data.projectDetails,
      "What's your estimated budget?": data.budget,
      "Do you have a specific deadline?": data.deadline,
      "Have a brief, moodboard, or spec doc?": fileUrl,
      "How did you find my work?": data.source,
      "Privacy Agreement": data.consent
    };

    const sheetResult = saveDataToSheet(sheetData);
    if (!sheetResult.success) {
      throw new Error('Saving to sheet failed: ' + sheetResult.error);
    }

    // 6. Send email notification
    // Replace file object with URL for cleaner email content
    data.fileUpload = fileUrl;
    sendEmailNotification(data);

    // 7. Send final success response
    return createCorsResponse('success', "Message received!", CORS_HEADERS);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    // 8. Handle final error response
    return createCorsResponse('error', error.toString(), CORS_HEADERS);
  }
}

/**
 * Handles the CORS preflight OPTIONS request.
 * @returns {GoogleAppsScript.Content.TextOutput} The preflight response.
 */
function doOptions() {
  // Sets the specific headers required by the preflight response
  return ContentService.createTextOutput("")
    .setMimeType(JSON_MIME)
    .setHeader('Access-Control-Allow-Origin', CORS_HEADERS['Access-Control-Allow-Origin'])
    .setHeader('Access-Control-Allow-Methods', CORS_HEADERS['Access-Control-Allow-Methods'])
    .setHeader('Access-Control-Allow-Headers', CORS_HEADERS['Access-Control-Allow-Headers']);
}

// Simple test function
function doGet() {
  return ContentService.createTextOutput("success")
}



// ===================================
// 3. HELPER FUNCTIONS
// ===================================

/**
 * Creates a consistent, CORS-enabled JSON response.
 * @param {string} status 'success' or 'error'.
 * @param {string} message The message to return in the body.
 * @param {Object<string, string>} headers The CORS headers object.
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function createCorsResponse(status, message, headers) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  }))
  .setMimeType(JSON_MIME)
  .setHeaders(headers);
}

/**
 * Generates a unique, timestamped file name.
 * @param {string} originalFileName The base name of the file.
 * @returns {string} The new unique file name.
 */
function generateUniqueFileName(originalFileName) {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timestamp = `${year}${month}${day}_${hours}${minutes}--`;
  
  const fileNameParts = originalFileName.split('.');
  const fileExtension = fileNameParts.pop();
  const baseFileName = fileNameParts.join('.');
  
  return `${timestamp}_${baseFileName}.${fileExtension}`;
}

// SheetHandler.gs
function saveDataToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = headers.map(header => data[header] || ""); // Match data to header order
    
    sheet.appendRow(newRow);
    return { success: true };
  } catch (error) {
    Logger.log('Error in saveDataToSheet: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

// FileHandler.gs

// Define a whitelist of allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
];

function saveFileToDrive(base64Data, fileName, mimeType) {
  try {
    // SECURITY CHECK: Validate the MIME type
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      throw new Error('Unsupported file type.');
    }

    const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
    const file = folder.createFile(blob);
    
    return { success: true, fileUrl: file.getUrl() };
  } catch (error) {
    Logger.log('Error in saveFileToDrive: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

//recaptcha.gs
function verifyRecaptcha(token) {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const options = {
    method: "post",
    payload: {
      secret: CONFIG.RECAPTCHA_SECRET_KEY,
      response: token,
    },
  };
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    Logger.log(result);
    // Check for success and a score above your threshold (e.g., 0.5)
    return result.success && result.score > 0.5;
  } catch (e) {
    Logger.log("reCAPTCHA verification failed: " + e.toString());
    return false;
  }
}

// EmailNotification.gs
function sendEmailNotification(formData) {
  if (!CONFIG.NOTIFICATION_EMAIL) {
    Logger.log("Email notification skipped: NOTIFICATION_EMAIL not set.");
    return;
  }

  try {
    const subject = `New Form Submission from ${formData.fullName || 'N/A'}`;
    let body = "<h1>New Form Submission</h1><p>You have received a new submission from your website form.</p>";
    body += "<table style='border-collapse: collapse; width: 100%;'>";

    for (const key in formData) {
      // Skip fields that we don't want in the email
      if (key === 'recaptcha-token' || key === 'fileData' || key === 'honeypot' || key === 'consent' || key === 'fileName' || key === 'mimeType') continue;

      let value = formData[key];
      if (value === null || value === undefined || value === '') continue;
      body += `<tr style='border: 1px solid #ddd; padding: 8px;'>
                 <th style='padding: 12px; text-align: left; background-color: #f2f2f2;'>${key}</th>
                 <td style='padding: 12px;'>${value}</td>
               </tr>`;
    }
    body += "</table>";
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: body,
      noReply: true
    });
    Logger.log("Email notification sent successfully to " + CONFIG.NOTIFICATION_EMAIL);
  } catch (e) {
    Logger.log("Failed to send email notification: " + e.toString());
  }
}



