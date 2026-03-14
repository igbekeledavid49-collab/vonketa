export const generateWhatsAppUrl = (productName: string, productPrice: number): string => {
  const phoneNumber = '2348012345678'; // Replace with actual business WhatsApp number
  const message = `Hi! I'd like to order ${productName} (₦${productPrice.toLocaleString()}). My name is _______.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const generalWhatsAppUrl = (): string => {
  const phoneNumber = '2348012345678'; // Replace with actual business WhatsApp number
  const message = 'Hi! I have a question about your products.';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};