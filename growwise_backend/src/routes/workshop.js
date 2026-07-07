const express = require('express');
const router = express.Router();
const WorkshopService = require('../services/workshopService');
const logger = require('../utils/logger');

const workshopService = new WorkshopService();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_HOW_DID_YOU_HEAR = ['social_media', 'google', 'friends', 'whatsapp'];

/**
 * POST /api/workshop-registration
 * Handle workshop/webinar registration form submission
 */
router.post('/', async (req, res) => {
  try {
    const {
      parentName,
      email,
      studentName,
      grade,
      schoolDistrict,
      howDidYouHear,
      eventType,
      eventTitle,
      eventDate,
      eventTime,
      eventGrades,
    } = req.body;

    if (
      !parentName?.trim() ||
      !email?.trim() ||
      !grade?.trim() ||
      (eventType !== 'webinar' && eventType !== 'workshop')
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required fields',
      });
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    const registrationData = {
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      studentName: studentName?.trim() || undefined,
      grade: grade.trim(),
      schoolDistrict: schoolDistrict?.trim() || undefined,
      howDidYouHear: howDidYouHear?.trim() || undefined,
      eventType,
      eventTitle: eventTitle?.trim() || undefined,
      eventDate: eventDate?.trim() || undefined,
      eventTime: eventTime?.trim() || undefined,
      eventGrades: eventGrades?.trim() || undefined,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection?.remoteAddress || req.headers['x-forwarded-for'] || 'unknown',
    };

    const result = await workshopService.sendRegistrationNotifications(registrationData);

    const businessSent = result.businessEmail?.success;
    const userSent = result.userEmail?.success;

    logger.info({
      parent: registrationData.parentName,
      email: registrationData.email,
      eventType: registrationData.eventType,
      eventTitle: registrationData.eventTitle,
      businessEmailSent: businessSent,
      userEmailSent: userSent,
      registrationId: result.registrationId,
    }, 'Workshop registration processed');

    res.json({
      success: true,
      message: 'Registration received. We will confirm your spot shortly.',
    });
  } catch (error) {
    logger.error({ error: error.message, stack: error.stack }, 'Workshop registration API error');
    res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again.',
    });
  }
});

module.exports = router;
