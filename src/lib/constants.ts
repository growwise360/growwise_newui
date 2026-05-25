/**
 * Shared constants for the GrowWise application
 */

// Contact Information
export const CONTACT_INFO = {
  phone: '(925) 456-4606',
  email: 'contact@growwiseschool.org',
  businessEmail: 'contact@growwiseschool.org',
  enrollmentEmail: 'contact@growwiseschool.org',
  replyToEmails: ['contact@growwiseschool.org', 'thegrowwise@gmail.com'],
  address: '4564 Dublin Blvd, Dublin, CA 94568',
  formattedAddress: '📍 4564 Dublin Blvd, Dublin, CA',
  city: 'Dublin, CA',
  street: '4564 Dublin Blvd',
  zipCode: '94568',
} as const;

/** Canonical office hours — used on /dublin-ca, /contact, and LocalBusiness JSON-LD */
export const OFFICE_HOURS = {
  summary: 'Monday–Friday, 9:00 AM–7:00 PM · Saturday, 10:00 AM–4:00 PM · Sunday closed',
  schema: ['Mo-Fr 09:00-19:00', 'Sa 10:00-16:00'] as const,
  schedule: [
    { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM', isOpen: true },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ] as const,
} as const;

// Image Storage Configuration
// S3 bucket base URL for images
// Set NEXT_PUBLIC_S3_IMAGE_BASE_URL in .env.local or use default
export const S3_IMAGE_BASE_URL = 
  process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL || 
  'https://growwise-assets.s3.us-west-1.amazonaws.com';

/**
 * Build S3 image URL
 * @param imagePath - Path to image in S3 bucket (e.g., 'images/founder/anshika-verma.png')
 * @param size - Optional size suffix (e.g., '300x180', '800x481')
 * @returns Full S3 URL
 */
export function getS3ImageUrl(imagePath: string, size?: string): string {
  const basePath = imagePath.replace(/^\//, ''); // Remove leading slash if present
  if (size) {
    // Try to find size-specific version
    // Format: images/founder/anshika-verma-300x180.png
    const ext = basePath.split('.').pop();
    const nameWithoutExt = basePath.replace(`.${ext}`, '');
    return `${S3_IMAGE_BASE_URL}/${nameWithoutExt}-${size}.${ext}`;
  }
  return `${S3_IMAGE_BASE_URL}/${basePath}`;
}

// Convenience exports for common use cases
export const PHONE_PLACEHOLDER = CONTACT_INFO.phone;
export const EMAIL = CONTACT_INFO.email;
export const BUSINESS_EMAIL = CONTACT_INFO.businessEmail;
export const ADDRESS = CONTACT_INFO.address;
export const FORMATTED_ADDRESS = CONTACT_INFO.formattedAddress;
export const CITY = CONTACT_INFO.city;
