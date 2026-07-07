const EmailStrategyFactory = require('../strategies/emailStrategyFactory');
const { getEmailTemplate } = require('../config/emailTemplates');
const brevoContactService = require('./brevoContactService');
const logger = require('../utils/logger');

class WorkshopService {
  constructor() {
    this.emailStrategyFactory = new EmailStrategyFactory();
  }

  generateRegistrationId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `WRK-${timestamp}-${random}`.toUpperCase();
  }

  async sendRegistrationNotifications(data) {
    const registrationId = this.generateRegistrationId();
    let businessResult = null;
    let userResult = null;

    try {
      businessResult = await this.sendBusinessNotification(data);
      if (businessResult.success) {
        logger.info({ registrationId }, 'Workshop business notification sent');
      } else {
        logger.warn({ error: businessResult.error, registrationId }, 'Workshop business notification failed');
      }
    } catch (error) {
      logger.error({ error: error.message, registrationId }, 'Workshop business notification error');
      businessResult = { success: false, error: error.message };
    }

    try {
      userResult = await this.sendUserConfirmation(data);
      if (userResult.success) {
        logger.info({ registrationId }, 'Workshop user confirmation sent');
      } else {
        logger.warn({ error: userResult.error, registrationId }, 'Workshop user confirmation failed');
      }
    } catch (error) {
      logger.error({ error: error.message, registrationId }, 'Workshop user confirmation error');
      userResult = { success: false, error: error.message };
    }

    if (!businessResult?.success && !userResult?.success) {
      logger.warn({ email: data.email, registrationId }, 'Both workshop emails failed');
    }

    // Sync contact to Brevo for marketing (non-blocking)
    brevoContactService.syncContact({
      email: data.email,
      fullName: data.parentName,
      source: 'workshop',
      attributes: {
        STUDENT_NAME: data.studentName || '',
        GRADE: data.grade,
      },
    }).catch(err => logger.error({ error: err.message }, 'Brevo workshop sync failed'));

    return {
      success: true,
      registrationId,
      businessEmail: businessResult,
      userEmail: userResult,
    };
  }

  async sendBusinessNotification(data) {
    try {
      const emailStrategy = this.emailStrategyFactory.getBestStrategy();

      const templateData = {
        parentName: data.parentName,
        email: data.email,
        studentName: data.studentName,
        grade: data.grade,
        schoolDistrict: data.schoolDistrict,
        howDidYouHear: data.howDidYouHear,
        eventType: data.eventType === 'webinar' ? 'Webinar' : 'Workshop',
        eventTitle: data.eventTitle || 'Workshop/Webinar',
        eventDate: data.eventDate || '—',
        eventTime: data.eventTime || '—',
        timestamp: new Date(data.timestamp).toLocaleString(),
        ipAddress: data.ip || 'unknown',
      };

      const emailTemplate = getEmailTemplate('business', 'workshop', templateData);
      const { CONTACT_INFO } = require('../config/constants');

      const businessEmails = [
        process.env.BUSINESS_EMAIL || CONTACT_INFO.businessEmail,
        process.env.ENROLLMENT_EMAIL || CONTACT_INFO.enrollmentEmail,
      ].filter(Boolean);
      const uniqueBusinessEmails = [...new Set(businessEmails)];

      const emailData = {
        from: `"${process.env.FROM_NAME || 'GrowWise'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: uniqueBusinessEmails,
        replyTo: CONTACT_INFO.replyToEmails,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
        templateData,
      };

      const result = await emailStrategy.sendEmail(emailData);
      return {
        success: true,
        emailId: result.messageId || `workshop_biz_${Date.now()}`,
        ...result,
      };
    } catch (error) {
      logger.error({ error: error.message }, 'Workshop business email error');
      return { success: false, error: error.message, emailId: null };
    }
  }

  async sendUserConfirmation(data) {
    try {
      const emailStrategy = this.emailStrategyFactory.getBestStrategy();

      const templateData = {
        parentName: data.parentName,
        studentName: data.studentName,
        grade: data.grade,
        eventTitle: data.eventTitle || 'Workshop/Webinar',
        eventDate: data.eventDate || '—',
        eventTime: data.eventTime || '—',
        timestamp: new Date(data.timestamp).toLocaleString(),
      };

      const emailTemplate = getEmailTemplate('user', 'workshop', templateData);
      const { CONTACT_INFO } = require('../config/constants');

      const emailData = {
        from: `"${process.env.FROM_NAME || 'GrowWise'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: [data.email],
        replyTo: CONTACT_INFO.replyToEmails,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
        templateData,
      };

      const result = await emailStrategy.sendEmail(emailData);
      return {
        success: true,
        emailId: result.messageId || `workshop_usr_${Date.now()}`,
        ...result,
      };
    } catch (error) {
      logger.error({ error: error.message }, 'Workshop user confirmation error');
      return { success: false, error: error.message, emailId: null };
    }
  }
}

module.exports = WorkshopService;
