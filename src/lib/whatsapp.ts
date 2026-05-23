const WHATSAPP_NUMBER = '19254564606';

const DEFAULT_MESSAGE =
  "Hi GrowWise! I'd like to learn about your programs. Can you help me get started?";

function getWhatsAppMessage(pathname: string): string {
  if (pathname.includes('/camps')) {
    return "Hi GrowWise! I'm interested in your summer camps. Can you help me choose the right program?";
  }
  if (pathname.includes('/enroll')) {
    return "Hi GrowWise! I'd like help with enrollment. Can you guide me through the next steps?";
  }
  if (pathname.includes('/courses') || pathname.includes('/academic')) {
    return "Hi GrowWise! I'm interested in your academic tutoring programs. Can you tell me more?";
  }
  if (pathname.includes('/steam') || pathname.includes('/coding') || pathname.includes('/game-dev')) {
    return "Hi GrowWise! I'm interested in your STEAM and coding programs. Can you tell me more?";
  }
  return DEFAULT_MESSAGE;
}

export function getWhatsAppHref(pathname: string): string {
  const message = getWhatsAppMessage(pathname);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_CHAT = {
  getHref: getWhatsAppHref,
  ariaLabel: 'Chat with us on WhatsApp',
  tooltip: 'Chat with us on WhatsApp',
} as const;
